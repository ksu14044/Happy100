import axios from "axios";

const BASE_URL = import.meta.env.DEV
    ? "" // dev: Vite proxy 사용 (상대 경로)
    : (import.meta.env.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // HttpOnly 쿠키 기반 인증 사용
});
// Authorization 헤더 주입 제거: 쿠키 기반 인증으로 대체

if (!import.meta.env.DEV) {
    api.interceptors.request.use((config) => {
        if (typeof config.url === "string") {
            config.url = config.url.replace(/^\/api(?=\/|$)/, "");
            if (config.url === "") {
                config.url = "/";
            }
        }
        return config;
    });
}

const clearUserPreview = () => {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem('user_preview');
    } catch {
        // 로컬스토리지 접근이 불가능한 환경일 수 있으므로 무시
    }
};

const shouldClearPreview = (status, config) => {
    if (status === 401) return true;
    if (status === 204) {
        const method = (config?.method || '').toLowerCase();
        const url = config?.url || '';
        if (method === 'get' && url.includes('/api/users/me')) return true;
    }
    return false;
};

api.interceptors.response.use(
    (response) => {
        if (shouldClearPreview(response?.status, response?.config)) {
            clearUserPreview();
        }
        return response;
    },
    (error) => {
        const status = error?.response?.status;
        if (shouldClearPreview(status, error?.response?.config)) {
            clearUserPreview();
        }
        return Promise.reject(error);
    },
);
