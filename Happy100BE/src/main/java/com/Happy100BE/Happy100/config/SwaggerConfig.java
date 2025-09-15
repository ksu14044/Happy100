package com.Happy100BE.Happy100.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.OAuthFlow;
import io.swagger.v3.oas.models.security.OAuthFlows;
import io.swagger.v3.oas.models.security.Scopes;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    // application.yml의 Google OAuth2 엔드포인트와 동일하게 주입
    @Value("${spring.security.oauth2.client.provider.google.authorization-uri}")
    private String googleAuthorizationUrl;

    @Value("${spring.security.oauth2.client.provider.google.token-uri}")
    private String googleTokenUrl;

    // Swagger UI가 사용하는 기본 OAuth2 Redirect 페이지(기본 경로 유지 권장)
    // 필요 시 application.yml에 springdoc.swagger-ui.oauth2-redirect-url로 지정 가능
    private static final String OAUTH2_SCHEME = "oauth2-google";
    private static final String BEARER_SCHEME = "bearerAuth";

    @Bean
    public OpenAPI happy100OpenAPI() {

        // Bearer JWT 스키마(자체 토큰 테스트용)
        SecurityScheme bearer = new SecurityScheme()
                .name(BEARER_SCHEME)
                .type(SecurityScheme.Type.HTTP)
                .scheme("bearer")
                .bearerFormat("JWT");

        // OAuth2 Authorization Code 스키마(Google 로그인 흐름 확인용)
        SecurityScheme oauth2Google = new SecurityScheme()
                .name(OAUTH2_SCHEME)
                .type(SecurityScheme.Type.OAUTH2)
                .flows(new OAuthFlows()
                        .authorizationCode(new OAuthFlow()
                                .authorizationUrl(googleAuthorizationUrl) // https://accounts.google.com/o/oauth2/v2/auth
                                .tokenUrl(googleTokenUrl)                 // https://oauth2.googleapis.com/token
                                .scopes(new Scopes()
                                        .addString("openid", "OpenID")
                                        .addString("profile", "Profile")
                                        .addString("email", "Email")
                                )
                        )
                );

        // 전역 보안 요구: 기본은 Bearer JWT만 요구
        SecurityRequirement globalRequirement = new SecurityRequirement().addList(BEARER_SCHEME);

        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes(BEARER_SCHEME, bearer)
                        .addSecuritySchemes(OAUTH2_SCHEME, oauth2Google)
                )
                .addSecurityItem(globalRequirement)
                .info(new Info()
                        .title("Happy100 API")
                        .description("행복백세 프로젝트 API 문서")
                        .version("v1.0.0")
                        .contact(new Contact().name("김시욱").email("mhm1404@naver.com"))
                        .license(new License().name("Apache 2.0").url("http://springdoc.org"))
                );
    }
}