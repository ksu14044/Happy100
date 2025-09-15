package com.Happy100BE.Happy100.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;

@Configuration
public class OAuth2UserServiceConfig {

    @Bean
    public OAuth2UserService<
            OAuth2UserRequest, OAuth2User> customOAuth2UserService() {
        // 표준 기본 구현체 사용: provider의 user-info-uri로 사용자 정보를 조회
        return new org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService();
    }
}