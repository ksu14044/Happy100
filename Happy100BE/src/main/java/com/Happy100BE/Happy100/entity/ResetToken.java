package com.Happy100BE.Happy100.entity;

import lombok.Data; import java.time.Instant;

@Data
public class ResetToken {
    private Long id;
    private String username;
    private String email;
    private String tokenHash;
    private Instant expiresAt;
    private Boolean consumed;
}