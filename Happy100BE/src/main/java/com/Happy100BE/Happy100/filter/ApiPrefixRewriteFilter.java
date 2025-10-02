package com.Happy100BE.Happy100.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Allows front-end to call endpoints with an "/api" prefix by forwarding internally to the existing path.
 */
@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiPrefixRewriteFilter extends OncePerRequestFilter {

    private static final String API_PREFIX = "/api";

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String uri = request.getRequestURI();
        if (uri != null && uri.startsWith(API_PREFIX)) {
            String forwardPath = uri.length() == API_PREFIX.length()
                    ? "/"
                    : uri.substring(API_PREFIX.length());

            RequestDispatcher dispatcher = request.getRequestDispatcher(forwardPath);
            dispatcher.forward(request, response);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
