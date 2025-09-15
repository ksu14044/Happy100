package com.Happy100BE.Happy100.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProperties props;
    private SecretKey accessKey;
    private static final long CLOCK_SKEW_SECONDS = 60;

    @PostConstruct
    void init() {
        String secret = props.secret();
        if (secret == null || secret.getBytes(StandardCharsets.UTF_8).length < 32) {
            throw new IllegalStateException("jwt.secret은 32바이트 이상이어야 합니다.");
        }
        this.accessKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    // 기존 generateToken 대체: 표준 클레임 일부 강화(typ, jti)
    public String generateToken(String username, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setId(UUID.randomUUID().toString())
                .setSubject(username)                     // 기존 호환 유지
                .setIssuer(props.issuer())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(props.accessTokenValiditySeconds())))
                .addClaims(Map.of("role", role))
                .signWith(accessKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return parseClaims(token).getBody().getSubject();
    }

    public String extractRole(String token) {
        Object r = parseClaims(token).getBody().get("role");
        return r == null ? null : r.toString();
    }

    public boolean isExpired(String token) {
        Date exp = parseClaims(token).getBody().getExpiration();
        if (exp == null) return true;
        return exp.toInstant().plusSeconds(CLOCK_SKEW_SECONDS).isBefore(Instant.now());
    }

    private Jws<Claims> parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(accessKey)
                .setAllowedClockSkewSeconds(CLOCK_SKEW_SECONDS)
                .build()
                .parseClaimsJws(token);
    }
}