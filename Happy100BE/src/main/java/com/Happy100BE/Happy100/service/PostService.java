package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.dto.request.CreatePostRequest;
import com.Happy100BE.Happy100.dto.request.UpdatePostRequest;
import com.Happy100BE.Happy100.dto.response.PostPageResponseDto;
import com.Happy100BE.Happy100.dto.response.PostResponseDto;
import com.Happy100BE.Happy100.entity.BoardType;

/**
 * 게시글 등록(생성)에 대한 서비스 인터페이스
 */
public interface PostService {

    /**
     * 게시글 등록
     * @param req          등록 요청(게시판/제목/콘텐츠JSON/QnA상태)
     * @param authorUserId 로그인한 작성자 user_id
     * @return 저장된 게시글 응답 DTO
     */
    PostResponseDto createPost(CreatePostRequest req, Integer authorUserId);

    // [신규] 단건 조회(접근 제어 포함: QNA는 작성자/관리자만)
    PostResponseDto getPost(Integer postId, Integer currentUserId, boolean isAdmin);

    // [신규] 목록 조회(페이지네이션 + 검색 + 접근 제어)
    PostPageResponseDto listPosts(BoardType boardType, Integer page, String keyword, Integer currentUserId, boolean isAdmin);

    // ====== [신규] 수정/삭제 ======
    PostResponseDto updatePost(Integer postId, UpdatePostRequest req, Integer currentUserId, boolean isAdmin);

    void deletePost(Integer postId, Integer currentUserId, boolean isAdmin);
}
