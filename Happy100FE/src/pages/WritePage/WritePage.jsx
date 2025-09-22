// FILE: /src/pages/WritePage/WritePage.jsx
import React, { useMemo, useRef, useState } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
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
import { useCreatePostMutation } from "../../mutations/postMutation";
import { toAttachmentRequests } from "../../apis/postApi";
import { tokenStorage } from "../../libs/authStorage";

// 섹션 → 보드 타입 매핑 (백엔드 ENUM과 맞추세요)
const BOARD_TYPE = { news: "NEWS", cert: "CERT", shop: "SHOP" };

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const FILE_UPLOAD_ENDPOINT = API_BASE_URL ? `${API_BASE_URL}/api/files` : "/api/files";

function resolveFileUrl(urlOrPath) {
    if (!urlOrPath) return "";
    if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
    const base = API_BASE_URL || window.location.origin;
    return `${base}${urlOrPath.startsWith("/") ? "" : "/"}${urlOrPath}`;
}

function buildAuthHeaders() {
    const headers = {};
    const stored = typeof tokenStorage !== "undefined" ? tokenStorage.load?.() : null;
    const token = stored?.accessToken || localStorage.getItem("accessToken");
    if (token) {
        const scheme = stored?.tokenType || "Bearer";
        headers["Authorization"] = `${scheme} ${token}`;
    }
    return headers;
}

async function uploadAttachment(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(FILE_UPLOAD_ENDPOINT, {
        method: "POST",
        headers: buildAuthHeaders(),
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


/** CKEditor5 커스텀 업로드 어댑터: /api/files 로 업로드 후 {url} 사용 */
class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }
    async upload() {
        const file = await this.loader.file;
        const form = new FormData();
        form.append("file", file);

        const headers = buildAuthHeaders();

        const res = await fetch(FILE_UPLOAD_ENDPOINT, {
            method: "POST",
            body: form,
            headers,
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
    const { section } = useParams();

    const isValidSection = ["news", "recruit", "shop"].includes(section || "");
    if (!isValidSection) return <Navigate to="/404" replace />;

    const boardType = BOARD_TYPE[section];

    // 폼 상태
    const [title, setTitle] = useState("");
    const [attachments, setAttachments] = useState([]); // 본문 외 첨부
    const [editorHtml, setEditorHtml] = useState("");
    const [isUploadingAttachments, setIsUploadingAttachments] = useState(false);



    const attachRef = useRef(null);
    const canSubmit = useMemo(() => title.trim().length > 0, [title]);

    const { mutate: createPost, isPending } = useCreatePostMutation();

    /** 첨부파일 한 줄 배치: 텍스트 + 버튼 */
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
        if (!canSubmit || isPending || isUploadingAttachments) return;

        const contentJsonStr = JSON.stringify({
            type: "ckeditor5",
            html: editorHtml,
            time: Date.now(),
            version: "1.0",
        });

        let attachmentsReq = [];
        const hasNewFiles =
            attachments.some((item) => typeof File !== "undefined" && item instanceof File);

        try {
            if (hasNewFiles) {
                setIsUploadingAttachments(true);
            }

            const prepared = await Promise.all(
                attachments.map(async (item, idx) => {
                    if (item && typeof item === "object" && "attachmentType" in item) {
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
                            sortOrder: item.sortOrder ?? idx,
                        };
                    }

                    const isFileObject = typeof File !== "undefined" && item instanceof File;
                    if (!isFileObject) {
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

        createPost(
            {
                boardType,
                title,
                contentJson: contentJsonStr,
                attachments: attachmentsReq,
                // authorId: 생략(서버 Authentication 사용 시)
            },
            {
                onSuccess: (postId) => {
                    // 필요시 상세로: navigate(`/${section}/${postId}`)
                    navigate(`/${section}`);
                },
                onError: (err) => {
                    alert(err?.message || "글 등록에 실패했습니다.");
                },
            }
        );
    };


    return (
        <PageWrap>
            <Container as="form" onSubmit={onSubmit}>
                {/* 1) 제목 — 높이 축소 */}
                <TitleBar>
                    <TitleInput
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-label="제목"
                    />
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
                                />
                                <GhostBtn type="button" onClick={() => attachRef.current?.click()}>
                                    파일 선택
                                </GhostBtn>
                            </div>
                        </AttachHeader>

                        {!!attachments.length && (
                            <>
                                <AttachList>
                                    {attachments.map((f, i) => (
                                        <AttachItem key={`${f.name}-${i}`}>
                                            <span title={f.name}>{f.name}</span>
                                            <DangerBtn type="button" onClick={() => onRemoveAttachment(i)}>
                                                제거
                                            </DangerBtn>
                                        </AttachItem>
                                    ))}
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
                                // 업लोड 어댑터 주입
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
                    <GhostBtn type="button" onClick={() => navigate(-1)}>취소</GhostBtn>
                    <PrimaryBtn type="submit" disabled={!canSubmit || isPending || isUploadingAttachments}>작성 완료</PrimaryBtn>
                </SubmitBar>
            </Container>
        </PageWrap>
    );
}
