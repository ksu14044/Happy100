package com.Happy100BE.Happy100.controller;

import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import com.Happy100BE.Happy100.service.UserService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;

import java.util.Collection;
import java.util.Collections;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@Validated
public class UserAdminController {
    private final UserService userService;

    private void assertAdmin(Authentication auth) {
        CustomUserPrincipal principal = (CustomUserPrincipal) auth.getPrincipal();
        Collection<? extends GrantedAuthority> roles = principal.getAuthorities();
        boolean admin = roles.stream().anyMatch(a -> "ROLE_ADMIN".equals(a.getAuthority()));
        if (!admin) {
            throw new org.springframework.security.access.AccessDeniedException("관리자 권한이 필요합니다.");
        }
    }

    // 관리자: 특정 사용자(username) 비활성화
    @DeleteMapping("/{targetUsername}")
    public ResponseEntity<Void> disableAccount(@PathVariable @NotBlank String targetUsername,
                                                Authentication auth) {
        assertAdmin(auth);
        userService.adminDisableAccount(targetUsername);
        return ResponseEntity.noContent().build();
    }
}
