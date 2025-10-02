package com.Happy100BE.Happy100.security.oauth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.net.IDN;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
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

        log.warn("OAuth2 failure: message='{}', redirectUri={}", message, redirectUri);
        response.sendRedirect(redirectUri);
    }

    private String buildFrontendBaseUrl() {
        StringBuilder sb = new StringBuilder();
        sb.append(reactProtocol).append("://").append(normalizeHost(reactHost));
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

    private String normalizeHost(String host) {
        if (host == null || host.isBlank()) {
            return "localhost";
        }

        String trimmed = host.trim();

        trimmed = recoverEncoding(trimmed);

        try {
            String probe = trimmed.contains("://") ? trimmed : reactProtocol + "://" + trimmed;
            URI uri = URI.create(probe);
            String parsedHost = uri.getHost();
            if (parsedHost != null && !parsedHost.isBlank()) {
                String ascii = IDN.toASCII(parsedHost);
                log.debug("OAuth2 failure normalizeHost parsedHost={} ascii={}", parsedHost, ascii);
                return ascii;
            }
        } catch (Exception ignored) {
            // Fallback below
        }

        int slashIdx = trimmed.indexOf('/');
        if (slashIdx >= 0) {
            trimmed = trimmed.substring(0, slashIdx);
        }

        int colonIdx = trimmed.indexOf(':');
        if (colonIdx >= 0) {
            trimmed = trimmed.substring(0, colonIdx);
        }

        try {
            String ascii = IDN.toASCII(trimmed);
            log.debug("OAuth2 failure normalizeHost fallback trimmed={} ascii={}", trimmed, ascii);
            return ascii;
        } catch (IllegalArgumentException e) {
            log.warn("OAuth2 failure normalizeHost failed for host='{}': {}", host, e.getMessage());
            return trimmed;
        }
    }

    private String recoverEncoding(String value) {
        if (value == null || value.isEmpty()) {
            return value;
        }
        boolean hasLatinMojibake = value.chars().anyMatch(ch -> ch >= 0x80 && ch <= 0xFF);
        if (!hasLatinMojibake) {
            return value;
        }
        try {
            String recovered = new String(value.getBytes(java.nio.charset.StandardCharsets.ISO_8859_1),
                    java.nio.charset.StandardCharsets.UTF_8);
            log.debug("OAuth2 failure recoverEncoding '{}' -> '{}'", value, recovered);
            return recovered;
        } catch (Exception ex) {
            log.warn("OAuth2 failure recoverEncoding failed for '{}': {}", value, ex.getMessage());
            return value;
        }
    }
}
