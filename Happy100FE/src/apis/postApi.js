import { api } from "../configs/axiosConfig";

export const getPostApi = async ({
  boardType,
  page = 1,
  size = 10,
  searchType,
  keyword,
  sort = "LATEST",
  signal,
}) => {
  if (!boardType) throw new Error("boardType is required");

  const params = {
    boardType,
    page,
    size,
  };

  const trimmedKeyword = typeof keyword === "string" ? keyword.trim() : "";
  if (trimmedKeyword) {
    params.keyword = trimmedKeyword;
    if (searchType) {
      params.searchType = searchType.toUpperCase();
    }
  }

  if (sort) {
    params.sort = sort.toUpperCase();
  }

  const res = await api.get("/api/boards", {
    params,
    signal,
  });
  return res.data; // ← axios 응답 본문만 반환
};

// AttachmentRequest 규격으로 변환 유틸
export function toAttachmentRequests(input /* File[] | AttachmentRequest[] */) {
	if (!input) return [];
	return Array.from(input).map((item, idx) => {
		// 이미 서버 규격(AttachmentRequest)인 경우 그대로 사용
		if (item && typeof item === "object" && "attachmentType" in item) {
			return {
				attachmentType: item.attachmentType,
				fileName: item.fileName ?? "",
				filePath: item.filePath ?? "",   // 업로드 API가 없으므로 서버에서 처리/무시할 수 있도록 빈 문자열
				fileSize: item.fileSize ?? null,
				mimeType: item.mimeType ?? null,
				sortOrder: item.sortOrder ?? idx,
			};
		}
		// <input type="file"> 로 받은 File → AttachmentRequest 메타데이터로 변환
		const f = /** @type {File} */ (item);
		const mime = f.type || "";
		const attachmentType =
			mime.startsWith("image/") ? "IMAGE" :
				mime.startsWith("video/") ? "VIDEO" : "FILE";

		return {
			attachmentType,
			fileName: f.name,
			filePath: "",              // 업로드 API 부재: 서버에서 채우거나 선택적으로 무시
			fileSize: f.size ?? null,
			mimeType: mime || null,
			sortOrder: idx,
		};
	});
}

/** 게시글 등록: @RequestBody PostCreateRequest(JSON) */
export const createPostApi = async ({
	boardType,          // "NEWS" | "CERT" | "SHOP"
	title,
	contentJson,        // 문자열 JSON
	attachments = [],   // AttachmentRequest[] (메타데이터)
	authorId,           // 선택: 서버가 Authentication으로 처리하면 생략 가능
}) => {
	if (!boardType) throw new Error("boardType is required");
	if (!title) throw new Error("title is required");
	if (typeof contentJson !== "string") {
		throw new Error("contentJson must be a JSON string");
	}

	const payload = {
		boardType,
		title,
		contentJson,
		// authorId가 undefined면 JSON.stringify에서 자동 생략됨
		authorId,
		attachments: toAttachmentRequests(attachments),
	};

	const res = await api.post("/api/boards", payload);
	return res.data; // 서버가 ResponseEntity<Long>을 반환한다고 가정 → postId
};

export const getPostByIdApi = async ({ postId, increaseView = true, signal }) => {
  if (!postId) throw new Error("postId is required");
  const res = await api.get(`/api/boards/${postId}`, {
    params: { increaseView }, // 컨트롤러 시그니처와 동일
    signal,
  });
  return res.data; // ← PostResponse
};

export const updatePostApi = async ({ postId, title, contentJson, attachments = [] }) => {
  if (!postId) throw new Error("postId is required");
  if (!title) throw new Error("title is required");
  if (typeof contentJson !== "string") {
    throw new Error("contentJson must be a JSON string");
  }

  const payload = {
    title,
    contentJson,
    attachments: toAttachmentRequests(attachments),
  };

  await api.put(`/api/boards/${postId}`, payload);
};

export const deletePostApi = async ({ postId }) => {
  if (!postId) throw new Error("postId is required");
  await api.delete(`/api/boards/${postId}`);
};
