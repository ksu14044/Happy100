package com.Happy100BE.Happy100.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BoardPost {
    private Long postId;
    private String boardType;
    private String title;
    private String contentJson;
    private Integer authorId;       // INT(11)
    private Integer viewCount;
    private Integer deletedYn;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}