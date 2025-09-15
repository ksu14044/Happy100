// src/main/java/com/Happy100BE/Happy100/dto/response/AttachmentResponse.java
package com.Happy100BE.Happy100.dto.response;

import lombok.Data;

@Data
public class AttachmentResponse {
    private Long attachmentId;
    private String attachmentType;
    private String fileName;
    private String filePath;
    private Long fileSize;
    private String mimeType;
    private Integer sortOrder;
}