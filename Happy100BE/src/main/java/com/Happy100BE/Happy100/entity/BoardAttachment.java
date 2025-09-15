package com.Happy100BE.Happy100.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class BoardAttachment {
    private Long attachmentId;
    private Long postId;
    private String attachmentType;
    private String fileName;
    private String filePath;
    private Long fileSize;
    private String mimeType;
    private Integer sortOrder;
    private LocalDateTime createdAt;
}