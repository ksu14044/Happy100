package com.Happy100BE.Happy100.config;

import com.Happy100BE.Happy100.security.filter.JwtAuthenticationFilter;
import com.Happy100BE.Happy100.service.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

        private final CustomUserDetailsService userDetailsService;
        private final PasswordEncoder passwordEncoder;                    // BCrypt 등
        private final JwtAuthenticationFilter jwtAuthenticationFilter;    // JWT 필터
        // 아래 두 빈(성공/실패 핸들러, 사용자서비스)은 없으면 생성해 드릴 수 있습니다.
        private final AuthenticationSuccessHandler oAuth2SuccessHandler;
        private final AuthenticationFailureHandler oAuth2FailureHandler;
        // 선택: 제공자별 속성 매핑이 필요하면 커스텀 서비스 주입
        private final OAuth2UserService<OAuth2UserRequest,OAuth2User> customOAuth2UserService;

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
                http
                // CSRF: JWT 기반 API 서버이면 비활성화하거나, 필요한 경로만 무시 처리
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.disable())
                .formLogin(f -> f.disable())
                .httpBasic(b -> b.disable())

                .authorizeHttpRequests(auth -> auth
                        // 공개 문서
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        // 인증/회원가입, 소셜 로그인 진입점 및 콜백 허용
                        .requestMatchers(
                        "/api/auth/**",
                        "/oauth2/**",
                        "/login/**"
                        ).permitAll()
                        // 게시글 GET 공개
                        .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/boards/**").permitAll()
                        // 관리자 영역
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")
                        // 나머지는 인증 필요
                        .anyRequest().authenticated()
                )

                // OAuth2 로그인 설정
                .oauth2Login(oauth -> oauth
                        // 커스텀 로그인 시작 경로가 있다면 지정 가능(예: /login/google -> /oauth2/authorization/google로 리다이렉트)

                        .userInfoEndpoint(userInfo -> userInfo
                        .userService(customOAuth2UserService)
                        )
                        .successHandler(oAuth2SuccessHandler)
                        .failureHandler(oAuth2FailureHandler)
                )

                // 로그아웃(쿠키 삭제 등은 핸들러에서 추가 가능)
                .logout(logout -> logout
                        .logoutUrl("/api/auth/logout")
                        .deleteCookies("access_token", "refresh_token")
                        .logoutSuccessHandler((req, res, auth) -> res.setStatus(204))
                )

                // DAO 인증 프로바이더
                .authenticationProvider(authenticationProvider())

                // JWT 필터 등록: UsernamePasswordAuthenticationFilter 앞
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

        // 컨트롤러 주입용 AuthenticationManager
        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
                return configuration.getAuthenticationManager();
        }
}