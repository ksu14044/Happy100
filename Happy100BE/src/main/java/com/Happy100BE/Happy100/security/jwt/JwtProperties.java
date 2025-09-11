package com.Happy100BE.Happy100.security.jwt;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Component
public class JwtProperties {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.issuer}")
    private String issuer;
    @Value("${jwt.access-token-validity-seconds}")
    private long accessTokenValiditySeconds;


    public String secret() { return secret; }
    public String issuer() { return issuer; }
    public long accessTokenValiditySeconds() { return accessTokenValiditySeconds; }
}