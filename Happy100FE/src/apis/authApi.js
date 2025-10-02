import { api } from "../configs/axiosConfig";

/**
 * 로그인 요청
 * @param {{ username: string, password: string }} payload
 * LoginRequest.java의 필드명이 username/password와 다르면 적절히 변경하세요.
 * (예: { loginId: username, password })
 */
export async function loginApi({ username, password }) {
    // 백엔드 경로에 맞게 수정: /api/auth/login, /auth/login 등
    const res = await api.post("/api/auth/login", {
        username,          // <- LoginRequest.java가 요구하는 키로 맞추세요
        password,
    }, {
        headers: { "Content-Type": "application/json" },
    });

    // 쿠키 기반 인증: 서버가 Set-Cookie로 토큰을 설정함
    try {
        sessionStorage.setItem('has_session', '1');
    } catch (error) {
        console.warn('세션 저장에 실패했습니다.', error);
    }
    return res.data;
}

/** 로그아웃(클라이언트 측) */
export async function logout() {
    try {
        await api.post("/api/auth/logout");
    } catch (error) {
        console.warn("로그아웃 요청 중 오류", error);
    } finally {
        // 세션 힌트 제거
        try {
            sessionStorage.removeItem('has_session');
        } catch (error) {
            console.warn('세션 힌트 제거 중 오류가 발생했습니다.', error);
        }
        try {
            localStorage.removeItem('user_preview');
        } catch (error) {
            console.warn('사용자 프리뷰 제거 중 오류가 발생했습니다.', error);
        }
    }
}

export async function checkUsernameDuplicate(username) {
    if (!username?.trim()) {
        throw new Error("아이디를 입력해주세요.");
    }
    const res = await api.get("/api/auth/check-username", {
        params: { username: username.trim() },
    });
    return res.data;
}

export async function checkEmailDuplicate(email) {
    if (!email?.trim()) {
        throw new Error("이메일을 입력해주세요.");
    }
    const res = await api.get("/api/auth/check-email", {
        params: { email: email.trim() },
    });
    return res.data;
}

/**
 * 이메일로 아이디 찾기
 * @param {string} email
 * @returns {Promise<string>}
 */
export async function findUsernameByEmail(email) {
    const res = await api.get("/api/auth/find-username", { params: { email } });
    return res.data;
}

/**
 * 비밀번호 재설정 인증 코드 요청
 * @param {{ username: string, email: string }} payload
 * @returns {Promise<{ result: string }>}
 */
export async function requestPasswordResetCode(payload) {
    const res = await api.post("/api/auth/request", payload, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data;
}

/**
 * 인증 코드 확인 및 리셋 토큰 발급
 * @param {{ username: string, email: string, code: string }} payload
 * @returns {Promise<string>} resetToken
 */
export async function verifyPasswordResetCode(payload) {
    const res = await api.post("/api/auth/verify", payload, {
        headers: { "Content-Type": "application/json" },
    });
    return res.data?.resetToken;
}

/**
 * 발급된 토큰으로 비밀번호 재설정 완료
 * @param {{ resetToken: string, newPassword: string }} payload
 * @returns {Promise<void>}
 */
export async function confirmPasswordReset(payload) {
    await api.post("/api/auth/confirm", payload, {
        headers: { "Content-Type": "application/json" },
    });
}

export async function signUpApi({ username, password, name, email }) {
    if (!username || !password || !name || !email) {
        throw new Error("필수값이 누락되었습니다.");
    }
    const res = await api.post(
        "/api/auth/signup",
        { username, password, name, email },
        { headers: { "Content-Type": "application/json" } }
    );
    return res.data; // 보통 { success: true } 또는 생성된 user 정보
}
