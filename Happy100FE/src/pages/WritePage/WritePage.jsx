// FILE: /src/pages/WritePage/WritePage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
    PageWrap,
    Container,
    TitleBar,
    TitleInput,
    Field,
    Label,
    Help,
    AttachArea,
    AttachHeader,
    AttachInput,
    AttachList,
    AttachItem,
    EditorWrap,
    SubmitBar,
    PrimaryBtn,
    GhostBtn,
    DangerBtn,
} from "./style";
import {
    useCreatePostMutation,
    useDeletePostMutation,
    useUpdatePostMutation,
} from "../../mutations/postMutation";
import { toAttachmentRequests } from "../../apis/postApi";
// 쿠키 기반 인증으로 전환: 토큰 저장 불필요
import { useGetPostByIdQuery } from "../../queries/postQuery";

// 섹션 → 보드 타입 매핑 (백엔드 ENUM과 맞추세요)
const BOARD_TYPE = {
    news: "NEWS",
    recruit: "CERT",
    cert: "CERT",
    shop: "SHOP",
};
const REDIRECT_PATH = {
    news: "/overview/news",
    recruit: "/cert/recruit",
    cert: "/cert/recruit",
    shop: "/shop/list",
};

const API_BASE_URL = import.meta.env.DEV
    ? ""
    : (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const FILE_UPLOAD_ENDPOINT = API_BASE_URL ? `${API_BASE_URL}/api/files` : "/api/files";

function resolveFileUrl(urlOrPath) {
    if (!urlOrPath) return "";
    if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
    const base = API_BASE_URL || window.location.origin;
    return `${base}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
}

// 쿠키 전송이 필요한 fetch 옵션만 설정

async function uploadAttachment(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(FILE_UPLOAD_ENDPOINT, {
        method: "POST",
        credentials: 'include',
        body: form,
    });
    if (!res.ok) throw new Error((await res.text()) || "첨부파일 업로드에 실패했습니다.");
    const data = await res.json();
    const filePath = data?.filePath ?? data?.url ?? data?.path ?? "";
    if (!filePath) throw new Error("업로드 응답에 파일 경로가 없습니다.");
    return {
        fileName: data?.fileName ?? file.name,
        filePath,
        fileSize: data?.fileSize ?? (typeof file.size === "number" ? file.size : null),
        mimeType: data?.mimeType ?? file.type ?? "",
        url: resolveFileUrl(data?.url ?? filePath),
    };
}

function extractHtml(contentJson) {
    if (!contentJson) return "";
    try {
        const parsed = JSON.parse(contentJson);
        if (parsed && typeof parsed === "object" && "html" in parsed) {
            return parsed.html || "";
        }
    } catch {
        // fall through to return raw string
    }
    return typeof contentJson === "string" ? contentJson : "";
}

const isFileObject = (item) => typeof File !== "undefined" && item instanceof File;

function getAttachmentLabel(item) {
    if (!item) return "";
    if (isFileObject(item)) return item.name;
    if (typeof item === "object") {
        return item.fileName ?? item.name ?? "";
    }
    return String(item);
}

/** CKEditor5 커스텀 업로드 어댑터: /api/files 로 업로드 후 {url} 사용 */
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    async upload() {
        const file = await this.loader.file;
        const form = new FormData();
        form.append("file", file);

        const res = await fetch(FILE_UPLOAD_ENDPOINT, {
            method: "POST",
            body: form,
            credentials: 'include',
        });
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "파일 업로드 실패");
        }
        const data = await res.json();
        const fileUrl = resolveFileUrl(data?.url ?? data?.filePath);
        if (!fileUrl) {
            throw new Error("업로드 응답에 표시할 URL이 없습니다.");
        }
        // CKEditor는 { default: 'https://...' } 형태로 URL을 기대합니다.
        return { default: fileUrl };
    }
    abort() {
        // 필요시 업로드 취소 로직 추가 가능
    }
}

export default function WritePage() {
    const navigate = useNavigate();
    const { section: rawSection, postId: postIdParam } = useParams();
    const section = rawSection ?? "";
    const parsedPostId = postIdParam ? Number(postIdParam) : null;
    const postId = Number.isFinite(parsedPostId) ? parsedPostId : null;
    const isEditMode = postId != null;
    const queryClient = useQueryClient();

    const boardType = BOARD_TYPE[section] ?? null;
    const isValidSection = Boolean(boardType);

    const {
        data: existingPost,
        isLoading: isLoadingPost,
        error: loadError,
    } = useGetPostByIdQuery({
        postId,
        increaseView: false,
        enabled: isEditMode,
    });

    // 폼 상태
    const [title, setTitle] = useState("");
    const [attachments, setAttachments] = useState([]); // 본문 외 첨부
    const [editorHtml, setEditorHtml] = useState("");
    const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);
    const attachRef = useRef(null);
    const initializedRef = useRef(false);

    const { mutate: createPost, isPending: isCreating } = useCreatePostMutation();
    const { mutate: updatePost, isPending: isUpdating } = useUpdatePostMutation();
    const { mutate: deletePost, isPending: isDeleting } = useDeletePostMutation();

    useEffect(() => {
        if (!isEditMode || !existingPost || initializedRef.current) return;
        initializedRef.current = true;
        setTitle(existingPost.title ?? "");
        setEditorHtml(extractHtml(existingPost.contentJson));
        setAttachments(
            Array.isArray(existingPost.attachments)
                ? existingPost.attachments.map((att, idx) => ({
                    attachmentType: att?.attachmentType ?? "FILE",
                    fileName: att?.fileName ?? "",
                    filePath: att?.filePath ?? "",
                    fileSize: att?.fileSize ?? null,
                    mimeType: att?.mimeType ?? null,
                    sortOrder: att?.sortOrder ?? idx,
                    attachmentId: att?.attachmentId ?? null,
                }))
                : []
        );
    }, [isEditMode, existingPost]);

    const canSubmit = useMemo(() => title.trim().length > 0, [title]);
    const nextPath = REDIRECT_PATH[section] ?? "/";
    const isMutating = isEditMode ? isUpdating : isCreating;

    const onAddAttachments = (files) => {
        const list = Array.from(files || []);
        if (!list.length) return;
        setAttachments((prev) => [...prev, ...list]);
    };
    const onRemoveAttachment = (idx) => {
        setAttachments((prev) => prev.filter((_, i) => i !== idx));
    };

    /** CKEditor 설정 */
    const editorConfig = {
        toolbar: {
            items: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "|",
                "insertTable",
                "undo",
                "redo",
                "|",
                "imageUpload", // 이미지 업로드(커스텀 어댑터)
                "mediaEmbed",  // 동영상/외부 미디어 URL 임베드
            ],
            shouldNotGroupWhenFull: true,
        },
        mediaEmbed: { previewsInData: true },
        image: {
            toolbar: [
                "imageStyle:inline",
                "imageStyle:block",
                "imageStyle:side",
                "|",
                "toggleImageCaption",
                "imageTextAlternative",
            ],
        },
    };

    /** 제출 */
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isValidSection) return;
        if (!canSubmit || isMutating || isUploadingAttachments) return;
        if (isEditMode && (!postId || isLoadingPost)) return;

        const contentJsonStr = JSON.stringify({
            type: "ckeditor5",
            html: editorHtml,
            time: Date.now(),
            version: "1.0",
        });

        let attachmentsReq = [];
        const hasNewFiles = attachments.some((item) => isFileObject(item));

        try {
            if (hasNewFiles) {
                setIsUploadingAttachments(true);
            }

            const prepared = await Promise.all(
                attachments.map(async (item, idx) => {
                    if (item && typeof item === "object" && !isFileObject(item) && "attachmentType" in item) {
                        const path = item.filePath ?? "";
                        if (!path) {
                            throw new Error("첨부파일에 저장 경로가 없습니다.");
                        }

                        return {
                            attachmentType: item.attachmentType,
                            fileName: item.fileName ?? "",
                            filePath: path,
                            fileSize: item.fileSize ?? null,
                            mimeType: item.mimeType ?? null,
                            sortOrder: idx,
                        };
                    }

                    if (!isFileObject(item)) {
                        throw new Error("지원하지 않는 첨부 파일 형식입니다.");
                    }

                    const uploaded = await uploadAttachment(item);
                    const filePath = uploaded.filePath || uploaded.url || "";
                    if (!filePath) {
                        const fallbackName = item.name || `attachment ${idx + 1}`;
                        throw new Error(`${fallbackName} 파일의 저장 경로를 찾을 수 없습니다.`);
                    }

                    const mime = item.type || "";
                    const attachmentType =
                        mime.startsWith("image/") ? "IMAGE" :
                        mime.startsWith("video/") ? "VIDEO" : "FILE";

                    return {
                        attachmentType,
                        fileName: uploaded.fileName || item.name,
                        filePath,
                        fileSize: typeof item.size === "number" ? item.size : null,
                        mimeType: mime || null,
                        sortOrder: idx,
                    };
                })
            );

            attachmentsReq = toAttachmentRequests(prepared);
        } catch (error) {
            console.error(error);
            alert(error?.message || "첨부파일 업로드에 실패했습니다.");
            return;
        } finally {
            if (hasNewFiles) {
                setIsUploadingAttachments(false);
            }
        }

        if (isEditMode) {
            updatePost(
                {
                    postId,
                    title,
                    contentJson: contentJsonStr,
                    attachments: attachmentsReq,
                },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["posts"] });
                        queryClient.removeQueries({ queryKey: ["post", postId], exact: true });
                        navigate(nextPath, { replace: true });
                    },
                    onError: (err) => {
                        alert(err?.message || "글 수정에 실패했습니다.");
                    },
                }
            );
            return;
        }

        if (!boardType) {
            alert("게시판 정보를 확인할 수 없습니다.");
            return;
        }

        createPost(
            {
                boardType,
                title,
                contentJson: contentJsonStr,
                attachments: attachmentsReq,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
                    navigate(nextPath, { replace: true });
                },
                onError: (err) => {
                    alert(err?.message || "글 등록에 실패했습니다.");
                },
            }
        );
    };

    const handleDelete = () => {
        if (!isEditMode || !postId || isDeleting) return;
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
        deletePost(
            { postId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
                    queryClient.removeQueries({ queryKey: ["post", postId], exact: true });
                    navigate(nextPath, { replace: true });
                },
                onError: (err) => {
                    alert(err?.message || "글 삭제에 실패했습니다.");
                },
            }
        );
    };

    if (!isValidSection) {
        return <Navigate to="/404" replace />;
    }

    if (isEditMode && loadError) {
        return <Navigate to="/404" replace />;
    }

    const primaryLabel = isEditMode
        ? (isMutating ? "수정 중…" : "수정 완료")
        : (isMutating ? "작성 중…" : "작성 완료");

    return (
        <PageWrap>
            <Container as="form" onSubmit={onSubmit}>
                {/* 1) 제목 */}
                <TitleBar>
                    <TitleInput
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-label="제목"
                        disabled={isEditMode && isLoadingPost}
                    />
                    {isEditMode && isLoadingPost && <Help>기존 글을 불러오는 중입니다…</Help>}
                </TitleBar>

                {/* 2) 첨부 — 한 줄 배치 (텍스트 + 버튼) */}
                <Field>
                    <AttachArea>
                        <AttachHeader>
                            <Label>첨부파일</Label>
                            <div>
                                <AttachInput
                                    ref={attachRef}
                                    type="file"
                                    multiple
                                    onChange={(e) => onAddAttachments(e.target.files)}
                                    disabled={isMutating || isDeleting}
                                />
                                <GhostBtn
                                    type="button"
                                    onClick={() => attachRef.current?.click()}
                                    disabled={isMutating || isDeleting}
                                >
                                    파일 선택
                                </GhostBtn>
                            </div>
                        </AttachHeader>

                        {!!attachments.length && (
                            <>
                                <AttachList>
                                    {attachments.map((item, i) => {
                                        const label = getAttachmentLabel(item) || `attachment-${i + 1}`;
                                        const key = (item && typeof item === "object" && !isFileObject(item) && item.attachmentId)
                                            ? item.attachmentId
                                            : `${label}-${i}`;
                                        return (
                                            <AttachItem key={key}>
                                                <span title={label}>{label}</span>
                                                <DangerBtn
                                                    type="button"
                                                    onClick={() => onRemoveAttachment(i)}
                                                    disabled={isMutating || isDeleting}
                                                >
                                                    제거
                                                </DangerBtn>
                                            </AttachItem>
                                        );
                                    })}
                                </AttachList>
                                <Help>선택된 파일: {attachments.length}개</Help>
                            </>
                        )}
                    </AttachArea>
                </Field>

                {/* 3) 단일 에디터 — 텍스트/이미지/동영상 */}
                <Field>
                    <Label>내용</Label>
                    <EditorWrap>
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorHtml}
                            config={editorConfig}
                            onReady={(ed) => {
                                // 업로드 어댑터 주입
                                ed.plugins.get("FileRepository").createUploadAdapter = (loader) =>
                                    new MyUploadAdapter(loader);
                            }}
                            onChange={(_, editor) => {
                                setEditorHtml(editor.getData());
                            }}
                        />
                    </EditorWrap>
                    <Help>
                        이미지: 툴바의 “이미지 업로드”로 올릴 수 있습니다. 동영상: “미디어 삽입” 버튼을 눌러
                        YouTube/MP4 등 URL을 임베드하세요.
                    </Help>
                </Field>

                {/* 제출 */}
                <SubmitBar>
                    {isEditMode && (
                        <DangerBtn
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting || isMutating}
                        >
                            {isDeleting ? "삭제 중…" : "삭제"}
                        </DangerBtn>
                    )}
                    <GhostBtn
                        type="button"
                        onClick={() => navigate(-1)}
                        disabled={isMutating || isDeleting}
                    >
                        취소
                    </GhostBtn>
                    <PrimaryBtn
                        type="submit"
                        disabled={!canSubmit || isMutating || isUploadingAttachments || (isEditMode && isLoadingPost)}
                    >
                        {primaryLabel}
                    </PrimaryBtn>
                </SubmitBar>
            </Container>
        </PageWrap>
    );
}
