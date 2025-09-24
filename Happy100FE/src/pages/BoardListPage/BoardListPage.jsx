
import {
    PageWrap,
    PageContainer,
    ListContainer,
    TableBlock,
    StatusMessage,
    ErrorMessage,
    FilterBar,
    SearchSelect,
    SearchInput,
    SearchButton,
    SortSelect,
} from "./style";
import BoardTitle from "../../components/board-title/BoardTitle";
import TableHeader from "../../components/board-table-header/TableHeader";
import TableRow from "../../components/board-table-row/TableRow";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetPostListQuery } from "../../queries/postQuery";
import { Pagination } from "../../components/Pagination";

// section/key 조합별 설정(보드타입/타이틀/설명)
const PAGE_CONFIG = {
    "overview/news": {
        boardType: "NEWS",
        title: "공지사항",
        description: "해피100의 새로운 소식을 전해드립니다.",
    },
    "cert/recruit": {
        boardType: "CERT",
        title: "자격증반 모집",
        description: "자격증반 모집 페이지입니다.",
    },

};

const SEARCH_OPTIONS = [
    { value: "TITLE", label: "제목" },
    { value: "CONTENT", label: "내용" },
    { value: "TITLE_CONTENT", label: "제목+내용" },
];

const SORT_OPTIONS = [
    { value: "LATEST", label: "최신순" },
    { value: "VIEWS", label: "조회수순" },
];

export default function BoardListPage() {
    const { section, key } = useParams();
    const config = PAGE_CONFIG[`${section}/${key}`] ?? null;

    const [page, setPage] = useState(1);
    const [isMobile, setIsMobile] = useState(false);
    const [searchType, setSearchType] = useState("TITLE");
    const [keywordInput, setKeywordInput] = useState("");
    const [appliedSearch, setAppliedSearch] = useState({ searchType: undefined, keyword: "" });
    const [sort, setSort] = useState("LATEST");

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 480px)");
        const onChange = () => setIsMobile(mq.matches);
        onChange();
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

    useEffect(() => {
        setPage(1);
        setKeywordInput("");
        setAppliedSearch({ searchType: undefined, keyword: "" });
        setSearchType("TITLE");
        setSort("LATEST");
    }, [config?.boardType]);

    const size = 10;
    const effectiveSearchType = appliedSearch.keyword ? appliedSearch.searchType : undefined;
    const { data, isLoading, error } = useGetPostListQuery({
        boardType: config?.boardType,
        page,
        size,
        searchType: effectiveSearchType,
        keyword: appliedSearch.keyword,
        sort,
        enabled: Boolean(config),
    });


    // 응답 구조
    const {
        postList = [],
        totalPages = 1,
        totalElements = 0,
    } = data ?? {};

    // 페이지 버튼(모바일 단순화)
    const pageItems = useMemo(() => {
        if (isMobile) return [page];
        const total = Math.max(1, totalPages);
        const cur = Math.min(Math.max(1, page), total);
        const delta = 2;
        const start = Math.max(1, cur - delta);
        const end = Math.min(total, cur + delta);
        const items = [];
        if (start > 1) {
            items.push(1);
            if (start > 2) items.push("…");
        }
        for (let i = start; i <= end; i++) items.push(i);
        if (end < total) {
            if (end < total - 1) items.push("…");
            items.push(total);
        }
        return items;
    }, [page, totalPages, isMobile]);

    const fmtDate = (d) => {
        if (!d) return "";
        const date = typeof d === "string" ? new Date(d) : d;
        return Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10);
    };

    if (!config) {
        return <Navigate to="/404" replace />;
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const trimmed = keywordInput.trim();
        if (!trimmed) {
            setAppliedSearch({ searchType: undefined, keyword: "" });
            setSearchType("TITLE");
        } else {
            setAppliedSearch({ searchType, keyword: trimmed });
        }
        setPage(1);
    };

    const handleSortChange = (event) => {
        setSort(event.target.value);
        setPage(1);
    };

    return (
        <PageWrap>
            <BoardTitle title={config.title} description={config.description} />

            <FilterBar onSubmit={handleSearchSubmit}>
                <SortSelect value={sort} onChange={handleSortChange}>
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

            <TableBlock>
                <TableHeader />

                <ListContainer>
                    {postList.map((p) => (
                        <TableRow
                            key={p.postId}
                            title={p.title}
                            views={p.viewCount}
                            author={p.authorName ?? "관리자"}
                            date={fmtDate(p.createdAt)}
                            href={`/${section}/${key}/${p.postId}`}
                        />
                    ))}
                </ListContainer>
            </TableBlock>

            {/* 상태 메시지 */}
            {(isLoading || error || postList.length === 0) && (
                <PageContainer>
                    {isLoading && <StatusMessage>불러오는 중…</StatusMessage>}
                    {!isLoading && error && (
                        <ErrorMessage>
                            오류가 발생했습니다: {String(error.message || error)}
                        </ErrorMessage>
                    )}
                    {!isLoading && !error && postList.length === 0 && (
                        <StatusMessage>게시글이 없습니다.</StatusMessage>
                    )}
                </PageContainer>
            )}

            {/* 페이지네이션 */}
            {totalElements > 0 && (
                <Pagination
                    total={totalElements}
                    page={page}
                    totalPages={totalPages}
                    pageItems={pageItems}
                    onChange={setPage}
                    isMobile={isMobile}
                />
            )}
        </PageWrap>
    );
}
