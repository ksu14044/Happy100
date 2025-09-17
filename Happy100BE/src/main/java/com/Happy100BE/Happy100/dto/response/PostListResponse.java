package com.Happy100BE.Happy100.dto.response;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PostListResponse {
    @Schema(description = "게시글 조회 응답 페이지")
    private int page;
    @Schema(description = "게시글 조회 응답 개수 제한")
    private int limitCount;
    @Schema(description = "게시글 조회 응답 총 페이지")
    private int totalPages;
    @Schema(description = "총 게시글 조회 응답 개수")
    private int totalElements;
    @Schema(description = "게시글 조회 응답 첫 페이지")
    private boolean isFirstPage;
    @Schema(description = "게시글 조회 응답 마지막 페이지")
    private boolean isLastPage;
    @Schema(description = "게시글 조회 응답 다음 페이지")
    private int nextPage;
    private List<PostResponse> postList;
}
