// FILE: src/pages/PostDetail/PostDetail.jsx
import React, { useMemo } from "react";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useGetPostByIdQuery } from "../../queries/postQuery";
import { useDownloadAttachmentMutation } from "../../mutations/attachmentMutation";
import { useDeletePostMutation } from "../../mutations/postMutation";
import { useQueryClient } from "@tanstack/react-query";
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
    DangerBtn,
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
    const queryClient = useQueryClient();

    // 라우트 패턴 지원:
    // - /news/:postId, /cert/:postId, /shop/:postId
    // - /overview/news/:postId, /cert/recruit/:postId
    const secRaw = (section || "").toLowerCase();
    const effectiveSection =
        secRaw === "overview" ? "news" :
            secRaw === "cert" ? "cert" :
                secRaw; // news | cert | shop

    const isValidSection = ["news", "cert", "shop"].includes(effectiveSection);
    const invalidRoute = !isValidSection || !postId;

    // 단건 조회 (백엔드 시그니처: GET /api/boards/{postId}?increaseView=true)
    const { data: post, isLoading, error } = useGetPostByIdQuery({
        postId,
        increaseView: true,
        enabled: !invalidRoute,
    });

    const downloadAttachment = useDownloadAttachmentMutation();
    const deletePost = useDeletePostMutation();
    const isDeleting = deletePost.isPending;

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

    // 첨부파일: AttachmentResponse 규격 기반
    const attachments = useMemo(() => {
        const list = Array.isArray(post?.attachments) ? post.attachments : [];
        return list.map((item) => ({
            id: item?.attachmentId,
            name: item?.fileName || "첨부파일",
            size: typeof item?.fileSize === "number" ? item.fileSize : undefined,
        }));
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
    const downloadingAttachmentId = downloadAttachment.isPending
        ? downloadAttachment.variables?.attachmentId
        : null;

    const handleDownload = (attachment) => {
        if (!attachment?.id) return;
        downloadAttachment.mutate(
            { postId, attachmentId: attachment.id, fileName: attachment.name },
            {
                onError: () => {
                    window.alert("파일 다운로드에 실패했습니다. 잠시 후 다시 시도해 주세요.");
                },
            },
        );
    };

    const handleEdit = () => {
        if (!postId) return;
        navigate(`/${effectiveSection}/edit/${postId}`);
    };

    const handleDelete = () => {
        if (!postId || isDeleting) return;
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
        deletePost.mutate(
            { postId },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["posts"] });
                    queryClient.removeQueries({ queryKey: ["post", postId], exact: true });
                    const listPath = key ? `/${section}/${key}` : "/";
                    navigate(listPath, { replace: true });
                },
                onError: (err) => {
                    window.alert(err?.message || "글 삭제에 실패했습니다.");
                },
            },
        );
    };

    if (invalidRoute) {
        return <Navigate to="/404" replace />;
    }

    return (
        <PageWrap>
            <Container>
                <BackBar>
                    <GhostBtn type="button" onClick={() => navigate(-1)}>← 목록으로</GhostBtn>
                    <div />
                    {isAdmin ? (
                        <div style={{ display: "flex", gap: 8 }}>
                            <SecondaryBtn type="button" onClick={handleEdit}>
                                수정
                            </SecondaryBtn>
                            <DangerBtn type="button" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? "삭제 중…" : "삭제"}
                            </DangerBtn>
                        </div>
                    ) : null}
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
                                {attachments.map((f) => {
                                    const isDownloading =
                                        downloadingAttachmentId != null && downloadingAttachmentId === f.id;
                                    return (
                                        <AttachItem key={f.id ?? f.name}>
                                            <span title={f.name}>{f.name}</span>

                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                {typeof f.size === "number" && (
                                                    <small style={{ color: "#6b7280" }}>{humanFileSize(f.size)}</small>
                                                )}

                                                {f.id ? (
                                                    <PrimaryBtn
                                                        type="button"
                                                        onClick={() => handleDownload(f)}
                                                        disabled={isDownloading}
                                                    >
                                                        {isDownloading ? "다운로드 중…" : "다운로드"}
                                                    </PrimaryBtn>
                                                ) : (
                                                    <small style={{ color: "#9ca3af" }}>
                                                        다운로드 정보를 찾을 수 없습니다
                                                    </small>
                                                )}
                                            </div>
                                        </AttachItem>
                                    );
                                })}
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
