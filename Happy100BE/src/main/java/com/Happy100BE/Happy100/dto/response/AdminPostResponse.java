package com.Happy100BE.Happy100.dto.response;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AdminPostResponse {
    private Long postId;
    private String boardType;
    private String title;
    private Integer authorId;
    private Integer viewCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
