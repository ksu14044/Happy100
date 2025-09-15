// src/main/java/com/Happy100BE/Happy100/dto/request/AttachmentRequest.java
package com.Happy100BE.Happy100.dto.request;

import lombok.Data;

@Data
public class AttachmentRequest {
    private String attachmentType; // "FILE" | "IMAGE" | "VIDEO"
    private String fileName;
    private String filePath;
    private Long fileSize;
    private String mimeType;
    private Integer sortOrder;
}