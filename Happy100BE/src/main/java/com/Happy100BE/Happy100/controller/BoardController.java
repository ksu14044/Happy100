package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.PostCreateRequest;
import com.Happy100BE.Happy100.dto.request.PostUpdateRequest;
import com.Happy100BE.Happy100.dto.response.PostResponse;
import com.Happy100BE.Happy100.service.BoardService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
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

    @GetMapping
    @Operation(summary = "게시글 다건 조회")
    public ResponseEntity<List<PostResponse>> list(@RequestParam String boardType,
                                                    @RequestParam(defaultValue = "1") int page,
                                                    @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(boardService.list(boardType, page, size));
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
}