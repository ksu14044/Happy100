// FILE: /mnt/data/WritePostButton.jsx

import { decodeJwtPayload } from "../../libs/decoddecodeJwtPayload";
import { WriteButton } from "./style";




export default function WritePostButton({ label = "글쓰기", section}){
  const token = localStorage.getItem("auth_token");
  const payload = token ? decodeJwtPayload(token) : null;
  console.log(section);
  // 요구사항: payload에는 role:"ROLE_ADMIN"으로 들어있음
  const isAdmin = payload?.role === "ROLE_ADMIN";
  if (!isAdmin) return null;

  return (
    <WriteButton href={`/${section}/write`} aria-label="새 글쓰기">
      {label}
    </WriteButton>
  );
}
