package com.Happy100BE.Happy100.controller;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Handles 404 errors for SPA routes by forwarding them to index.html while leaving real errors intact.
 */
@Controller
public class SpaErrorController implements ErrorController {

    private static final String[] EXCLUDED_PREFIXES = {
            "/api", "/auth", "/uploads", "/files", "/assets",
            "/v3", "/swagger-ui", "/actuator", "/error"
    };

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {
        Object statusAttr = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (statusAttr == null) {
            return "error";
        }

        HttpStatus status = HttpStatus.valueOf(Integer.parseInt(statusAttr.toString()));
        if (status != HttpStatus.NOT_FOUND) {
            return "error";
        }

        Object uri = request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);
        if (uri instanceof String path) {
            if (shouldForward(path)) {
                return "forward:/index.html";
            }
        }
        return "error";
    }

    private boolean shouldForward(String path) {
        if (path == null || path.isEmpty()) {
            return true;
        }
        if (path.startsWith("/login/oauth2") || path.startsWith("/oauth2/authorization")) {
            return false;
        }

        for (String prefix : EXCLUDED_PREFIXES) {
            if (path.startsWith(prefix)) {
                return false;
            }
        }
        return !path.contains(".");
    }
}
