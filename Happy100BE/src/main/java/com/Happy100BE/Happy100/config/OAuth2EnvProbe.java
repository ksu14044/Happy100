package com.Happy100BE.Happy100.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2EnvProbe {

    private final Environment env;

    @PostConstruct
    public void logGoogleOAuth2Keys() {
        // application.yml에서 ${OAUTH_GOOGLE_CLIENT_ID}, ${OAUTH_GOOGLE_CLIENT_SECRET}로 참조 중이므로
        // 실제 프로세스 환경변수에서 바로 읽어 확인합니다.
        String clientId = env.getProperty("OAUTH_GOOGLE_CLIENT_ID", "");
        String clientSecret = env.getProperty("OAUTH_GOOGLE_CLIENT_SECRET", "");
        int idLen = clientId != null ? clientId.length() : 0;
        int secLen = clientSecret != null ? clientSecret.length() : 0;

        // 민감정보 노출 금지: 길이만 로그로 남깁니다.
        log.info("OAuth2 google clientId length={}, clientSecret length={}", idLen, secLen);

        if (idLen == 0 || secLen == 0) {
            log.warn("OAuth2 google 환경변수 주입 실패 감지: clientId 또는 clientSecret이 비어 있습니다. " +
                     "IDE 실행 구성 또는 OS 환경변수 설정을 확인하세요.");
        }
    }
}
