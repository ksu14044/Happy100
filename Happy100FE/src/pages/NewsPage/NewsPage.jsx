import React from 'react';
import BoardTitle from '../../components/board-title/BoardTitle';
import TableHeader from '../../components/board-table-header/TableHeader';
import TableRow from '../../components/board-table-row/TableRow';
import { useGetPostListQuery } from '../../queries/postQuery';
import { useQueryClient } from '@tanstack/react-query';

function NewsPage(props) {

    const fmt = (d) => {
        if (!d) return "";
        // 백엔드가 ISO 문자열이면 그대로 Date로 포맷
        const date = typeof d === "string" ? new Date(d) : d;
        return date.toISOString().slice(0, 10); // YYYY-MM-DD
    };

    const { data: posts = [], isLoading, error } = useGetPostListQuery({
        boardType: "NEWS",
        page: 1,
        size: 10,
    });


    return (
        <>
            <BoardTitle title="공지사항" description="해피100의 새로운 소식을 전해드립니다." />
            <TableHeader />
            {posts.map((p) => (
                <TableRow
                    key={p.postId}
                    title={p.title}
                    views={p.viewCount}
                    author="관리자"
                    date={fmt(p.createdAt)}
                />
            ))}
        </>
    );
}

export default NewsPage;