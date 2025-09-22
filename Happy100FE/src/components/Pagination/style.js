import styled from "@emotion/styled";
import { mediaQuery, responsiveFont } from "../../styles/responsive";

export const PaginationWrap = styled.nav`
    margin: 32px 0 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    ${mediaQuery.tablet} {
        margin: 24px 0 40px;
    }

    ${mediaQuery.mobile} {
        margin: 20px 0 32px;
    }
`;

export const PaginationRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const PaginationButton = styled.button`
    padding: 8px 14px;
    border-radius: 999px;
    border: 1px solid ${({ active }) => (active ? "#2563eb" : "#d1d5db")};
    background: ${({ active }) => (active ? "#2563eb" : "#fff")};
    color: ${({ active }) => (active ? "#fff" : "#1f2937")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
    transition: background 0.18s ease, border-color 0.18s ease;
    font-size: ${responsiveFont("13px", "14px")};
    min-width: 44px;

    &:hover {
        border-color: #2563eb;
    }
`;

export const PaginationSummary = styled.span`
    font-size: ${responsiveFont("12px", "13px")};
    color: #6b7280;
`;
