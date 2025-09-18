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


import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardRepository boardRepository;
    private final BoardCounterService boardCounterService;
    @Transactional(readOnly = false)
    public Long create(PostCreateRequest req, Authentication auth) {
        BoardPost post = new BoardPost();
        CustomUserPrincipal principal = (CustomUserPrincipal) auth.getPrincipal();
        post.setBoardType(req.getBoardType());
        post.setTitle(req.getTitle());
        post.setContentJson(req.getContentJson());
        post.setAuthorId(principal.getUserId()); // INT
        System.out.println(post.getAuthorId());
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
    public List<PostResponse> list(String boardType, int page, int size) {
        int offset = Math.max(0, (page - 1)) * size;
        List<BoardPost> posts = boardRepository.findPostList(boardType, offset, size);
        List<PostResponse> result = new ArrayList<>();
        for (BoardPost p : posts) {
            if (p.getDeletedYn() != null && p.getDeletedYn() == 1) continue;
            List<BoardAttachment> atts = boardRepository.findAttachments(p.getPostId());
            result.add(toPostResponse(p, atts));
        }
        return result;
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
}