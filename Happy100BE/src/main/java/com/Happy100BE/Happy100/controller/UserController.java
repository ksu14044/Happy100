package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.dto.response.UserInfoResponse;
import com.Happy100BE.Happy100.security.AuthUtil;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import com.Happy100BE.Happy100.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.constraints.Email; 
import jakarta.validation.constraints.NotBlank; 
import lombok.RequiredArgsConstructor; 
import org.springframework.http.ResponseEntity; 
import org.springframework.security.core.Authentication; 
import org.springframework.validation.annotation.Validated; 
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users") 
@RequiredArgsConstructor 
@Validated
public class UserController {
    private final UserService userService;
    @PutMapping("/me/password")
    @Operation(summary = "비밀번호 변경")
    public ResponseEntity<Void> putMyPassword(@RequestParam @NotBlank String password,
                                            Authentication auth) {
        String username = AuthUtil.getCurrentUsername(auth);
        if (username == null || username.isBlank()) {
            throw new org.springframework.security.access.AccessDeniedException("인증 정보가 없습니다.");
        }
        userService.putPasswordByUsername(username, password);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/me/email")
    @Operation(summary = "email 변경")
    public ResponseEntity<Void> putMyEmail(@RequestParam @Email @NotBlank String email,
                                        Authentication auth) {
        String username = AuthUtil.getCurrentUsername(auth);
        if (username == null || username.isBlank()) {
            throw new org.springframework.security.access.AccessDeniedException("인증 정보가 없습니다.");
        }
        userService.putEmailByUsername(username, email);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me/name")
    @Operation(summary = "이름 변경")
    public ResponseEntity<Void> putMyName(@RequestParam @NotBlank String name,
                                        Authentication auth) {
        String username = AuthUtil.getCurrentUsername(auth);
        if (username == null || username.isBlank()) {
            throw new org.springframework.security.access.AccessDeniedException("인증 정보가 없습니다.");
        }
        userService.putNameByUsername(username, name);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "내 정보", description = "JWT로 인증된 사용자의 정보를 반환합니다.")
    @SecurityRequirement(name = "bearerAuth")
    @GetMapping("/me")
    public ResponseEntity<UserInfoResponse> me(Authentication authentication) {
        CustomUserPrincipal principal = (CustomUserPrincipal) authentication.getPrincipal();
        UserInfoResponse response = userService.getMyInfo(principal.getUsername());
        return ResponseEntity.ok(response);
    }
}
