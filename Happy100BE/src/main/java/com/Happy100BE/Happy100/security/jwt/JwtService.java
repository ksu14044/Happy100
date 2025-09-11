package com.Happy100BE.Happy100.security.jwt;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;


import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.Map;


@Service
public class JwtService {
    private final JwtProperties props;
    private SecretKey key;


    public JwtService(JwtProperties props) { this.props = props; }


    @PostConstruct
    void init() {
        this.key = Keys.hmacShaKeyFor(props.secret().getBytes(StandardCharsets.UTF_8));
    }


    public String generateToken(String username, String role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(username)
                .setIssuer(props.issuer())
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(props.accessTokenValiditySeconds())))
                .addClaims(Map.of("role", role))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    public String extractUsername(String token) {
        return getAllClaims(token).getSubject();
    }


    public String extractRole(String token) {
        Object r = getAllClaims(token).get("role");
        return r == null ? null : r.toString();
    }


    public boolean isExpired(String token) {
        return getAllClaims(token).getExpiration().before(new Date());
    }


    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token).getBody();
    }
}