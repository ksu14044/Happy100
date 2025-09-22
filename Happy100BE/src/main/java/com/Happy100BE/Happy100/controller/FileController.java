package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.response.FileUploadResponse;
import com.Happy100BE.Happy100.service.FileStorageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileController {

    private final FileStorageService fileStorageService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Upload attachment")
    public ResponseEntity<FileUploadResponse> upload(@RequestParam("file") MultipartFile file) {
        FileUploadResponse response = fileStorageService.store(file);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}