package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.cache.UserDetailsCache;
import com.Happy100BE.Happy100.entity.ResetToken;
import com.Happy100BE.Happy100.entity.VerificationCode;
import com.Happy100BE.Happy100.dto.request.PasswordFindConfirmRequest;
import com.Happy100BE.Happy100.dto.request.PasswordFindRequest;
import com.Happy100BE.Happy100.dto.request.PasswordFindVerifyRequest;
import com.Happy100BE.Happy100.repository.RecoveryRepository;
import com.Happy100BE.Happy100.repository.UserRepository;
import com.Happy100BE.Happy100.util.Hashing;
import com.Happy100BE.Happy100.util.PasswordPolicy;
import com.Happy100BE.Happy100.util.RandomCode;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class PasswordFindService {
    private final UserRepository userRepository;
    private final RecoveryRepository recoveryRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.Happy100BE.Happy100.config.MailSenderAdapter mailSenderAdapter;
    private final UserDetailsCache userDetailsCache;

    private static final Duration CODE_TTL = Duration.ofMinutes(10);
    private static final int CODE_MAX_ATTEMPTS = 5;
    private static final Duration RESEND_COOLDOWN = Duration.ofSeconds(60);
    private static final Duration RESET_TOKEN_TTL = Duration.ofMinutes(15);

    @Transactional
    public void requestVerificationCode(PasswordFindRequest req) {
        if (!StringUtils.hasText(req.getUsername())) throw new IllegalArgumentException("아이디가 비어 있습니다.");
        if (!StringUtils.hasText(req.getEmail())) throw new IllegalArgumentException("이메일이 비어 있습니다.");

        boolean match = userRepository.existsByUsernameAndEmail(req.getUsername(), req.getEmail());
        if (!match) throw new IllegalArgumentException("아이디와 이메일이 일치하지 않습니다.");

        Instant now = Instant.now();
        VerificationCode active = recoveryRepository.findActiveCodeByUser(req.getUsername(), req.getEmail(), now);
        if (active != null && active.getCooldownUntil() != null && now.isBefore(active.getCooldownUntil())) {
            throw new IllegalArgumentException("요청이 너무 잦습니다. 잠시 후 다시 시도해 주세요.");
        }

        String code = RandomCode.sixDigit();
        String codeHash = Hashing.sha256(code);
        Instant expiresAt = now.plus(CODE_TTL);
        Instant cooldownUntil = now.plus(RESEND_COOLDOWN);

        recoveryRepository.saveCodeForUser(req.getUsername(), req.getEmail(), codeHash, expiresAt, CODE_MAX_ATTEMPTS, cooldownUntil);
        mailSenderAdapter.sendCode(req.getEmail(), code, CODE_TTL.toMinutes());
    }

    @Transactional
    public String verifyCodeAndIssueToken(PasswordFindVerifyRequest req) {
        if (!StringUtils.hasText(req.getUsername())) throw new IllegalArgumentException("아이디가 비어 있습니다.");
        if (!StringUtils.hasText(req.getEmail())) throw new IllegalArgumentException("이메일이 비어 있습니다.");
        if (!StringUtils.hasText(req.getCode())) throw new IllegalArgumentException("인증코드가 비어 있습니다.");

        Instant now = Instant.now();
        VerificationCode row = recoveryRepository.findActiveCodeByUser(req.getUsername(), req.getEmail(), now);
        if (row == null) throw new IllegalArgumentException("사용 가능한 인증코드가 없습니다. 다시 요청해 주세요.");

        if (row.getAttempts() != null && row.getMaxAttempts() != null && row.getAttempts() >= row.getMaxAttempts()) {
            throw new IllegalArgumentException("인증 시도 횟수를 초과했습니다. 새 코드를 요청해 주세요.");
        }

        String codeHash = Hashing.sha256(req.getCode());
        if (!codeHash.equals(row.getCodeHash())) {
            recoveryRepository.increaseAttempts(row.getId());
            throw new IllegalArgumentException("인증코드가 일치하지 않습니다.");
        }

        recoveryRepository.markCodeConsumed(row.getId());

        String resetToken = RandomCode.opaqueToken();
        String tokenHash = Hashing.sha256(resetToken);
        Instant expiresAt = now.plus(RESET_TOKEN_TTL);
        recoveryRepository.saveResetTokenForUser(req.getUsername(), req.getEmail(), tokenHash, expiresAt);

        return resetToken;
    }

    @Transactional
    public void resetPassword(PasswordFindConfirmRequest req) {
        if (!StringUtils.hasText(req.getResetToken())) throw new IllegalArgumentException("리셋 토큰이 비어 있습니다.");
        PasswordPolicy.validate(req.getNewPassword());

        Instant now = Instant.now();
        ResetToken token = recoveryRepository.findActiveTokenByHash(Hashing.sha256(req.getResetToken()), now);
        if (token == null) throw new IllegalArgumentException("유효하지 않거나 만료된 요청입니다.");

        recoveryRepository.consumeToken(token.getId());

        String encoded = passwordEncoder.encode(req.getNewPassword());
        int rows = userRepository.updatePasswordByUsernameAndEmail(token.getUsername(), token.getEmail(), encoded);
        if (rows == 0) throw new IllegalArgumentException("대상 계정을 찾을 수 없습니다.");
        userDetailsCache.evict(token.getUsername());
    }
}
