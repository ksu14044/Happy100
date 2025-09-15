package com.Happy100BE.Happy100.security.oauth;

import com.Happy100BE.Happy100.security.jwt.JwtService;
import com.Happy100BE.Happy100.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String provider = "google";
        String providerUserId;
        String email;
        String name;

        if (oAuth2User instanceof DefaultOidcUser oidc) {
            providerUserId = oidc.getSubject();
            email = oidc.getEmail();
            name = oidc.getFullName() != null ? oidc.getFullName() : oidc.getEmail();
        } else {
            providerUserId = String.valueOf(oAuth2User.getAttributes().getOrDefault("sub", ""));
            email = String.valueOf(oAuth2User.getAttributes().getOrDefault("email", ""));
            name = String.valueOf(oAuth2User.getAttributes().getOrDefault("name", email));
        }

        String username = userService.upsertSocialUser(provider, providerUserId, email, name);
        String role = userService.findRoleByUsername(username);
        String accessToken = jwtService.generateToken(username, role);

        // 보안상 쿼리 파라미터 대신 HttpOnly 쿠키로 전달
        ResponseCookie cookie = ResponseCookie.from("access_token", accessToken)
                .httpOnly(true)
                .secure(false) // 운영 환경에서는 true 권장(HTTPS)
                .path("/")
                .sameSite("Lax")
                .maxAge(3600)
                .build();
        response.addHeader("Set-Cookie", cookie.toString());

        // 존재하는 경로로 리다이렉트 (스웨거 UI)
        response.sendRedirect("/swagger-ui/index.html");
    }
}