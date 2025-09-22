package com.Happy100BE.Happy100.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.nio.file.Path;
import java.nio.file.Paths;

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
    }
}