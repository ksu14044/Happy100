
import { PageContainer, StatusMessage, ErrorMessage } from "./style";
import BoardTitle from "../../components/board-title/BoardTitle";
import TableHeader from "../../components/board-table-header/TableHeader";
import TableRow from "../../components/board-table-row/TableRow";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetPostListQuery } from "../../queries/postQuery";
import { tokenStorage } from "../../libs/authStorage";
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

export default function BoardListPage() {
    const { section, key } = useParams();
    const config = PAGE_CONFIG[`${section}/${key}`]; 
    
    // 매핑되지 않으면 404로 넘김(원한다면 커스텀 UI로 대체)
    if (!config) return <Navigate to="/404" replace />;

    // 페이지 상태
    const [page, setPage] = useState(1);
    const size = 10;
    const [auth, setAuth] = useState(() => tokenStorage.load());

    // 반응형: 모바일 여부
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 480px)");
        const onChange = () => setIsMobile(mq.matches);
        onChange();
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

    // 데이터 요청
    const { data, isLoading, error } = useGetPostListQuery({
        boardType: config.boardType,
        page,
        size,
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

    return (
        <>
            <BoardTitle title={config.title} description={config.description} />

            <TableHeader />

            {/* 상태 메시지 */}
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

            {/* 목록 */}
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
        </>
    );
}
