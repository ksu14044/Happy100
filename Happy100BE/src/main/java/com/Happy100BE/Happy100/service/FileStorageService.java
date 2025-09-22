package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.dto.response.FileUploadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    private static final DateTimeFormatter TIMESTAMP_FORMAT = DateTimeFormatter.ofPattern("yyyyMMddHHmmssSSS");

    @Value("${app.attachments.base-path:./uploads}")
    private String attachmentsBasePath;

    public FileUploadResponse store(MultipartFile multipartFile) {
        if (multipartFile == null || multipartFile.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "File is empty");
        }

        String originalName = multipartFile.getOriginalFilename();
        if (!StringUtils.hasText(originalName)) {
            originalName = "attachment";
        }
        originalName = StringUtils.cleanPath(originalName);
        if (originalName.contains("..")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid file name");
        }

        Path baseDir = resolveBaseDirectory();
        Path relativeDir = resolveRelativeDirectory();
        Path targetDir = baseDir.resolve(relativeDir).normalize();
        try {
            Files.createDirectories(targetDir);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to prepare storage directory", e);
        }

        String extension = "";
        int dot = originalName.lastIndexOf('.');
        if (dot != -1 && dot < originalName.length() - 1) {
            extension = originalName.substring(dot);
        }

        String generatedName = TIMESTAMP_FORMAT.format(LocalDateTime.now()) + "-" + UUID.randomUUID();
        String storedFileName = generatedName + extension;

        Path storedPath = targetDir.resolve(storedFileName).normalize();
        try (InputStream in = multipartFile.getInputStream()) {
            Files.copy(in, storedPath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to store file", e);
        }

        Long fileSize;
        try {
            fileSize = Files.size(storedPath);
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to read stored file size", e);
        }

        String mimeType = multipartFile.getContentType();
        if (!StringUtils.hasText(mimeType)) {
            try {
                mimeType = Files.probeContentType(storedPath);
            } catch (IOException ignored) {
                mimeType = null;
            }
        }
        if (!StringUtils.hasText(mimeType)) {
            mimeType = "application/octet-stream";
        }

        String relativePath = toForwardSlash(relativeDir.resolve(storedFileName));
        String url = "/uploads/" + relativePath;

        return new FileUploadResponse(originalName, relativePath, fileSize, mimeType, url);
    }

    private Path resolveBaseDirectory() {
        Path configured = StringUtils.hasText(attachmentsBasePath)
                ? Paths.get(attachmentsBasePath)
                : Paths.get("./uploads");
        return configured.toAbsolutePath().normalize();
    }

    private Path resolveRelativeDirectory() {
        LocalDate today = LocalDate.now();
        return Paths.get(String.valueOf(today.getYear()),
                String.format("%02d", today.getMonthValue()),
                String.format("%02d", today.getDayOfMonth()));
    }

    private String toForwardSlash(Path path) {
        String raw = path.toString();
        return raw.replace('\\', '/');
    }
}