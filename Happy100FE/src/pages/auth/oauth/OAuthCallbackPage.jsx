import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenStorage } from "../../../libs/authStorage";

export default function OAuthCallbackPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [status, setStatus] = useState({ type: "loading", message: "소셜 로그인 처리를 진행 중입니다." });

    const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

    useEffect(() => {
        const error = params.get("error");
        if (error) {
            setStatus({ type: "error", message: error });
            return;
        }

        const accessToken = params.get("accessToken");
        const tokenType = params.get("tokenType") || "Bearer";
        const username = params.get("username");
        const redirect = params.get("redirect") || "/";

        if (!accessToken) {
            setStatus({ type: "error", message: "소셜 로그인에 필요한 토큰 정보가 없습니다. 다시 시도해 주세요." });
            return;
        }

        tokenStorage.save({ accessToken, tokenType, user: username });
        setStatus({ type: "success", message: "로그인에 성공했습니다. 잠시 후 이동합니다." });

        const timer = setTimeout(() => {
            navigate(redirect, { replace: true });
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate, params]);

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
