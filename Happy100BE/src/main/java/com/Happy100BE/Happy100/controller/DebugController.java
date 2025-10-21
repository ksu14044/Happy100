package com.Happy100BE.Happy100.controller;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 디버그용 엔드포인트. 엣지/프록시와 백엔드 중 어디서 리다이렉트가 발생하는지 확인하기 위해 사용한다.
 * - GET /__debug        : 간단 OK 응답
 * - GET /__debug/headers: 요청 헤더/원격 IP/스킴 등 정보를 반환
 */
@RestController
@RequestMapping("/__debug")
public class DebugController {

    @GetMapping(produces = MediaType.TEXT_PLAIN_VALUE)
    public String ok() {
        return "OK";
    }

    @GetMapping(path = "/headers", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> headers(HttpServletRequest request) {
        Map<String, Object> out = new LinkedHashMap<>();
        out.put("remoteAddr", request.getRemoteAddr());
        out.put("method", request.getMethod());
        out.put("requestURI", request.getRequestURI());
        out.put("scheme", request.getScheme());
        out.put("serverName", request.getServerName());
        out.put("serverPort", request.getServerPort());
        out.put("X-Forwarded-Proto", request.getHeader("X-Forwarded-Proto"));
        out.put("X-Forwarded-For", request.getHeader("X-Forwarded-For"));
        out.put("Host", request.getHeader(HttpHeaders.HOST));

        Map<String, String> headers = new LinkedHashMap<>();
        Enumeration<String> names = request.getHeaderNames();
        while (names != null && names.hasMoreElements()) {
            String name = names.nextElement();
            headers.put(name, request.getHeader(name));
        }
        out.put("headers", headers);
        return out;
    }
}

