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

// 섹션 → 보드 타입 매핑 (백엔드 ENUM과 맞추세요)
const BOARD_TYPE = { news: "NEWS", cert: "CERT", shop: "SHOP" };

async function uploadAttachment(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/files", {
        method: "POST",
        headers: buildAuthHeaders(),
        body: form,
    });
    if (!res.ok) throw new Error((await res.text()) || "파일 업로드 실패");
    const data = await res.json(); // { url: "..." } 가정
    return { fileName: file.name, url: data.url };
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

        const headers = {};
        const token = localStorage.getItem("accessToken");
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch("/api/files", {
            method: "POST",
            body: form,
            headers,
        });
        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "파일 업로드 실패");
        }
        const data = await res.json();
        // CKEditor는 { default: 'https://...' } 형태로 URL을 기대합니다.
        return { default: data.url };
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
    const onSubmit = (e) => {
        e.preventDefault();
        if (!canSubmit || isPending) return;

        // contentJson은 "문자열"로 직렬화
        const contentJsonStr = JSON.stringify({
            type: "ckeditor5",
            html: editorHtml,
            time: Date.now(),
            version: "1.0",
        });

        // 첨부 메타데이터(AttachmentRequest[])로 변환
        const attachmentsReq = toAttachmentRequests(attachments);

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
                    <PrimaryBtn type="submit" disabled={!canSubmit}>작성 완료</PrimaryBtn>
                </SubmitBar>
            </Container>
        </PageWrap>
    );
}
