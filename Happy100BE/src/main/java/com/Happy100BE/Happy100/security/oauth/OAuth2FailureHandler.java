package com.Happy100BE.Happy100.security.oauth;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception)
            throws IOException {
        System.out.println(exception);
        String msg = URLEncoder.encode(exception.getMessage(), StandardCharsets.UTF_8);
    
        // 존재하는 경로로 리다이렉트 (스웨거 UI)
        response.sendRedirect("/swagger-ui/index.html?error=" + msg);
    }
}