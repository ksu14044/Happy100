package com.Happy100BE.Happy100.dto.response;

public record FileUploadResponse(
        String fileName,
        String filePath,
        Long fileSize,
        String mimeType,
        String url
) {
}