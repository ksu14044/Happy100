package com.Happy100BE.Happy100.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

/**
 * Forwards SPA routes (non-API GET requests without file extensions) to index.html so that
 * browser refreshes do not hit the Security entry point with 401.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE + 1)
public class SpaForwardFilter extends OncePerRequestFilter {

    private static final String[] EXCLUDED_PREFIXES = {
            "/api", "/auth", "/uploads", "/files", "/actuator", "/admin"
    };

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        if (shouldForward(request)) {
            RequestDispatcher dispatcher = request.getRequestDispatcher("/index.html");
            dispatcher.forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean shouldForward(HttpServletRequest request) {
        if (!"GET".equalsIgnoreCase(request.getMethod())) return false;

        String uri = request.getRequestURI();
        if (uri == null || uri.isEmpty() || "/".equals(uri)) return false;
        if (uri.equals("/index.html")) return false;

        if (uri.startsWith("/login/oauth2")) {
            return false;
        }

        if (uri.startsWith("/oauth2/authorization")) {
            return false;
        }

        for (String prefix : EXCLUDED_PREFIXES) {
            if (uri.startsWith(prefix)) {
                return false;
            }
        }

        if (uri.contains(".")) {
            return false;
        }

        String accept = request.getHeader("Accept");
        return accept == null || accept.contains("text/html");
    }
}
