import React from "react";
import PropTypes from "prop-types";
import {
    PaginationWrap,
    PaginationRow,
    PaginationButton,
    PaginationSummary,
} from "./style";

export default function Pagination({
    total,
    page,
    totalPages,
    pageItems,
    onChange,
    isMobile = false,
}) {
    if (!total) return null;

    const go = (next) => {
        if (next < 1 || next > totalPages || next === page) return;
        onChange?.(next);
    };

    return (
        <PaginationWrap>
            <PaginationRow>
                <PaginationButton
                    type="button"
                    onClick={() => go(page - 1)}
                    disabled={page <= 1}
                >
                    이전
                </PaginationButton>
                {pageItems.map((item, idx) =>
                    item === "…" ? (
                        <PaginationSummary key={`ellipsis-${idx}`} aria-hidden>…</PaginationSummary>
                    ) : (
                        <PaginationButton
                            key={item}
                            type="button"
                            onClick={() => go(item)}
                            active={page === item}
                            disabled={page === item}
                        >
                            {isMobile ? `${page}/${totalPages}` : item}
                        </PaginationButton>
                    ),
                )}
                <PaginationButton
                    type="button"
                    onClick={() => go(page + 1)}
                    disabled={page >= totalPages}
                >
                    다음
                </PaginationButton>
            </PaginationRow>
            {!isMobile && (
                <PaginationSummary>
                    총 {total.toLocaleString()}건 · {page}/{totalPages}페이지
                </PaginationSummary>
            )}
        </PaginationWrap>
    );
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    pageItems: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])).isRequired,
    onChange: PropTypes.func.isRequired,
    isMobile: PropTypes.bool,
};
