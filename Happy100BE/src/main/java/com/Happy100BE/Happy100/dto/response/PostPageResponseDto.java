package com.Happy100BE.Happy100.dto.response;

import lombok.*;

import java.util.List;

/**
 * 공통 페이징 응답 래퍼
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostPageResponseDto {
    private List<PostListItemDto> items; // 현재 페이지 아이템
    private int page;                    // 현재 페이지(1-base)
    private int size;                    // 페이지 크기
    private long totalElements;          // 전체 건수
    private int totalPages;              // 전체 페이지 수
    private boolean hasNext;             // 다음 페이지 존재 여부
}
