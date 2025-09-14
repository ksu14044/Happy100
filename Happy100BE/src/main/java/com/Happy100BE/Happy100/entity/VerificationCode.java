package com.Happy100BE.Happy100.entity;

import java.time.Instant;

import lombok.Data;

@Data
public class VerificationCode {
    private Long id;
    private String username;
    private String email;
    private String codeHash;
    private Instant expiresAt;
    private Integer attempts;
    private Integer maxAttempts;
    private Instant cooldownUntil;
    private Boolean consumed;
}
