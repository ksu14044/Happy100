package com.Happy100BE.Happy100.config;

import com.Happy100BE.Happy100.security.filter.JwtAuthenticationFilter;
import com.Happy100BE.Happy100.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;

import java.time.Duration;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus; // ✅ 추가
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
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint; // ✅ 추가
import org.springframework.security.web.util.matcher.AntPathRequestMatcher; // ✅ 추가
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final CustomUserDetailsService userDetailsService;
        private final PasswordEncoder passwordEncoder; // BCrypt 등
        private final JwtAuthenticationFilter jwtAuthenticationFilter; // JWT 필터
        private final AuthenticationSuccessHandler oAuth2SuccessHandler;
        private final AuthenticationFailureHandler oAuth2FailureHandler;
        private final OAuth2UserService<OAuth2UserRequest, OAuth2User> customOAuth2UserService;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                                // JWT 기반이면 CSRF 대부분 비활성
                                .csrf(csrf -> csrf.disable())
                                .cors(Customizer.withDefaults())
                                .formLogin(f -> f.disable())
                                .httpBasic(b -> b.disable())

                                .authorizeHttpRequests(auth -> auth
                                                // 공개 문서
                                                .requestMatchers("/v3/api-docs/**", "/swagger-ui/**",
                                                                "/swagger-ui.html")
                                                .permitAll()
                                                // 인증/회원가입, 소셜 로그인 진입점 및 콜백 허용
                                                .requestMatchers("/api/auth/**", "/oauth2/**", "/login/**", "/api/counsel/**").permitAll()

                                                // ✅ 읽기 전용 공개 API (필요 시 조정)
                                                .requestMatchers(HttpMethod.GET,
                                                                "/api/notices/**",
                                                                "/api/recruits/**",
                                                                "/api/products/**",
                                                                "/api/posts/**",
                                                                "/api/boards/**",
                                                                "/uploads/**")
                                                .permitAll()

                                                // 관리자
                                                .requestMatchers("/api/admin/**").hasRole("ADMIN")

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
                                                .logoutUrl("/api/auth/logout")
                                                .deleteCookies("access_token", "refresh_token")
                                                .logoutSuccessHandler((req, res, auth) -> res.setStatus(204)))

                                .authenticationProvider(authenticationProvider())

                                // ✅ 핵심: /api/** 에서는 302 리다이렉트 대신 401을 응답 (CORS 회피)
                                .exceptionHandling(ex -> ex
                                                .defaultAuthenticationEntryPointFor(
                                                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED),
                                                                new AntPathRequestMatcher("/api/**")))

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
                cfg.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
                cfg.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
                cfg.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
                cfg.setExposedHeaders(List.of("Location", "Content-Disposition"));
                cfg.setAllowCredentials(true);
                cfg.setMaxAge(Duration.ofHours(1));

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", cfg);
                return source;
        }
}
