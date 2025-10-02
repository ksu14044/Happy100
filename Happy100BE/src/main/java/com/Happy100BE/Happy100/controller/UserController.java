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
@RequestMapping("/users") 
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

    @Operation(summary = "내 정보", description = "인증된 경우 사용자 정보를 반환하고, 비인증은 빈 본문(200 또는 204)으로 응답합니다.")
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        String username = AuthUtil.getCurrentUsername(authentication);
        if (username == null || username.isBlank()) {
            // 비로그인 상태: 204 No Content 로 응답 (FE는 null/빈값으로 처리)
            return ResponseEntity.noContent().build();
        }
        UserInfoResponse response = userService.getMyInfo(username);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/me/delete")
    public ResponseEntity<Void> disableAccount(Authentication auth) {
        String username = AuthUtil.getCurrentUsername(auth);
        if (username == null || username.isBlank()) {
            throw new org.springframework.security.access.AccessDeniedException("인증 정보가 없습니다.");
        }
        userService.disableMyAccount(username);
        return ResponseEntity.noContent().build();
    }
}
