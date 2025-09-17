import styled from "@emotion/styled";

const maxW = "420px";

export const PageWrap = styled.div`
  min-height: calc(100dvh - 120px);
  display: grid;
  place-items: center;
  padding: clamp(16px, 4vw, 32px);
  background: #f8fafc;
`;

export const Card = styled.div`
  width: 100%;
  max-width: ${maxW};
  background: #fff;
  border: 1px solid #eef2f7;
  border-radius: 16px;
  padding: clamp(16px, 4vw, 24px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
`;

export const Title = styled.h1`
  margin: 0 0 12px;
  font-size: clamp(18px, 4vw, 20px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #111827;
`;

export const Form = styled.form`
  display: grid;
  gap: 10px;
`;

export const Row = styled.div`
  display: grid;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #374151;
`;

export const Input = styled.input`
  height: 40px;
  padding: 0 12px;
  font-size: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  background: #fff;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 3px rgba(17, 24, 39, 0.08);
  }
`;

export const PrimaryButton = styled.button`
  margin-top: 8px;
  width: 100%;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background: #111827;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;

  &:hover { opacity: 0.96; }
  &:active { opacity: 0.92; }
`;

export const MutedLinkRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const MutedLink = styled.a`
  font-size: 13px;
  color: #111827;
  font-weight: 700;
  text-decoration: none;
`;

export const Small = styled.span`
  font-size: 12px;
  color: #6b7280;
`;
