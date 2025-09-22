package com.Happy100BE.Happy100.security.oauth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Value("${react.server.protocol:http}")
    private String reactProtocol;

    @Value("${react.server.host:localhost}")
    private String reactHost;

    @Value("${react.server.port:5173}")
    private int reactPort;

    @Value("${react.server.failure-path:/oauth2/callback}")
    private String reactFailurePath;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception)
            throws IOException {
        String message = exception != null && exception.getMessage() != null
                ? exception.getMessage()
                : "OAuth2 인증에 실패했습니다.";

        String redirectUri = UriComponentsBuilder.fromHttpUrl(buildFrontendBaseUrl())
                .path(normalizePath(reactFailurePath))
                .queryParam("error", message)
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
