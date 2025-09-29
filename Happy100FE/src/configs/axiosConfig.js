import axios from "axios";

const BASE_URL = import.meta.env.DEV
    ? "" // dev: Vite proxy 사용 (상대 경로)
    : (import.meta.env.VITE_API_BASE_URL ?? "");

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // HttpOnly 쿠키 기반 인증 사용
});
// Authorization 헤더 주입 제거: 쿠키 기반 인증으로 대체
