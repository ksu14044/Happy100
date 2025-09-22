package com.Happy100BE.Happy100.security.oauth;

import com.Happy100BE.Happy100.security.jwt.JwtProperties;
import com.Happy100BE.Happy100.security.jwt.JwtService;
import com.Happy100BE.Happy100.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserService userService;
    private final JwtService jwtService;
    private final JwtProperties jwtProperties;

    @Value("${react.server.protocol:http}")
    private String reactProtocol;

    @Value("${react.server.host:localhost}")
    private String reactHost;

    @Value("${react.server.port:5173}")
    private int reactPort;

    @Value("${react.server.callback-path:/oauth2/callback}")
    private String reactCallbackPath;

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
        long expiresIn = jwtProperties.accessTokenValiditySeconds();

        String redirectUri = UriComponentsBuilder.fromHttpUrl(buildFrontendBaseUrl())
                .path(normalizePath(reactCallbackPath))
                .queryParam("accessToken", accessToken)
                .queryParam("tokenType", "Bearer")
                .queryParam("expiresIn", expiresIn)
                .queryParam("username", username)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUriString();

        response.sendRedirect(redirectUri);
    }

    private String buildFrontendBaseUrl() {
        StringBuilder sb = new StringBuilder();
        sb.append(reactProtocol).append("://").append(reactHost);
        boolean isDefaultPort = ("http".equalsIgnoreCase(reactProtocol) && reactPort == 80)
                || ("https".equalsIgnoreCase(reactProtocol) && reactPort == 443);
        if (!isDefaultPort && reactPort > 0) {
            sb.append(":").append(reactPort);
        }
        return sb.toString();
    }

    private String normalizePath(String path) {
        if (path == null || path.isBlank()) {
            return "/oauth2/callback";
        }
        return path.startsWith("/") ? path : "/" + path;
    }
}
