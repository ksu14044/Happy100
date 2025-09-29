import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../../configs/axiosConfig";

export default function OAuthCallbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [status, setStatus] = useState({ type: "loading", message: "소셜 로그인 처리를 진행 중입니다." });

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    useEffect(() => {
        const error = params.get("error");
        const redirect = params.get("redirect") || "/";
        if (error) {
            setStatus({ type: "error", message: error });
            return;
        }

        // 쿠키 기반: 서버가 이미 Set-Cookie 완료. 로그인 상태 확인 후 리다이렉트
        (async () => {
            try {
                const me = await api.get('/api/users/me');
                try {
                    const d = me?.data;
                    if (d) {
                        let role = d.role || d.roleName || null;
                        if (!role && Array.isArray(d.authorities)) {
                            const found = d.authorities.find((r) => typeof r === 'string' && r.includes('ROLE_'));
                            role = found || null;
                        }
                        localStorage.setItem('user_preview', JSON.stringify({
                            name: d.name || d.username || '회원',
                            role: role || 'ROLE_USER',
                        }));
                    }
                } catch {}
                try { sessionStorage.setItem('has_session', '1'); } catch {}
                await queryClient.invalidateQueries({ queryKey: ['user','me'] });
                setStatus({ type: "success", message: "로그인에 성공했습니다. 잠시 후 이동합니다." });
                setTimeout(() => navigate(redirect, { replace: true }), 600);
            } catch (e) {
                setStatus({ type: "error", message: "로그인 세션을 확인하지 못했습니다. 다시 시도해 주세요." });
            }
        })();
    }, [navigate, params, queryClient]);

    return (
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ textAlign: "center", maxWidth: 360 }}>
                <h2>OAuth2 로그인</h2>
                <p>{status.message}</p>
                {status.type === "error" && (
                    <button
                        type="button"
                        style={{ marginTop: 16, padding: "8px 16px" }}
                        onClick={() => navigate("/login", { replace: true })}
                    >
                        로그인 페이지로 돌아가기
                    </button>
                )}
            </div>
        </div>
    );
}
