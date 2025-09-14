package com.Happy100BE.Happy100.repository;

import java.time.Instant;

import org.springframework.stereotype.Repository;

import com.Happy100BE.Happy100.entity.ResetToken;
import com.Happy100BE.Happy100.entity.VerificationCode;
import com.Happy100BE.Happy100.mapper.RecoveryMapper;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class RecoveryRepository {
    private final RecoveryMapper mapper;
    public void saveCodeForUser(String username, String email, String codeHash, Instant expiresAt, int maxAttempts, Instant cooldownUntil){
        mapper.insertVerificationCode(username, email, codeHash, expiresAt, 0, maxAttempts, cooldownUntil, false);
    };
    public VerificationCode findActiveCodeByUser(String username, String email, Instant now){
        return mapper.findActiveCodeByUser(username, email, now);
    };
    public void markCodeConsumed(Long id){
        mapper.markCodeConsumed(id, true);
    };
    public void increaseAttempts(Long id){
        mapper.increaseAttempts(id);
    };
    public void updateCooldown(Long id, Instant cooldownUntil){
        mapper.updateCooldown(id, cooldownUntil);
    };
    public void saveResetTokenForUser(String username, String email, String tokenHash, Instant expiresAt){
        mapper.insertResetToken(username, email, tokenHash, expiresAt, false);
    };
    public ResetToken findActiveTokenByHash(String tokenHash, Instant now){
        return mapper.findActiveTokenByHash(tokenHash, now);
    };
    public void consumeToken(Long id){
        mapper.markTokenConsumed(id, true);
    };
}
