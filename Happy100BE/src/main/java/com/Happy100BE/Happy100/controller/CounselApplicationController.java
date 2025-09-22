package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.request.CounselApplicationRequest;
import com.Happy100BE.Happy100.service.CounselApplicationService;
import com.Happy100BE.Happy100.service.support.CounselApplicationType;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/api/counsel")
public class CounselApplicationController {

    private final CounselApplicationService counselApplicationService;

    @PostMapping(value = "/{type}", consumes = "multipart/form-data")
    public ResponseEntity<Void> submit(
            @PathVariable("type") String typeCode,
            @Valid @ModelAttribute CounselApplicationRequest request) {
        CounselApplicationType type = CounselApplicationType.fromCode(typeCode);
        counselApplicationService.submit(type, request);
        return ResponseEntity.accepted().build();
    }
}
