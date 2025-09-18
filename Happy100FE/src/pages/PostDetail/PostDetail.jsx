// FILE: src/pages/PostDetail/PostDetail.jsx
import React, { useMemo } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useGetPostByIdQuery } from "../../queries/postQuery";
import {
    PageWrap,
    Container,
    TitleBar,
    Field,
    Label,
    Help,
    AttachArea,
    AttachHeader,
    AttachList,
    AttachItem,
    GhostBtn,
    PrimaryBtn,
} from "../WritePage/style"; // 작성 페이지 스타일 재사용
import { TitleText, MetaBar, ContentWrap, BackBar, SecondaryBtn } from "./style";
import { decodeJwtPayload } from "../../libs/decoddecodeJwtPayload";

function humanFileSize(bytes) {
    if (typeof bytes !== "number" || Number.isNaN(bytes)) return "";
    const thresh = 1024;
    if (Math.abs(bytes) < thresh) return bytes + " B";
    const units = ["KB", "MB", "GB", "TB"];
    let u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.abs(bytes) >= thresh && u < units.length - 1);
    return bytes.toFixed(1) + " " + units[u];
}

export default function PostDetail() {
    const navigate = useNavigate();
    const { section, key, postId } = useParams();

    // 라우트 패턴 지원:
    // - /news/:postId, /cert/:postId, /shop/:postId
    // - /overview/news/:postId, /cert/recruit/:postId
    const secRaw = (section || "").toLowerCase();
    const effectiveSection =
        secRaw === "overview" ? "news" :
            secRaw === "cert" ? "cert" :
                secRaw; // news | cert | shop

    const isValidSection = ["news", "cert", "shop"].includes(effectiveSection);
    if (!isValidSection || !postId) return <Navigate to="/404" replace />;

    // 단건 조회 (백엔드 시그니처: GET /api/boards/{postId}?increaseView=true)
    const { data: post, isLoading, error } = useGetPostByIdQuery({
        postId,
        increaseView: true,
    });

    const token = localStorage.getItem("auth_token");
    const payload = token ? decodeJwtPayload(token) : null;
    // 요구사항: payload에는 role:"ROLE_ADMIN"으로 들어있음
    const isAdmin = payload?.role === "ROLE_ADMIN";

    // contentJson 파싱 (ckeditor5 저장 구조 { html, ... } 또는 순수 HTML 문자열 모두 대응)
    const html = useMemo(() => {
        if (!post?.contentJson) return "";
        try {
            const parsed = JSON.parse(post.contentJson);
            if (parsed && typeof parsed === "object" && "html" in parsed) {
                return parsed.html || "";
            }
            if (typeof post.contentJson === "string") return post.contentJson;
            return "";
        } catch {
            return post.contentJson;
        }
    }, [post]);

    // 첨부파일: DTO 규격(AttachmentResponse) 기준 filePath 사용
    const attachments = useMemo(() => {
        const list = Array.isArray(post?.attachments) ? post.attachments : [];
        return list.map((a) => {
            const raw = a?.filePath || ""; // 현재 응답은 빈 문자열 가능
            // 필요 시 아래 fallback 규칙만 수정하세요.
            // 예) 백엔드가 /api/attachments/{id}/download 제공 시:
            const fallbackHref = a?.attachmentId
                ? `/api/attachments/${a.attachmentId}/download`
                : "";

            return {
                id: a?.attachmentId,
                name: a?.fileName || "첨부파일",
                href: raw || fallbackHref, // 우선순위: filePath > fallback
                size: typeof a?.fileSize === "number" ? a.fileSize : undefined,
                mimeType: a?.mimeType || "",
            };
        });
    }, [post]);

    const createdAt =
        post?.createdAt ||
        post?.created_date ||
        post?.createdDate ||
        post?.regDate ||
        "";

    const author =
        post?.authorName ||
        post?.author?.name ||
        post?.writer ||
        post?.nickname ||
        "";

    const views = post?.viewCount ?? post?.views ?? undefined;

    return (
        <PageWrap>
            <Container>
                <BackBar>
                    <GhostBtn type="button" onClick={() => navigate(-1)}>← 목록으로</GhostBtn>
                    <div />
                    { isAdmin ? <SecondaryBtn type="button" to={`/${section}/edit/${postId}`}>수정</SecondaryBtn> : <></> }
                </BackBar>

                <TitleBar>
                    <TitleText aria-live="polite">
                        {isLoading ? "불러오는 중…" : (post?.title || "제목 없음")}
                    </TitleText>
                    <MetaBar>
                        {author && <span>{author}</span>}
                        {createdAt && <span>{new Date(createdAt).toLocaleString()}</span>}
                        {typeof views === "number" && <span>조회 {views.toLocaleString()}</span>}
                    </MetaBar>
                </TitleBar>

                {/* 첨부파일 */}
                <Field>
                    <AttachArea>
                        <AttachHeader>
                            <Label>첨부파일</Label>
                            {attachments.length > 0 && <Help>총 {attachments.length}개</Help>}
                        </AttachHeader>

                        {attachments.length === 0 ? (
                            <Help>첨부된 파일이 없습니다.</Help>
                        ) : (
                            <AttachList>
                                {attachments.map((f) => (
                                    <AttachItem key={f.id ?? f.name}>
                                        <span title={f.name}>{f.name}</span>

                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            {typeof f.size === "number" && (
                                                <small style={{ color: "#6b7280" }}>{humanFileSize(f.size)}</small>
                                            )}

                                            {f.href ? (
                                                <PrimaryBtn
                                                    as="button"
                                                    href={f.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    download
                                                >
                                                    다운로드
                                                </PrimaryBtn>
                                            ) : (
                                                <small style={{ color: "#9ca3af" }}>
                                                    다운로드 경로가 없습니다
                                                </small>
                                            )}
                                        </div>
                                    </AttachItem>
                                ))}
                            </AttachList>
                        )}
                    </AttachArea>
                </Field>

                {/* 본문 */}
                <Field>
                    <Label>내용</Label>
                    <ContentWrap>
                        {error ? (
                            <div style={{ padding: 16, color: "#991b1b" }}>
                                {String(error?.message || "오류가 발생했습니다.")}
                            </div>
                        ) : (
                            <article
                                className="ck-content-like"
                                dangerouslySetInnerHTML={{ __html: isLoading ? "" : html }}
                            />
                        )}
                    </ContentWrap>
                    {!isLoading && !html && !error && <Help>본문이 비어 있습니다.</Help>}
                </Field>
            </Container>
        </PageWrap>
    );
}
