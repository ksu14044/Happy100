package com.Happy100BE.Happy100.service.impl;

import com.Happy100BE.Happy100.dto.request.CreatePostRequest;
import com.Happy100BE.Happy100.dto.request.UpdatePostRequest;
import com.Happy100BE.Happy100.dto.response.PostResponseDto;
import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.entity.Post;
import com.Happy100BE.Happy100.mapper.PostMapper;
import com.Happy100BE.Happy100.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.Happy100BE.Happy100.dto.response.PostListItemDto;
import com.Happy100BE.Happy100.dto.response.PostPageResponseDto;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 비즈니스 규칙
 * - QNA가 아니면 qnaStatus는 null 이어야 함
 * - QNA이면 qnaStatus가 반드시 있어야 함
 * - contentJson은 유효한 JSON 문자열이어야 함
 */
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostMapper postMapper;
    private final ObjectMapper objectMapper; // Spring Boot 자동 빈

    @Override
    @Transactional
    public PostResponseDto createPost(CreatePostRequest req, Integer authorUserId) {

        // 1) 기본 검증: QNA 상태 규칙
        if (req.getBoardType() != BoardType.QNA && req.getQnaStatus() != null) {
            throw new IllegalArgumentException("QNA가 아닌 게시판은 qnaStatus를 가질 수 없습니다.");
        }
        if (req.getBoardType() == BoardType.QNA && req.getQnaStatus() == null) {
            throw new IllegalArgumentException("QNA 게시판은 qnaStatus가 필요합니다.");
        }

        // 2) JSON 유효성 검증(잘못된 JSON이면 예외)
        try {
            JsonNode ignored = objectMapper.readTree(req.getContentJson());
        } catch (Exception e) {
            throw new IllegalArgumentException("contentJson이 유효한 JSON 문자열이 아닙니다.", e);
        }

        // 3) 엔티티 생성
        Post post = Post.builder()
                .boardType(req.getBoardType())
                .title(req.getTitle())
                .contentJson(req.getContentJson())
                .authorUserId(authorUserId)
                .qnaStatus(req.getQnaStatus()) // QNA일 때만 값, 아니면 null
                .build();

        // 4) 저장 (생성된 postId가 post 객체에 채워짐)
        int affected = postMapper.insertPost(post);
        if (affected != 1) {
            throw new IllegalStateException("게시글 저장에 실패했습니다.");
        }

        // 5) 저장된 레코드 재조회(생성/수정시각 포함 응답)
        Post saved = postMapper.findById(post.getPostId());
        return PostResponseDto.builder()
                .postId(saved.getPostId())
                .boardType(saved.getBoardType())
                .title(saved.getTitle())
                .contentJson(saved.getContentJson())
                .authorUserId(saved.getAuthorUserId())
                .qnaStatus(saved.getQnaStatus())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    // ====== 단건 조회 ======
    @Override
    @Transactional(readOnly = true)
    public PostResponseDto getPost(Integer postId, Integer currentUserId, boolean isAdmin) {
        Post p = postMapper.findById(postId);
        if (p == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
        }

        // QNA 접근 제어: 관리자 or 작성자만 열람
        if (p.getBoardType() == BoardType.QNA && !isAdmin) {
            if (currentUserId == null || !currentUserId.equals(p.getAuthorUserId())) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "QnA 게시글은 작성자와 관리자만 조회할 수 있습니다.");
            }
        }

        return PostResponseDto.builder()
                .postId(p.getPostId())
                .boardType(p.getBoardType())
                .title(p.getTitle())
                .contentJson(p.getContentJson())
                .authorUserId(p.getAuthorUserId())
                .qnaStatus(p.getQnaStatus())
                .createdAt(p.getCreatedAt())
                .updatedAt(p.getUpdatedAt())
                .build();
    }

    // ====== 목록 조회 (페이지네이션 + 검색) ======
    @Override
    @Transactional(readOnly = true)
    public PostPageResponseDto listPosts(BoardType boardType, Integer page, String keyword, Integer currentUserId, boolean isAdmin) {
        if (page == null || page < 1) page = 1;

        // 게시판별 페이지 크기: NOTICE/CLASS/QNA=10, SHOP=8
        final int size = pageSizeFor(boardType);
        final int offset = (page - 1) * size;

        final boolean isQna = (boardType == BoardType.QNA);

        // 비로그인 사용자의 QNA 목록 접근은 금지(요구사항 반영)
        if (isQna && !isAdmin && currentUserId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "QnA 목록은 로그인 후 본인 글만 조회할 수 있습니다.");
        }

        // 총 건수
        int total = postMapper.countByBoard(boardType, safeKeyword(keyword), isQna, isAdmin, currentUserId);

        // 페이지 아이템
        List<Post> rows = postMapper.findPageByBoard(
                boardType,
                safeKeyword(keyword),
                size,
                offset,
                isQna,
                isAdmin,
                currentUserId
        );

        List<PostListItemDto> items = rows.stream()
                .map(p -> PostListItemDto.builder()
                        .postId(p.getPostId())
                        .boardType(p.getBoardType())
                        .title(p.getTitle())
                        .authorUserId(p.getAuthorUserId())
                        .qnaStatus(p.getQnaStatus())
                        .createdAt(p.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

        int totalPages = (int) Math.ceil(total / (double) size);
        boolean hasNext = page < totalPages;

        return PostPageResponseDto.builder()
                .items(items)
                .page(page)
                .size(size)
                .totalElements(total)
                .totalPages(totalPages)
                .hasNext(hasNext)
                .build();
    }

    // ====== 헬퍼 ======
    private int pageSizeFor(BoardType boardType) {
        if (boardType == BoardType.SHOP) return 8;  // 쇼핑몰 8개
        return 10;                                   // 공지/자격증/QNA 10개
    }

    private String safeKeyword(String keyword) {
        // 공백/빈 문자열은 null로 통일 → XML에서 조건 분기 용이
        if (keyword == null) return null;
        String k = keyword.trim();
        return k.isEmpty() ? null : k;
    }

    // ====== [신규] 수정 ======
    @Override
    @Transactional
    public PostResponseDto updatePost(Integer postId, UpdatePostRequest req, Integer currentUserId, boolean isAdmin) {
        // 1) 기존 게시글 조회
        Post existing = postMapper.findById(postId);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
        }

        // 2) 권한 체크
        BoardType type = existing.getBoardType();
        boolean isAuthor = (currentUserId != null && currentUserId.equals(existing.getAuthorUserId()));
        if (type == BoardType.NOTICE || type == BoardType.CLASS) {
            if (!isAdmin) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "공지/자격증 게시글은 관리자만 수정할 수 있습니다.");
            }
        } else { // SHOP or QNA
            if (!(isAdmin || isAuthor)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자 또는 관리자만 수정할 수 있습니다.");
            }
        }

        // 3) JSON 유효성 검증
        try {
            JsonNode ignored = objectMapper.readTree(req.getContentJson());
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "contentJson이 유효한 JSON 문자열이 아닙니다.", e);
        }

        // 4) QNA 무결성 검증
        if (type == BoardType.QNA && req.getQnaStatus() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "QNA 게시판은 qnaStatus가 필요합니다.");
        }
        if (type != BoardType.QNA && req.getQnaStatus() != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "QNA가 아닌 게시판은 qnaStatus를 가질 수 없습니다.");
        }

        // 5) 엔티티 반영
        existing.setTitle(req.getTitle());
        existing.setContentJson(req.getContentJson());
        existing.setQnaStatus(req.getQnaStatus()); // QNA면 값, 아니면 null

        // 6) 저장
        int affected = postMapper.updatePost(existing);
        if (affected != 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 수정에 실패했습니다.");
        }

        // 7) 수정 후 재조회하여 응답
        Post saved = postMapper.findById(postId);
        return PostResponseDto.builder()
                .postId(saved.getPostId())
                .boardType(saved.getBoardType())
                .title(saved.getTitle())
                .contentJson(saved.getContentJson())
                .authorUserId(saved.getAuthorUserId())
                .qnaStatus(saved.getQnaStatus())
                .createdAt(saved.getCreatedAt())
                .updatedAt(saved.getUpdatedAt())
                .build();
    }

    // ====== [신규] 삭제 ======
    @Override
    @Transactional
    public void deletePost(Integer postId, Integer currentUserId, boolean isAdmin) {
        // 1) 기존 게시글 조회
        Post existing = postMapper.findById(postId);
        if (existing == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "게시글을 찾을 수 없습니다.");
        }

        // 2) 권한 체크
        BoardType type = existing.getBoardType();
        boolean isAuthor = (currentUserId != null && currentUserId.equals(existing.getAuthorUserId()));
        if (type == BoardType.NOTICE || type == BoardType.CLASS) {
            if (!isAdmin) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "공지/자격증 게시글은 관리자만 삭제할 수 있습니다.");
            }
        } else { // SHOP or QNA
            if (!(isAdmin || isAuthor)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "작성자 또는 관리자만 삭제할 수 있습니다.");
            }
        }

        // 3) 삭제
        int affected = postMapper.deletePost(postId);
        if (affected != 1) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "게시글 삭제에 실패했습니다.");
        }
    }
}
