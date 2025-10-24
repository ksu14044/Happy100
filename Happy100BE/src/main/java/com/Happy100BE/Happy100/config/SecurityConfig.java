package com.Happy100BE.Happy100.config;

import com.Happy100BE.Happy100.security.filter.ForceHttpsRedirectFilter;
import com.Happy100BE.Happy100.security.filter.JwtAuthenticationFilter;
import com.Happy100BE.Happy100.service.CustomUserDetailsService;
import java.time.Duration;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.util.StringUtils;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final CustomUserDetailsService userDetailsService;
        private final PasswordEncoder passwordEncoder; // BCrypt 등
        private final JwtAuthenticationFilter jwtAuthenticationFilter; // JWT 필터
        private final AuthenticationSuccessHandler oAuth2SuccessHandler;
        private final AuthenticationFailureHandler oAuth2FailureHandler;
        private final OAuth2UserService<OAuth2UserRequest, OAuth2User> customOAuth2UserService;
        private final com.Happy100BE.Happy100.security.jwt.TokenCookieUtil tokenCookieUtil;
        private final ForceHttpsRedirectFilter forceHttpsRedirectFilter;

        @Value("${app.cors.allowed-origins:http://localhost:5173,http://127.0.0.1:5173}")
        private String corsAllowedOrigins;

        @Value("${app.security.hsts.enabled:false}")
        private boolean hstsEnabled;

        @Value("${app.security.hsts.max-age:0}")
        private long hstsMaxAgeSeconds;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                // JWT 기반이면 CSRF 대부분 비활성
                                .csrf(csrf -> csrf.disable())
                                .cors(Customizer.withDefaults())
                                .formLogin(f -> f.disable())
                                .httpBasic(b -> b.disable())

                                // 보안 헤더 기본값 및 HSTS(프로덕션에서만 활성 권장)
                                .headers(headers -> {
                                        headers.contentTypeOptions(Customizer.withDefaults());
                                        headers.frameOptions(frame -> frame.sameOrigin());
                                        headers.referrerPolicy(ref -> ref.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN));
                                        if (hstsEnabled) {
                                                headers.httpStrictTransportSecurity(h -> h
                                                                .includeSubDomains(true)
                                                                .preload(false)
                                                                .maxAgeInSeconds(Math.max(0, hstsMaxAgeSeconds))
                                                );
                                        } else {
                                                headers.httpStrictTransportSecurity(h -> h.disable());
                                        }
                                })
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                                                // 공개 문서
                                                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                // 인증/회원가입, 소셜 로그인 진입점 및 콜백 허용
                                                .requestMatchers("/auth/**", "/oauth2/**", "/login/**", "/counsel/**").permitAll()

                                                // 정적 SPA 리소스 허용
                                                .requestMatchers(
                                                                "/",
                                                                "/index.html",
                                                                "/vite.svg",
                                                                "/assets/**",
                                                                "/favicon.ico",
                                                                "/favicon-16.png",
                                                                "/favicon-32.png",
                                                                "/apple-touch-icon.png",
                                                                "/site.webmanifest",
                                                                "/manifest.json",
                                                                "/robots.txt",
                                                                "/naver2603cf3c756331c8f6900b52cf60a486.html",
                                                                "/sitemap.xml")
                                                .permitAll()

                                                // ✅ 읽기 전용 공개 API (필요 시 조정)
                                                .requestMatchers(HttpMethod.GET,
                                                                "/api/notices",
                                                                "/api/notices/**",
                                                                "/api/recruits",
                                                                "/api/recruits/**",
                                                                "/api/products",
                                                                "/api/products/**",
                                                                "/api/posts",
                                                                "/api/posts/**",
                                                                "/api/boards",
                                                                "/api/boards/**",
                                                                "/api/uploads/**",
                                                                "/notices",
                                                                "/notices/**",
                                                                "/recruits",
                                                                "/recruits/**",
                                                                "/products",
                                                                "/products/**",
                                                                "/posts",
                                                                "/posts/**",
                                                                "/boards",
                                                                "/boards/**",
                                                                "/uploads/**")
                                                .permitAll()

                                                // 인증 여부 확인용 me 엔드포인트는 항상 통과(컨트롤러에서 비인증 시 빈 응답)
                                                .requestMatchers(HttpMethod.GET, "/users/me", "/api/users/me").permitAll()

                                                // 프록시 전환기 위해 API 전체 허가 (추후 필요 시 축소)
                                                .requestMatchers("/api/**").permitAll()

                                                // 관리자
                                                .requestMatchers("/admin/**").hasRole("ADMIN")

                                                // 그 외 보호
                                                .anyRequest().authenticated())

                                // OAuth2 로그인
                                .oauth2Login(oauth -> oauth
                                                .userInfoEndpoint(userInfo -> userInfo
                                                                .userService(customOAuth2UserService))
                                                .successHandler(oAuth2SuccessHandler)
                                                .failureHandler(oAuth2FailureHandler))

                                // 로그아웃
                                .logout(logout -> logout
                                                .logoutUrl("/auth/logout")
                                                .deleteCookies("access_token", "refresh_token")
                                                .logoutSuccessHandler((req, res, auth) -> {
                                                        // 도메인/경로 특성에 맞춘 삭제 쿠키도 함께 내려 신뢰도 향상
                                                        var del = tokenCookieUtil.buildDeleteCookie();
                                                        res.addHeader("Set-Cookie", del.toString());
                                                        res.setStatus(204);
                                                }))

                                .authenticationProvider(authenticationProvider())

                                // ✅ 핵심: API 요청에는 302 리다이렉트 대신 401을 응답 (CORS 회피)
                                .exceptionHandling(ex -> ex
                                                .defaultAuthenticationEntryPointFor(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                                                                new AntPathRequestMatcher("/**")))

                                // HTTP -> HTTPS 301 강제 리다이렉트를 ChannelProcessing 이전에서 처리
                                .addFilterBefore(forceHttpsRedirectFilter, ChannelProcessingFilter.class)

                                // JWT 필터
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public AuthenticationProvider authenticationProvider() {
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
                provider.setHideUserNotFoundExceptions(false);
                provider.setUserDetailsService(userDetailsService);
                provider.setPasswordEncoder(passwordEncoder);
                return provider;
        }

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
                return configuration.getAuthenticationManager();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration cfg = new CorsConfiguration();
                // withCredentials=true 이므로 반드시 정확한 오리진 명시('*' 금지)
                cfg.setAllowedOrigins(resolveAllowedOrigins());
                cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
                cfg.setExposedHeaders(List.of("Location", "Content-Disposition"));
                cfg.setAllowCredentials(true);
                cfg.setMaxAge(Duration.ofHours(1));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", cfg);
                return source;
        }

        private List<String> resolveAllowedOrigins() {
                if (!StringUtils.hasText(corsAllowedOrigins)) {
                        return List.of("http://localhost:5173", "http://127.0.0.1:5173");
                }
                return Arrays.stream(corsAllowedOrigins.split(","))
                                .map(String::trim)
                                .filter(StringUtils::hasText)
                                .toList();
        }

}
