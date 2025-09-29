package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.dto.request.AttachmentRequest;
import com.Happy100BE.Happy100.dto.request.PostCreateRequest;
import com.Happy100BE.Happy100.dto.request.PostUpdateRequest;
import com.Happy100BE.Happy100.dto.response.PostResponse;
import com.Happy100BE.Happy100.dto.response.AttachmentResponse;
import com.Happy100BE.Happy100.entity.BoardAttachment;
import com.Happy100BE.Happy100.entity.BoardPost;
import com.Happy100BE.Happy100.repository.BoardRepository;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.server.ResponseStatusException;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.InvalidPathException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardCounterService boardCounterService;

    @Value("${app.attachments.base-path:}")
    private String attachmentsBasePath;

    @Transactional(readOnly = false)
    public Long create(PostCreateRequest req, Authentication auth) {
        BoardPost post = new BoardPost();
        CustomUserPrincipal principal = (CustomUserPrincipal) auth.getPrincipal();
        post.setBoardType(req.getBoardType());
        post.setTitle(req.getTitle());
        post.setContentJson(req.getContentJson());
        post.setAuthorId(principal.getUserId()); // INT
        List<BoardAttachment> attachments = toAttachmentEntities(null, req.getAttachments());
        return boardRepository.insertPost(post, attachments);
    }

    
    public PostResponse get(Long postId, boolean increaseView) {
        
        if (increaseView) {
            // 별도 트랜잭션으로 호출
            boardCounterService.increaseViewCount(postId);
        }
        BoardPost post = boardRepository.findPost(postId);
        if (post == null || post.getDeletedYn() == 1) return null;

        List<BoardAttachment> atts = boardRepository.findAttachments(postId);
        return toPostResponse(post, atts);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> list(String boardType, int page, int size,
                                   String searchType, String keyword, String sort) {
        int offset = Math.max(0, (page - 1)) * size;

        SearchContext ctx = buildSearchContext(searchType, keyword, sort);

        List<BoardPost> posts = boardRepository.findPostList(
                boardType,
                offset,
                size,
                ctx.searchType,
                ctx.keyword,
                ctx.sort
        );
        // 첨부 N+1 방지: 한 번에 조회 후 매핑
        List<Long> ids = new ArrayList<>();
        for (BoardPost p : posts) {
            if (p.getDeletedYn() != null && p.getDeletedYn() == 1) continue;
            ids.add(p.getPostId());
        }
        List<BoardAttachment> allAtts = boardRepository.findAttachmentsByPostIds(ids);
        java.util.Map<Long, List<BoardAttachment>> grouped = new java.util.HashMap<>();
        for (BoardAttachment a : allAtts) {
            grouped.computeIfAbsent(a.getPostId(), k -> new ArrayList<>()).add(a);
        }
        List<PostResponse> result = new ArrayList<>();
        for (BoardPost p : posts) {
            if (p.getDeletedYn() != null && p.getDeletedYn() == 1) continue;
            List<BoardAttachment> atts = grouped.getOrDefault(p.getPostId(), java.util.List.of());
            result.add(toPostResponse(p, atts));
        }
        return result;
    }

    public int countPosts(String boardType, String searchType, String keyword) {
        SearchContext ctx = buildSearchContext(searchType, keyword, null);
        return boardRepository.countPostList(boardType, ctx.searchType, ctx.keyword);
    }

    @Transactional
    public boolean update(PostUpdateRequest req) {
        BoardPost post = new BoardPost();
        post.setPostId(req.getPostId());
        post.setTitle(req.getTitle());
        post.setContentJson(req.getContentJson());
        int updated = boardRepository.updatePost(post, toAttachmentEntities(req.getPostId(), req.getAttachments()));
        return updated > 0;
    }

    @Transactional
    public boolean delete(Long postId) {
        return boardRepository.softDelete(postId) > 0;
    }

    @Transactional(readOnly = true)
    public AttachmentFile downloadAttachment(Long postId, Long attachmentId) {
        BoardAttachment attachment = boardRepository.findAttachment(attachmentId);
        if (attachment == null || attachment.getPostId() == null || !attachment.getPostId().equals(postId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment not found");
        }

        Path path = resolveAttachmentPath(attachment.getFilePath());
        if (!Files.exists(path) || !Files.isRegularFile(path)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment file not found");
        }

        try {
            Resource resource = new UrlResource(path.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Attachment file not readable");
            }
            return new AttachmentFile(attachment, resource);
        } catch (MalformedURLException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Invalid attachment path", e);
        }
    }

    private Path resolveAttachmentPath(String filePath) {
        if (!StringUtils.hasText(filePath)) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Attachment path missing");
        }

        Path candidate;
        try {
            candidate = Paths.get(filePath).normalize();
        } catch (InvalidPathException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid attachment path", ex);
        }

        if (candidate.isAbsolute()) {
            return candidate;
        }

        Path base = resolveBasePath();
        Path sanitized = stripLeadingBase(candidate, base);

        Path resolved = base.resolve(sanitized).normalize();
        if (!resolved.startsWith(base)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid attachment path");
        }
        return resolved;
    }

    private Path resolveBasePath() {
        Path configuredBase = StringUtils.hasText(attachmentsBasePath)
                ? Paths.get(attachmentsBasePath)
                : Paths.get("");
        return configuredBase.toAbsolutePath().normalize();
    }

    private Path stripLeadingBase(Path candidate, Path base) {
        if (candidate.getNameCount() == 0) {
            return candidate;
        }
        Path baseName = base.getFileName();
        if (baseName != null && candidate.getName(0).toString().equals(baseName.toString())) {
            return candidate.getNameCount() == 1
                    ? Paths.get("")
                    : candidate.subpath(1, candidate.getNameCount());
        }
        return candidate;
    }

    private List<BoardAttachment> toAttachmentEntities(Long postId, List<?> list) {
        if (list == null) return List.of();
        List<BoardAttachment> result = new ArrayList<>();
        for (Object o : list) {
            AttachmentRequest a =
                    (AttachmentRequest) o;
            BoardAttachment e = new BoardAttachment();
            e.setPostId(postId);
            e.setAttachmentType(a.getAttachmentType());
            e.setFileName(a.getFileName());
            e.setFilePath(a.getFilePath());
            e.setFileSize(a.getFileSize() == null ? 0L : a.getFileSize());
            e.setMimeType(a.getMimeType());
            e.setSortOrder(a.getSortOrder() == null ? 1 : a.getSortOrder());
            result.add(e);
        }
        return result;
    }

    private PostResponse toPostResponse(BoardPost p, List<BoardAttachment> atts) {
        PostResponse r = new PostResponse();
        r.setPostId(p.getPostId());
        r.setBoardType(p.getBoardType());
        r.setTitle(p.getTitle());
        r.setContentJson(p.getContentJson());
        r.setAuthorId(p.getAuthorId());
        r.setViewCount(p.getViewCount());
        r.setDeletedYn(p.getDeletedYn());
        r.setCreatedAt(p.getCreatedAt());
        r.setUpdatedAt(p.getUpdatedAt());

        List<AttachmentResponse> ars = new ArrayList<>();
        if (atts != null) {
            for (BoardAttachment a : atts) {
                AttachmentResponse ar = new AttachmentResponse();
                ar.setAttachmentId(a.getAttachmentId());
                ar.setAttachmentType(a.getAttachmentType());
                ar.setFileName(a.getFileName());
                ar.setFilePath(a.getFilePath());
                ar.setFileSize(a.getFileSize());
                ar.setMimeType(a.getMimeType());
                ar.setSortOrder(a.getSortOrder());
                ars.add(ar);
            }
        }
        r.setAttachments(ars);
        return r;
    }

    public int countPostsByBoardType(String boardType) {
        return boardRepository.countPostsByBoardType(boardType);
    }

    private SearchContext buildSearchContext(String searchType, String keyword, String sort) {
        String normalizedSort = normalizeSort(sort);
        String trimmedKeyword = StringUtils.hasText(keyword) ? keyword.trim() : null;
        String normalizedSearchType = null;
        if (StringUtils.hasText(trimmedKeyword)) {
            normalizedSearchType = normalizeSearchType(searchType);
            trimmedKeyword = trimmedKeyword.toLowerCase(Locale.ROOT);
        } else {
            trimmedKeyword = null;
        }
        return new SearchContext(normalizedSearchType, trimmedKeyword, normalizedSort);
    }

    private String normalizeSearchType(String searchType) {
        if (!StringUtils.hasText(searchType)) {
            return SearchType.TITLE_CONTENT.value;
        }
        String upper = searchType.trim().toUpperCase(Locale.ROOT);
        return SearchType.from(upper).value;
    }

    private String normalizeSort(String sort) {
        if (!StringUtils.hasText(sort)) {
            return SortType.LATEST.value;
        }
        String upper = sort.trim().toUpperCase(Locale.ROOT);
        return SortType.from(upper).value;
    }

    private enum SearchType {
        TITLE("TITLE"),
        CONTENT("CONTENT"),
        TITLE_CONTENT("TITLE_CONTENT");

        private final String value;

        SearchType(String value) {
            this.value = value;
        }

        static SearchType from(String candidate) {
            for (SearchType type : values()) {
                if (type.value.equals(candidate)) {
                    return type;
                }
            }
            return TITLE_CONTENT;
        }
    }

    private enum SortType {
        LATEST("LATEST"),
        VIEWS("VIEWS");

        private final String value;

        SortType(String value) {
            this.value = value;
        }

        static SortType from(String candidate) {
            for (SortType type : values()) {
                if (type.value.equals(candidate)) {
                    return type;
                }
            }
            return LATEST;
        }
    }

    private static class SearchContext {
        private final String searchType;
        private final String keyword;
        private final String sort;

        private SearchContext(String searchType, String keyword, String sort) {
            this.searchType = searchType;
            this.keyword = keyword;
            this.sort = sort;
        }
    }
    public static class AttachmentFile {
        private final BoardAttachment attachment;
        private final Resource resource;

        public AttachmentFile(BoardAttachment attachment, Resource resource) {
            this.attachment = attachment;
            this.resource = resource;
        }

        public BoardAttachment getAttachment() {
            return attachment;
        }

        public Resource getResource() {
            return resource;
        }
    }

}
