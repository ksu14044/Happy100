package com.Happy100BE.Happy100.security.jwt;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseCookie.ResponseCookieBuilder;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Arrays;

/**
 * JWT 액세스 토큰을 HttpOnly 쿠키로 설정/삭제/조회하는 유틸리티.
 */
@Component
public class TokenCookieUtil {
    private final JwtCookieProperties props;

    public TokenCookieUtil(JwtCookieProperties props) {
        this.props = props;
    }

    /**
     * 액세스 토큰을 응답 쿠키로 설정할 때 사용한다.
     */
    public ResponseCookie buildAccessTokenCookie(String token, long maxAgeSeconds) {
        ResponseCookieBuilder b = ResponseCookie.from(props.name(), token)
                .httpOnly(props.httpOnly())
                .secure(props.secure())
                .path(props.path())
                .maxAge(Duration.ofSeconds(maxAgeSeconds));

        if (props.domain() != null && !props.domain().isBlank()) {
            b.domain(props.domain());
        }
        // Spring 6 ResponseCookie는 sameSite 설정을 지원한다.
        if (props.sameSite() != null && !props.sameSite().isBlank()) {
            b.sameSite(props.sameSite());
        }
        return b.build();
    }

    /**
     * 액세스 토큰 삭제용 쿠키(즉시 만료)를 생성한다.
     */
    public ResponseCookie buildDeleteCookie() {
        ResponseCookieBuilder b = ResponseCookie.from(props.name(), "")
                .httpOnly(props.httpOnly())
                .secure(props.secure())
                .path(props.path())
                .maxAge(Duration.ZERO);
        if (props.domain() != null && !props.domain().isBlank()) {
            b.domain(props.domain());
        }
        if (props.sameSite() != null && !props.sameSite().isBlank()) {
            b.sameSite(props.sameSite());
        }
        return b.build();
    }

    /**
     * 요청 쿠키에서 액세스 토큰 값을 꺼낸다. 없으면 null 반환.
     */
    public String resolveTokenFromRequest(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null || cookies.length == 0) return null;
        return Arrays.stream(cookies)
                .filter(c -> props.name().equals(c.getName()))
                .map(Cookie::getValue)
                .findFirst()
                .orElse(null);
    }
}

