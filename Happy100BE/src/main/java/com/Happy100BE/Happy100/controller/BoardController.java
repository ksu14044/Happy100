package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.PostCreateRequest;
import com.Happy100BE.Happy100.dto.request.PostUpdateRequest;
import com.Happy100BE.Happy100.dto.response.PostListResponse;
import com.Happy100BE.Happy100.dto.response.PostResponse;
import com.Happy100BE.Happy100.entity.BoardAttachment;
import com.Happy100BE.Happy100.service.BoardService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    @PostMapping
    @Operation(summary = "게시글 등록")
    public ResponseEntity<Long> create(@RequestBody PostCreateRequest req,
                                        Authentication auth) {
        Long postId = boardService.create(req, auth);
        
        return ResponseEntity.ok(postId);
    }

    @GetMapping("/{postId}")
    @Operation(summary = "게시글 단건 조회")
    public ResponseEntity<PostResponse> get(@PathVariable Long postId,
                                            @RequestParam(defaultValue = "true") boolean increaseView) {
        PostResponse res = boardService.get(postId, increaseView);
        if (res == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/{postId}/attachments/{attachmentId}/download")
    @Operation(summary = "첨부파일 다운로드")
    public ResponseEntity<Resource> downloadAttachment(@PathVariable Long postId,
                                                       @PathVariable Long attachmentId) {
        BoardService.AttachmentFile attachmentFile = boardService.downloadAttachment(postId, attachmentId);
        BoardAttachment attachment = attachmentFile.getAttachment();

        ContentDisposition contentDisposition = ContentDisposition.attachment()
                .filename(attachment.getFileName(), StandardCharsets.UTF_8)
                .build();

        ResponseEntity.BodyBuilder builder = ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, contentDisposition.toString())
                .contentType(resolveMediaType(attachment.getMimeType()));

        Long fileSize = attachment.getFileSize();
        if (fileSize != null && fileSize > 0) {
            builder = builder.contentLength(fileSize);
        }

        return builder.body(attachmentFile.getResource());
    }

    @GetMapping
    @Operation(summary = "게시글 다건 조회")
    public ResponseEntity<PostListResponse> list(@RequestParam String boardType,
                                                 @RequestParam(defaultValue = "1") int page,
                                                 @RequestParam(defaultValue = "10") int size,
                                                 @RequestParam(required = false) String searchType,
                                                 @RequestParam(required = false) String keyword,
                                                 @RequestParam(defaultValue = "LATEST") String sort) {
        int safePage = Math.max(page, 1);
        int safeSize = Math.max(size, 1);

        int totalPostListCount = boardService.countPosts(boardType, searchType, keyword);
        int totalPages = (int) Math.ceil(totalPostListCount / (double) safeSize);
        if (totalPages == 0) totalPages = 1;

        PostListResponse res = PostListResponse.builder()
                .page(safePage)
                .limitCount(safeSize)
                .totalPages(totalPages)
                .totalElements(totalPostListCount)
                .isFirstPage(safePage == 1)
                .isLastPage(safePage >= totalPages)
                .nextPage(safePage < totalPages ? safePage + 1 : 0)
                .postList(boardService.list(boardType, safePage, safeSize, searchType, keyword, sort))
                .build();
        return ResponseEntity.ok().body(res);
    }

    @PutMapping("/{postId}")
    @Operation(summary = "게시글 수정")
    public ResponseEntity<Void> update(@PathVariable Long postId, @RequestBody PostUpdateRequest req) {
        req.setPostId(postId);
        boolean ok = boardService.update(req);
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{postId}")
    @Operation(summary = "게시글 삭제")
    public ResponseEntity<Void> delete(@PathVariable Long postId) {
        boolean ok = boardService.delete(postId);
        if (!ok) return ResponseEntity.notFound().build();
        return ResponseEntity.noContent().build();
    }

    private MediaType resolveMediaType(String mimeType) {
        if (mimeType != null) {
            String trimmed = mimeType.trim();
            if (!trimmed.isEmpty()) {
                try {
                    return MediaType.parseMediaType(trimmed);
                } catch (InvalidMediaTypeException ignored) {
                    return MediaType.APPLICATION_OCTET_STREAM;
                }
            }
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
