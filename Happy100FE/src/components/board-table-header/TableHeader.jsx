import React from "react";
import { HeaderWrap, Container, RowGrid, Cell, gridColumns } from "./style";

export default function TableHeader({ className }) {
    return (
        <HeaderWrap className={className}>
            <Container>
                {/* 헤더/로우 모두 같은 gridColumns 사용 */}
                <RowGrid columns={gridColumns}>
                    <Cell $align="center">제목</Cell>
                    <Cell $align="center">조회수</Cell>
                    <Cell $align="center">작성자</Cell>
                    <Cell $align="center">작성일자</Cell>
                </RowGrid>
            </Container>
        </HeaderWrap>
    );
}
