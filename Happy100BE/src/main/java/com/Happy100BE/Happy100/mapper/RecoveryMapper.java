package com.Happy100BE.Happy100.mapper;

import java.time.Instant;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.Happy100BE.Happy100.entity.ResetToken;
import com.Happy100BE.Happy100.entity.VerificationCode;

@Mapper
public interface RecoveryMapper {
    int insertVerificationCode(@Param("username") String username, @Param("email") String email, @Param("codeHash") String codeHash, @Param("expiresAt") Instant expiresAt, @Param("attempts") int attempts, @Param("maxAttempts") int maxAttempts, @Param("cooldownUntil") Instant cooldownUntil, @Param("consumed") boolean consumed);
    VerificationCode findActiveCodeByUser(@Param("username") String username,
                                        @Param("email") String email,
                                        @Param("now") Instant now);

    int markCodeConsumed(@Param("id") Long id, @Param("consumed") boolean consumed);

    int increaseAttempts(@Param("id") Long id);

    int updateCooldown(@Param("id") Long id, @Param("cooldownUntil") Instant cooldownUntil);

    int insertResetToken(@Param("username") String username,
                        @Param("email") String email,
                        @Param("tokenHash") String tokenHash,
                        @Param("expiresAt") Instant expiresAt,
                        @Param("consumed") boolean consumed);

    ResetToken findActiveTokenByHash(@Param("tokenHash") String tokenHash,
                                    @Param("now") Instant now);

    int markTokenConsumed(@Param("id") Long id, @Param("consumed") boolean consumed);
}
