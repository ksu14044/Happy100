import styled from "@emotion/styled";
import { mediaQuery, responsiveFont } from "../../styles/responsive";

export const PageWrap = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 24px 80px;

    ${mediaQuery.tablet} {
        padding: 0 16px 64px;
    }

    ${mediaQuery.mobile} {
        padding: 0 12px 48px;
    }
`;

export const ListWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const ItemLink = styled.div`
    display: flex;
    align-items: stretch;
    gap: 16px;
    padding: 16px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    background: #fff;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(15, 23, 42, 0.08);
    }

    ${mediaQuery.tablet} {
        gap: 12px;
    }

    ${mediaQuery.mobile} {
        flex-direction: column;
        align-items: stretch;
        padding: 14px;
    }
`;

export const Thumbnail = styled.div`
    width: 160px;
    height: 160px;
    border-radius: 12px;
    overflow: hidden;
    background: #f3f4f6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    ${mediaQuery.tablet} {
        width: 140px;
        height: 140px;
    }

    ${mediaQuery.mobile} {
        width: 100%;
        height: auto;

        img {
            height: 220px;
            object-fit: cover;
        }
    }
`;

export const Info = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

export const Title = styled.h3`
    font-size: ${responsiveFont("18px", "20px")};
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.4;
`;

export const Summary = styled.p`
    margin: 0;
    color: ${({ muted }) => (muted ? "#9ca3af" : "#4b5563")};
    line-height: 1.6;
    font-size: ${responsiveFont("14px", "15px")};
    max-height: 3.4em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
`;

export const Meta = styled.div`
    margin-top: auto;
    display: flex;
    gap: 12px;
    font-size: ${responsiveFont("12px", "13px")};
    color: #6b7280;
`;

export const EmptyState = styled.div`
    padding: 48px 16px;
    text-align: center;
    color: #6b7280;
    border: 1px dashed #d1d5db;
    border-radius: 12px;
    background: #f9fafb;
`;

export const ErrorState = styled(EmptyState)`
    color: #b91c1c;
    border-color: #fecaca;
    background: #fef2f2;
`;

export const LoadingState = styled(EmptyState)``;
