package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.CreatePostRequest;
import com.Happy100BE.Happy100.dto.request.UpdatePostRequest;
import com.Happy100BE.Happy100.dto.response.PostPageResponseDto;
import com.Happy100BE.Happy100.dto.response.PostResponseDto;
import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import com.Happy100BE.Happy100.service.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * 게시글 등록 API
 *
 * 권한 규칙(요구사항):
 *  - 공지(NOTICE), 자격증반(CLASS): 관리자(ROLE_ADMIN)만 등록 가능
 *  - 쇼핑(SHOP), QnA(QNA): 로그인 회원(ROLE_USER 이상)이면 등록 가능 (관리자도 가능)
 *
 * 구현 포인트:
 *  - Security 설정상 /api/auth/** 외 모든 경로는 인증 필요 → 이 엔드포인트는 이미 "로그인 사용자" 전제
 *  - 다만 게시판 타입에 따라 "관리자 여부"를 동적으로 검사
 *  - 관리자 판별: authentication.getAuthorities()에 "ROLE_ADMIN" 포함 여부
 *  - 조건 불만족 시 403(Forbidden) 반환
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/posts")
@Tag(name = "게시판", description = "게시글 등록 API")
public class PostController {

    private final PostService postService;

    @Operation(
            summary = "게시글 등록",
            description = """
            공지/자격증은 관리자만, 쇼핑/QnA는 로그인 회원부터 등록할 수 있습니다.
            QnA는 qnaStatus(PENDING/COMPLETED)가 필요합니다.
            contentJson은 유효한 JSON 문자열이어야 합니다.
            """
    )
    @PostMapping
    public ResponseEntity<PostResponseDto> create(
            @Valid @RequestBody CreatePostRequest req,
            Authentication authentication
    ) {
        // 1) 로그인 사용자 정보 획득
        //    SecurityFilter를 거쳐 왔으므로 Authentication은 null이 아님(미인증이면 Security에서 401 처리).
        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();

        // 2) 관리자 여부 동적 판단
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));

        // 3) 게시판 타입별 권한 규칙 적용
        BoardType type = req.getBoardType();
        if (type == BoardType.NOTICE || type == BoardType.CLASS) {
            // 공지/자격증: 관리자만
            if (!isAdmin) {
                throw new ResponseStatusException(
                        HttpStatus.FORBIDDEN,
                        "공지/자격증 게시글은 관리자만 등록할 수 있습니다."
                );
            }
        } else if (type == BoardType.SHOP || type == BoardType.QNA) {
            // 쇼핑/QnA: 로그인 회원이면 가능 (관리자도 가능)
            // → 별도 체크 불필요 (이미 인증 전제)
        } else {
            // 방어 로직: 정의되지 않은 타입
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "유효하지 않은 게시판 타입입니다."
            );
        }

        // 4) 등록 처리 (서비스에서 JSON 유효성, QNA 상태 규칙 검증)
        PostResponseDto result = postService.createPost(req, principal.getUserId());
        return ResponseEntity.ok(result);
    }

    // ====== [신규] 단건 조회 ======
    @Operation(summary = "게시글 단건 조회")
    @GetMapping("/{postId}")
    public ResponseEntity<PostResponseDto> getOne(
            @PathVariable Integer postId,
            Authentication authentication
    ) {
        Integer currentUserId = null;
        boolean isAdmin = false;
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserPrincipal principal) {
            currentUserId = principal.getUserId();
            isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        }
        PostResponseDto dto = postService.getPost(postId, currentUserId, isAdmin);
        return ResponseEntity.ok(dto);
    }

    // ====== [신규] 목록 조회 (페이지네이션 + 검색) ======
    @Operation(summary = "게시글 목록 조회", description = "boardType 필수, page(1-base), keyword(제목/내용 포함 검색)")
    @GetMapping
    public ResponseEntity<PostPageResponseDto> list(
            @RequestParam BoardType boardType,
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false) String keyword,
            Authentication authentication
    ) {
        Integer currentUserId = null;
        boolean isAdmin = false;
        if (authentication != null && authentication.getPrincipal() instanceof CustomUserPrincipal principal) {
            currentUserId = principal.getUserId();
            isAdmin = authentication.getAuthorities().stream()
                    .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        }

        PostPageResponseDto dto = postService.listPosts(boardType, page, keyword, currentUserId, isAdmin);
        return ResponseEntity.ok(dto);
    }

    // ====== [신규] 수정 ======
    @Operation(summary = "게시글 수정", description = "NOTICE/CLASS=관리자, SHOP/QNA=작성자 또는 관리자")
    @PutMapping("/{postId}")
    public ResponseEntity<PostResponseDto> update(
            @PathVariable Integer postId,
            @RequestBody @jakarta.validation.Valid UpdatePostRequest req,
            Authentication authentication
    ) {
        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));

        PostResponseDto result = postService.updatePost(postId, req, principal.getUserId(), isAdmin);
        return ResponseEntity.ok(result);
    }

    // ====== [신규] 삭제 ======
    @Operation(summary = "게시글 삭제", description = "NOTICE/CLASS=관리자, SHOP/QNA=작성자 또는 관리자")
    @DeleteMapping("/{postId}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer postId,
            Authentication authentication
    ) {
        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));

        postService.deletePost(postId, principal.getUserId(), isAdmin);
        return ResponseEntity.noContent().build();
    }
}
