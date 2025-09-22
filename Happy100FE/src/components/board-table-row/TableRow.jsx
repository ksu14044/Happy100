import React from "react";
import { RowWrap, Container, RowGrid, Cell } from "./style";
import { gridColumns } from "../board-table-header/style";

export default function TableRow({
    title,
    views,
    author,
    date,
    href,
    onClick,
    className,
}) {
    const content = (
        <RowGrid columns={gridColumns}>
            {/* 제목만 왼쪽 정렬 */}
            <Cell $align="left" title={typeof title === "string" ? title : undefined}>
                {title}
            </Cell>
            {/* 나머지는 모두 가운데 정렬 */}
            <Cell $align="center">{views}</Cell>
            <Cell $align="center">{author}</Cell>
            <Cell $align="center">{date}</Cell>
        </RowGrid>
    );

    const Wrapper = href
        ? ({ children }) => (
            <a
                href={href}
                style={{ display: "block", color: "inherit", textDecoration: "none" }}
                onClick={onClick}
            >
                {children}
            </a>
        )
        : ({ children }) => (
            <div role="button" onClick={onClick} style={{ display: "block" }}>
                {children}
            </div>
        );

    return (
        <RowWrap className={className}>
            <Container>
                <Wrapper>{content}</Wrapper>
            </Container>
        </RowWrap>
    );
}
