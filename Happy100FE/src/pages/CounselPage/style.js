import styled from "@emotion/styled";
import { mediaQuery, responsiveFont } from "../../styles/responsive";

export const PageWrap = styled.div`
    max-width: 780px;
    margin: 0 auto;
    padding: 64px 24px 96px;

    ${mediaQuery.tablet} {
        padding: 48px 20px 80px;
    }

    ${mediaQuery.mobile} {
        padding: 36px 16px 64px;
    }
`;

export const Title = styled.h1`
    margin-bottom: 16px;
    font-size: ${responsiveFont("26px", "32px")};
    font-weight: 700;
`;

export const Description = styled.p`
    margin-bottom: 32px;
    color: #4b5563;
    line-height: 1.6;
    font-size: ${responsiveFont("14px", "15px")};
`;

export const TabRow = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 32px;

    ${mediaQuery.mobile} {
        flex-direction: column;
        gap: 6px;
    }
`;

export const TabButton = styled.button`
    flex: 1;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid ${({ active }) => (active ? "#2563eb" : "#d1d5db")};
    background: ${({ active }) => (active ? "#2563eb" : "#fff")};
    color: ${({ active }) => (active ? "#fff" : "#111827")};
    font-size: ${responsiveFont("15px", "16px")};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover,
    &:focus {
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
    }
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const Label = styled.label`
    font-weight: 600;
    color: #111827;
`;

export const Input = styled.input`
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: ${responsiveFont("15px", "16px")};
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
`;

export const Textarea = styled.textarea`
    padding: 12px 14px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: ${responsiveFont("15px", "16px")};
    min-height: 160px;
    resize: vertical;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    }
`;

export const FileInput = styled.input`
    display: block;
`;

export const FileInfo = styled.p`
    margin-top: 6px;
    font-size: ${responsiveFont("13px", "14px")};
    color: #4b5563;
`;

export const CheckboxRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: ${responsiveFont("13px", "14px")};
    color: #1f2937;

    input[type="checkbox"] {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid #9ca3af;
    }
`;

export const SubmitButton = styled.button`
    align-self: flex-end;
    padding: 12px 28px;
    border-radius: 8px;
    font-size: ${responsiveFont("15px", "16px")};
    font-weight: 600;
    color: #fff;
    background: #2563eb;
    border: none;
    cursor: pointer;
    transition: background 0.2s ease;

    &:disabled {
        cursor: not-allowed;
        background: #93c5fd;
    }

    &:not(:disabled):hover {
        background: #1d4ed8;
    }
`;

export const StatusMessage = styled.p`
    padding: 12px 16px;
    border-radius: 8px;
    font-size: ${responsiveFont("13px", "14px")};
    line-height: 1.5;
    background: ${(props) => {
        const variant = props["data-variant"];
        if (variant === "success") return "#ecfdf5";
        if (variant === "error") return "#fef2f2";
        return "#f3f4f6";
    }};
    color: ${(props) => {
        const variant = props["data-variant"];
        if (variant === "success") return "#047857";
        if (variant === "error") return "#b91c1c";
        return "#374151";
    }};
`;
