package com.Happy100BE.Happy100.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * 프록시의 X-Forwarded-* 헤더를 기반으로 HTTP 요청을 HTTPS로 301 리다이렉트한다.
 */
@Component
public class ForceHttpsRedirectFilter extends OncePerRequestFilter {

        private final boolean forceHttps;

        public ForceHttpsRedirectFilter(@Value("${app.security.force-https.enabled:false}") boolean forceHttps) {
                this.forceHttps = forceHttps;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
                        throws ServletException, IOException {
                if (!forceHttps) {
                        filterChain.doFilter(request, response);
                        return;
                }

                if (request.isSecure()) {
                        filterChain.doFilter(request, response);
                        return;
                }

                String forwardedProto = request.getHeader("X-Forwarded-Proto");
                if (!StringUtils.hasText(forwardedProto)) {
                        // 프록시가 원본 스킴을 알리지 못하면 무한 루프를 피하기 위해 우회한다.
                        filterChain.doFilter(request, response);
                        return;
                }
                if ("https".equalsIgnoreCase(resolveFirstHeaderValue(forwardedProto))) {
                        filterChain.doFilter(request, response);
                        return;
                }

                String redirectUrl = buildRedirectUrl(request);
                response.setStatus(HttpStatus.MOVED_PERMANENTLY.value());
                response.setHeader(HttpHeaders.LOCATION, redirectUrl);
                response.setContentLength(0);
                response.flushBuffer();
        }

        private String buildRedirectUrl(HttpServletRequest request) {
                UriComponentsBuilder builder = UriComponentsBuilder
                                .fromHttpRequest(new ServletServerHttpRequest(request))
                                .scheme("https");

                String forwardedHost = resolveFirstHeaderValue(request.getHeader("X-Forwarded-Host"));
                if (!StringUtils.hasText(forwardedHost)) {
                        forwardedHost = request.getHeader(HttpHeaders.HOST);
                }
                if (StringUtils.hasText(forwardedHost)) {
                        HostPort hostPort = parseHostAndPort(forwardedHost);
                        builder.host(hostPort.host());
                        if (hostPort.port() != null) {
                                builder.port(hostPort.port());
                        }
                }

                String forwardedPort = resolveFirstHeaderValue(request.getHeader("X-Forwarded-Port"));
                if (StringUtils.hasText(forwardedPort)) {
                        builder.port(normalizePort(forwardedPort));
                }

                String forwardedPrefix = resolveFirstHeaderValue(request.getHeader("X-Forwarded-Prefix"));
                if (StringUtils.hasText(forwardedPrefix)) {
                        builder.replacePath(normalizePath(forwardedPrefix, request.getRequestURI()))
                                        .replaceQuery(request.getQueryString());
                }

                return builder.build(true).toUriString();
        }

        private String resolveFirstHeaderValue(String headerValue) {
                if (!StringUtils.hasText(headerValue)) {
                        return null;
                }
                int commaIndex = headerValue.indexOf(',');
                String value = commaIndex >= 0 ? headerValue.substring(0, commaIndex) : headerValue;
                return value.trim();
        }

        private Integer normalizePort(String forwardedPort) {
                try {
                        int port = Integer.parseInt(forwardedPort.trim());
                        if (port == 80 || port == 0) {
                                return null;
                        }
                        return port;
                } catch (NumberFormatException ex) {
                        return null;
                }
        }

        private String normalizePath(String prefix, String originalUri) {
                String cleanedPrefix = prefix.endsWith("/") ? prefix.substring(0, prefix.length() - 1) : prefix;
                if (!cleanedPrefix.startsWith("/")) {
                        cleanedPrefix = "/" + cleanedPrefix;
                }
                if (!originalUri.startsWith("/")) {
                        originalUri = "/" + originalUri;
                }
                if ("/".equals(cleanedPrefix)) {
                        return originalUri;
                }
                return cleanedPrefix + originalUri;
        }

        private HostPort parseHostAndPort(String hostHeader) {
                if (!StringUtils.hasText(hostHeader)) {
                        return new HostPort("", null);
                }
                String value = hostHeader.trim();
                if (value.startsWith("[")) {
                        int end = value.indexOf(']');
                        if (end > 0) {
                                String host = value.substring(1, end);
                                Integer port = null;
                                if (value.length() > end + 1 && value.charAt(end + 1) == ':') {
                                        port = normalizePort(value.substring(end + 2));
                                }
                                return new HostPort(host, port);
                        }
                }
                int colon = value.indexOf(':');
                if (colon >= 0 && value.indexOf(':', colon + 1) == -1) {
                        String host = value.substring(0, colon);
                        Integer port = normalizePort(value.substring(colon + 1));
                        return new HostPort(host, port);
                }
                return new HostPort(value, null);
        }

        private record HostPort(String host, Integer port) {
        }
}
