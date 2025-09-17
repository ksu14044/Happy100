import axios from "axios";
import { tokenStorage } from "../libs/authStorage";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL ?? "",
    withCredentials: false, // 세션 쿠키 쓰면 true
});

api.interceptors.request.use((config) => {
    const tok = tokenStorage.load();
    if (tok?.accessToken) {
        const scheme = tok.tokenType || "Bearer";
        config.headers = {
            ...(config.headers || {}),
            Authorization: `${scheme} ${tok.accessToken}`,
        };
    }
    return config;
});