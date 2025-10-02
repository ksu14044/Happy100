// FILE: /mnt/data/WritePostButton.jsx

import { WriteButton } from "./style";
import { useGetUserInfoQuery } from "../../queries/userQuery";




export default function WritePostButton({ label = "글쓰기", section }) {
  const { data: user } = useGetUserInfoQuery();
  const isAdmin = user?.role === "ROLE_ADMIN";
  if (!isAdmin) return null;

  if (!section) return null;

  return (
    <WriteButton to={`/${section}/write`} aria-label="새 글쓰기">
      {label}
    </WriteButton>
  );
}
