import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardTitle from "../../components/board-title/BoardTitle";
import { useGetPostListQuery } from "../../queries/postQuery";
import {
    PageWrap,
    ListWrap,
    ItemLink,
    Thumbnail,
    Info,
    Title,
    Summary,
    Meta,
    EmptyState,
    ErrorState,
    LoadingState,
    NewBadge,
    FilterBar,
    SearchSelect,
    SearchInput,
    SearchButton,
    SortSelect,
} from "./style";
import { Pagination } from "../../components/Pagination";
import defaultProduct from "../../assets/images/default-product.svg";

const BOARD_TYPE = "SHOP";
const PAGE_SIZE = 9;
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const SEVEN_DAYS_MS =  24 * 60 * 60 * 1000;

const SEARCH_OPTIONS = [
    { value: "TITLE", label: "제목" },
    { value: "CONTENT", label: "내용" },
    { value: "TITLE_CONTENT", label: "제목+내용" },
];

const SORT_OPTIONS = [
    { value: "LATEST", label: "최신순" },
    { value: "VIEWS", label: "조회수순" },
];

function toAbsoluteUrl(input) {
    if (!input) return "";
    if (/^data:/i.test(input)) return input;
    if (/^https?:\/\//i.test(input)) return input;

    const normalizedPath = input.startsWith("/uploads/")
        ? input
        : `/uploads/${input.replace(/^\/+/g, "")}`;

    if (API_BASE_URL) {
        return `${API_BASE_URL}${normalizedPath}`;
    }
    return normalizedPath;
}

function tryParseJson(value) {
    if (typeof value !== "string") return value;
    try {
        return JSON.parse(value);
    } catch {
        return value;
    }
}

function parseContentJson(raw) {
    let parsed = raw;
    let depth = 0;
    while (typeof parsed === "string" && depth < 3) {
        const next = tryParseJson(parsed);
        if (next === parsed) break;
        parsed = next;
        depth += 1;
    }
    return parsed;
}

function extractHtml(contentJson) {
    if (!contentJson) return "";
    const parsed = parseContentJson(contentJson);

    if (typeof parsed === "string") {
        return parsed;
    }

    if (parsed && typeof parsed === "object") {
        if (typeof parsed.html === "string") {
            return parsed.html;
        }
        if (typeof parsed.content === "string") {
            return parsed.content;
        }
        if (Array.isArray(parsed.blocks)) {
            const text = parsed.blocks
                .map((block) => block?.data?.text || "")
                .filter((txt) => typeof txt === "string")
                .join("\n");
            if (text.trim()) {
                return text;
            }
        }
    }

    if (typeof contentJson === "string") {
        return contentJson;
    }

    return "";
}

function extractFirstImageFromHtml(html) {
    if (!html || typeof html !== "string") return "";
    const pattern = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/gi;
    const match = pattern.exec(html);
    return match && match[1] ? match[1] : "";
}

function pickThumbnail(post) {
    const attachments = Array.isArray(post?.attachments) ? [...post.attachments] : [];
    attachments.sort((a, b) => (a?.sortOrder ?? 0) - (b?.sortOrder ?? 0));

    const imageAttachment = attachments.find((att) => {
        if (!att) return false;
        const mime = (att.mimeType || "").toLowerCase();
        const type = (att.attachmentType || "").toUpperCase();
        const hasImageMime = mime.startsWith("image/");
        const hasImageType = type === "IMAGE";
        return (hasImageMime || hasImageType) && att.filePath;
    });

    if (imageAttachment) {
        return toAbsoluteUrl(imageAttachment.filePath);
    }

    const html = extractHtml(post?.contentJson);
    const embeddedImage = extractFirstImageFromHtml(html);
    if (embeddedImage) {
        return toAbsoluteUrl(embeddedImage);
    }

    return defaultProduct;
}

function extractSummary(post) {
    const parsed = parseContentJson(post?.contentJson);
    const html = extractHtml(parsed);

    const plain = typeof html === "string"
        ? html
            .replace(/<style[\s\S]*?<\/style>/gi, " ")
            .replace(/<script[\s\S]*?<\/script>/gi, " ")
            .replace(/<[^>]+>/g, " ")
            .replace(/&nbsp;/gi, " ")
            .replace(/\s+/g, " ")
            .trim()
        : "";

    if (plain) {
        return plain.length > 100 ? `${plain.slice(0, 100)}…` : plain;
    }

    if (parsed && typeof parsed === "object" && Array.isArray(parsed.blocks)) {
        const text = parsed.blocks
            .map((block) => block?.data?.text || "")
            .join(" ")
            .replace(/\s+/g, " ")
            .trim();
        if (text) {
            return text.length > 100 ? `${text.slice(0, 100)}…` : text;
        }
    }

    return "";
}

const EMPTY_SUMMARY_TEXT = "상세 설명이 없습니다.";

function formatDate(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

function isRecentDate(value) {
    if (!value) return false;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return false;
    const now = Date.now();
    return now - date.getTime() <= SEVEN_DAYS_MS && now >= date.getTime();
}

export default function ShopListPage() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchType, setSearchType] = useState("TITLE");
    const [keywordInput, setKeywordInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState({ searchType: undefined, keyword: "" });
    const [sort, setSort] = useState("LATEST");

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 480px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener?.("change", update);
        return () => mq.removeEventListener?.("change", update);
    }, []);

    const effectiveSearchType = appliedSearch.keyword ? appliedSearch.searchType : undefined;
    const { data, isLoading, error } = useGetPostListQuery({
        boardType: BOARD_TYPE,
        page,
        size: PAGE_SIZE,
        searchType: effectiveSearchType,
        keyword: appliedSearch.keyword,
        sort,
    });

    const postList = data?.postList ?? [];
    const totalPages = data?.totalPages ?? 1;
    const totalElements = data?.totalElements ?? 0;

    const paginationItems = useMemo(() => {
        if (totalPages <= 1) return [1];
        if (isMobile) return [page];
        const items = [];
        const delta = 2;
        const start = Math.max(1, page - delta);
        const end = Math.min(totalPages, page + delta);
        if (start > 1) {
            items.push(1);
            if (start > 2) items.push("…");
        }
        for (let i = start; i <= end; i += 1) items.push(i);
        if (end < totalPages) {
            if (end < totalPages - 1) items.push("…");
            items.push(totalPages);
        }
        return items;
    }, [page, totalPages, isMobile]);

    const handleNavigate = (postId) => {
        navigate(`/shop/list/${postId}`);
    };

    return (
        <PageWrap>
            <BoardTitle
                title="쇼핑몰"
                description="행복백세에서 준비한 상품을 확인해 보세요."
                writeSection="shop"
            />

            <FilterBar
                onSubmit={(event) => {
                    event.preventDefault();
                    const trimmed = keywordInput.trim();
                    if (!trimmed) {
                        setAppliedSearch({ searchType: undefined, keyword: "" });
                        setSearchType("TITLE");
                    } else {
                        setAppliedSearch({ searchType, keyword: trimmed });
                    }
                    setPage(1);
                }}
            >
                <SortSelect
                    value={sort}
                    onChange={(event) => {
                        setSort(event.target.value);
                        setPage(1);
                    }}
                >
                    {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SortSelect>
                <SearchSelect value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                    {SEARCH_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </SearchSelect>
                <SearchInput
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    placeholder="검색어를 입력하세요"
                />
                <SearchButton type="submit">검색</SearchButton>
            </FilterBar>

            {isLoading && <LoadingState>상품을 불러오는 중입니다…</LoadingState>}
            {!isLoading && error && (
                <ErrorState>상품 목록을 불러오는 중 오류가 발생했습니다.</ErrorState>
            )}
            {!isLoading && !error && postList.length === 0 && (
                <EmptyState>등록된 상품이 없습니다.</EmptyState>
            )}

            {!isLoading && !error && postList.length > 0 && (
                <ListWrap>
                    {postList.map((post) => {
                        const thumbnail = pickThumbnail(post);
                        const summary = extractSummary(post);
                        const hasSummary = Boolean(summary);
                        const displaySummary = hasSummary ? summary : EMPTY_SUMMARY_TEXT;
                        const createdIsRecent = post.createdAt && isRecentDate(post.createdAt);
                        return (
                            <ItemLink
                                key={post.postId}
                                type="button"
                                onClick={() => handleNavigate(post.postId)}
                            >
                                <Thumbnail>
                                    <img src={thumbnail} alt={post.title || "상품 이미지"} loading="lazy" />
                                </Thumbnail>
                                <Info>
                                    <Title>
                                        {createdIsRecent && <NewBadge>[신규]</NewBadge>}
                                        <span>{post.title || "제목 없음"}</span>
                                    </Title>
                                    <Summary muted={!hasSummary}>{displaySummary}</Summary>
                                    <Meta>
                                        {post.createdAt && <span>{formatDate(post.createdAt)}</span>}
                                        {typeof post.viewCount === "number" && (
                                            <span>조회 {post.viewCount.toLocaleString()}</span>
                                        )}
                                    </Meta>
                                </Info>
                            </ItemLink>
                        );
                    })}
                </ListWrap>
            )}

            {totalElements > 0 && (
                <Pagination
                    total={totalElements}
                    page={page}
                    totalPages={totalPages}
                    pageItems={paginationItems}
                    onChange={setPage}
                    isMobile={isMobile}
                />
            )}
        </PageWrap>
    );
}
