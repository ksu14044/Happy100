package com.Happy100BE.Happy100.security.filter;

import com.Happy100BE.Happy100.security.jwt.JwtService;
import com.Happy100BE.Happy100.security.jwt.TokenCookieUtil;
import com.Happy100BE.Happy100.security.principal.CustomUserPrincipal;
import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final String BEARER_PREFIX = "Bearer ";
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenCookieUtil tokenCookieUtil;

    @Override
    protected void doFilterInternal(@Nonnull HttpServletRequest request,
                                    @Nonnull HttpServletResponse response,
                                    @Nonnull FilterChain chain) throws ServletException, IOException {

        // 기존 인증 존재 여부 확인(세션 기반 OAuth2 등)
        Authentication existing = SecurityContextHolder.getContext().getAuthentication();

        String token = null;

        // 1) 우선 Authorization: Bearer 헤더 시도 (기존 호환)
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authHeader != null && authHeader.startsWith(BEARER_PREFIX)) {
            token = authHeader.substring(BEARER_PREFIX.length());
        }

        // 2) 없으면 HttpOnly 쿠키에서 조회 (권장 방식)
        if (token == null) {
            token = tokenCookieUtil.resolveTokenFromRequest(request);
        }

        if (token == null) {
            // 토큰이 전혀 없으면 기존 인증 상태 유지
            chain.doFilter(request, response);
            return;
        }

        String username;
        try {
            // Access 전용 토큰 파싱 가정
            username = jwtService.extractUsername(token);
        } catch (Exception e) {
            // 파싱 실패(서명 오류/포맷 불일치 등)
            log.debug("JWT 파싱 실패: {}", e.getMessage());
            // 힌트 헤더(옵션): 디버깅 또는 프록시 로깅에 도움
            response.setHeader("X-Auth-Error", "invalid_token");
            chain.doFilter(request, response);
            return;
        }

        if (username == null) {
            chain.doFilter(request, response);
            return;
        }

        try {
            // 만료/위변조 체크
            if (jwtService.isExpired(token)) {
                log.debug("JWT 만료: user={}", username);
                response.setHeader("X-Auth-Error", "expired_token");
                chain.doFilter(request, response);
                return;
            }

            // 유저 조회 및 컨텍스트 설정
            UserDetails user = userDetailsService.loadUserByUsername(username);

            // 필요 시 커스텀 프린시펄 활용
            if (user instanceof CustomUserPrincipal principal) {
                // principal에서 내부 userId, provider 등 활용 가능
                // 예: request.setAttribute("uid", principal.getUserId());
            }

            UsernamePasswordAuthenticationToken auth =
                    new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);

        } catch (Exception e) {
            // 방어적 로깅만 하고 요청 흐름은 유지
            log.warn("JWT 인증 처리 중 예외: {}", e.getMessage());
            response.setHeader("X-Auth-Error", "auth_failure");
        }

        chain.doFilter(request, response);
    }
}
