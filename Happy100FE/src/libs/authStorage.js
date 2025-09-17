const KEY = "auth_token";

const listeners = new Set();

const notify = () => {
    const value = tokenStorage.load();
    listeners.forEach((fn) => {
        try { fn(value); } catch { }
    });
};

export const tokenStorage = {
    save({ accessToken, refreshToken = null, tokenType = "Bearer", user = null }) {
        const v = { accessToken, refreshToken, tokenType, user };
        localStorage.setItem(KEY, JSON.stringify(v));
        notify(); // same-tab 알림
        return v;
    },
    load() {
        try {
            const raw = localStorage.getItem(KEY);
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },
    clear() {
        localStorage.removeItem(KEY);
        notify(); // same-tab 알림
    },
    subscribe(listener) {
        if (typeof listener !== "function") return () => { };
        listeners.add(listener);
        // 구독 즉시 현재 값도 한 번 전달하고 싶다면 아래 주석 해제
        // listener(tokenStorage.load());
        return () => listeners.delete(listener);
    },
};