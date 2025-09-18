import { api } from "../configs/axiosConfig";
import { tokenStorage } from "../libs/authStorage";

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

    const data = res.data; // LoginResponse.java 응답 본문

    // 다양한 이름을 허용해 토큰 추출(백엔드 구현과 일치하면 첫 키에서 잡힙니다)
    const accessToken = data.accessToken ?? data.token ?? data.jwt ?? data.access_token;
    const refreshToken = data.refreshToken ?? data.refresh_token ?? null;
    const tokenType = data.tokenType ?? data.token_type ?? "Bearer";

    if (!accessToken) {
        throw new Error("로그인 응답에 accessToken이 없습니다. LoginResponse 필드를 확인하세요.");
    }

    // 필요하면 user 정보도 함께 저장
    tokenStorage.save({ accessToken, refreshToken, tokenType, user: data.username ?? null });
    return data; // 호출한 쪽에서 후속 처리 가능
}

/** 로그아웃(클라이언트 측) */
export function logout() {
    tokenStorage.clear();
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