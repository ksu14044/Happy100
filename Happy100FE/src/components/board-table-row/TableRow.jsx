import React from "react";
import { Link } from "react-router-dom";
import { RowWrap, Container, RowGrid, Cell, NewBadge, TitleCell } from "./style";
import { gridColumns } from "../board-table-header/style";

const isRecentDate = (input) => {
    if (!input) return false;
    const baseDate = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(baseDate.getTime())) return false;
    const now = new Date();
    const sevenDaysMs = 24 * 60 * 60 * 1000;
    return now.getTime() - baseDate.getTime() <= sevenDaysMs && now >= baseDate;
};

const formatDate = (input) => {
    if (!input) return "";
    const d = input instanceof Date ? input : new Date(input);
    if (Number.isNaN(d.getTime())) return "";
    return d.toISOString().slice(0, 10);
};

export default function TableRow({
    title,
    views,
    author,
    date,
    href,
    onClick,
    className,
}) {
    const formattedDate = formatDate(date);
    const showNewBadge = formattedDate && isRecentDate(date);

    const content = (
        <RowGrid columns={gridColumns}>
            {/* 제목만 왼쪽 정렬 */}
            <TitleCell title={typeof title === "string" ? title : undefined}>
                {showNewBadge && <NewBadge>[신규]</NewBadge>}
                <span>{title}</span>
            </TitleCell>
            {/* 나머지는 모두 가운데 정렬 */}
            <Cell $align="center">{views}</Cell>
            <Cell $align="center">{author}</Cell>
            <Cell $align="center">
                {formattedDate}
            </Cell>
        </RowGrid>
    );

    const Wrapper = href
        ? ({ children }) => (
            <Link
                to={href}
                style={{ display: "block", color: "inherit", textDecoration: "none" }}
                onClick={onClick}
            >
                {children}
            </Link>
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
