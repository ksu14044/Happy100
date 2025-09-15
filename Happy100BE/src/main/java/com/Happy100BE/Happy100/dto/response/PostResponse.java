package com.Happy100BE.Happy100.dto.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostResponse {
    private Long postId;
    private String boardType;
    private String title;
    private String contentJson;
    private Integer authorId;          // INT
    private Integer viewCount;
    private Integer deletedYn;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<AttachmentResponse> attachments;
}


