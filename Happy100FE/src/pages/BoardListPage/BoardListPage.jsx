
import { layout, text, pagerRow, btnStyle } from "./style";
import BoardTitle from "../../components/board-title/BoardTitle";
import TableHeader from "../../components/board-table-header/TableHeader";
import TableRow from "../../components/board-table-row/TableRow";
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { useGetPostListQuery } from "../../queries/postQuery";
import { tokenStorage } from "../../libs/authStorage";

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
        firstPage = page === 1,
        lastPage = page === totalPages,
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
            <div style={layout.container}>
                {isLoading && <div style={text.msg}>불러오는 중…</div>}
                {!isLoading && error && (
                    <div style={{ ...text.msg, color: "#b91c1c" }}>
                        오류가 발생했습니다: {String(error.message || error)}
                    </div>
                )}
                {!isLoading && !error && postList.length === 0 && (
                    <div style={text.msg}>게시글이 없습니다.</div>
                )}
            </div>

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
                <nav aria-label={`${config.title} 페이지네이션`} style={layout.pagerWrap}>
                    <div style={pagerRow(isMobile)}>
                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={firstPage || page <= 1}
                            style={btnStyle(false, firstPage || page <= 1)}
                        >
                            이전
                        </button>

                        {pageItems.map((it, idx) =>
                            it === "…" ? (
                                <span key={`e-${idx}`} style={text.ellipsis}>…</span>
                            ) : (
                                <button
                                    key={it}
                                    type="button"
                                    onClick={() => setPage(it)}
                                    aria-current={page === it ? "page" : undefined}
                                    disabled={page === it}
                                    style={btnStyle(page === it, page === it)}
                                >
                                    {isMobile ? `${page}/${totalPages}` : it}
                                </button>
                            )
                        )}

                        <button
                            type="button"
                            onClick={() => setPage((p) => Math.min(totalPages || 1, p + 1))}
                            disabled={lastPage || page >= (totalPages || 1)}
                            style={btnStyle(false, lastPage || page >= (totalPages || 1))}
                        >
                            다음
                        </button>
                    </div>

                    {!isMobile && (
                        <div style={text.summary}>
                            총 {totalElements}건 · {page}/{totalPages}페이지
                        </div>
                    )}
                </nav>
            )}
        </>
    );
}
