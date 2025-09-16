import { api } from "../configs/axiosConfig";

export const getPostApi = async ({ boardType, page = 1, size = 10, signal }) => {
    if (!boardType) throw new Error("boardType is required");
    const res = await api.get("/api/boards", {
        params: { boardType, page, size },
        signal,
    });
  return res.data; // ← axios 응답 본문만 반환
};