// FILE: /mnt/data/WritePostButton.jsx

import { WriteButton } from "./style";



/** 안전한 base64url → JSON 디코더 */
function decodeJwtPayload(token) {
  try {
    const part = token?.split(".")?.[1];
    if (!part) return null;
    const base64 = part.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    const json = decodeURIComponent(
      atob(padded)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}



export default function WritePostButton({ label = "글쓰기", section}){
  const token = localStorage.getItem("auth_token");
  const payload = token ? decodeJwtPayload(token) : null;

  // 요구사항: payload에는 role:"ROLE_ADMIN"으로 들어있음
  const isAdmin = payload?.role === "ROLE_ADMIN";

  if (!isAdmin) return null;

  return (
    <WriteButton href={`/${section}/write`} aria-label="새 글쓰기">
      {label}
    </WriteButton>
  );
}
