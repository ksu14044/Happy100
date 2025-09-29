package com.Happy100BE.Happy100.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * JWT 쿠키 설정값을 관리하는 프로퍼티 빈.
 * - 운영환경에서는 secure=true, sameSite=None(크로스 도메인 필요 시) 등을 검토한다.
 */
@Component
public class JwtCookieProperties {

    @Value("${jwt.cookie.name:access_token}")
    private String cookieName;

    @Value("${jwt.cookie.path:/}")
    private String path;

    @Value("${jwt.cookie.domain:}")
    private String domain; // 미설정 시 생략

    @Value("${jwt.cookie.secure:false}")
    private boolean secure;

    @Value("${jwt.cookie.http-only:true}")
    private boolean httpOnly;

    // Lax | Strict | None
    @Value("${jwt.cookie.same-site:Lax}")
    private String sameSite;

    public String name() { return cookieName; }
    public String path() { return path; }
    public String domain() { return domain; }
    public boolean secure() { return secure; }
    public boolean httpOnly() { return httpOnly; }
    public String sameSite() { return sameSite; }
}

