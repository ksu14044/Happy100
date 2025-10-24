package com.Happy100BE.Happy100.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${app.attachments.base-path:./uploads}")
    private String attachmentsBasePath;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path base = StringUtils.hasText(attachmentsBasePath)
                ? Paths.get(attachmentsBasePath)
                : Paths.get("./uploads");
        String location = base.toAbsolutePath().normalize().toUri().toString();
        if (!location.endsWith("/")) {
            location = location + "/";
        }
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(location);

        registry.addResourceHandler(
                        "/favicon.ico",
                        "/favicon-16.png",
                        "/favicon-32.png",
                        "/apple-touch-icon.png",
                        "/manifest.json",
                        "/assets/**")
                .addResourceLocations("classpath:/static/", "classpath:/static/assets/")
                .setCacheControl(CacheControl.maxAge(30, TimeUnit.DAYS).cachePublic());
    }

    // Root index.html은 Spring Boot 기본 정적 자원 매핑을 활용하고,
    // '.' 문자가 없는 경로만 SPA 라우팅으로 처리하여 무한 포워딩을 방지한다.
}
