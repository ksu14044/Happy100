import styled from "@emotion/styled";
import { responsiveFont } from "../../../styles/responsive";

const maxW = '420px';

export const PageWrap = styled.div`
  min-height: calc(100dvh - 120px);
  display: grid;
  place-items: center;
  padding: clamp(24px, 6vw, 48px);
  background: radial-gradient(circle at 18% 20%, rgba(37, 99, 235, 0.18), transparent 55%),
    radial-gradient(circle at 82% 12%, rgba(56, 189, 248, 0.16), transparent 52%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.08), #f8fafc 65%);
`;

export const Card = styled.div`
  width: 100%;
  max-width: ${maxW};
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 28px;
  padding: clamp(28px, 5vw, 36px);
  box-shadow: 0 28px 60px rgba(15, 23, 42, 0.18);
`;

export const Title = styled.h1`
  margin: 0 0 18px;
  font-size: ${responsiveFont('24px', '28px')};
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
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
  font-size: ${responsiveFont('12px', '13px')};
  font-weight: 700;
  color: #1f2937;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Input = styled.input`
  height: 48px;
  padding: 0 16px;
  font-size: ${responsiveFont('13px', '14px')};
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 16px;
  outline: none;
  background: rgba(255, 255, 255, 0.96);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;

  &:focus {
    border-color: rgba(37, 99, 235, 0.7);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
`;

export const PrimaryButton = styled.button`
  margin-top: 12px;
  width: 100%;
  height: 48px;
  border: 0;
  border-radius: 18px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  font-weight: 700;
  font-size: ${responsiveFont('14px', '15px')};
  cursor: pointer;
  box-shadow: 0 18px 32px rgba(37, 99, 235, 0.28);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 40px rgba(37, 99, 235, 0.32);
  }
`;

export const InlineButton = styled.button`
  flex-shrink: 0;
  height: 40px;
  padding: 0 14px;
  border-radius: 12px;
  border: 1px solid rgba(37, 99, 235, 0.5);
  background: rgba(37, 99, 235, 0.08);
  color: #1d4ed8;
  font-weight: 600;
  font-size: ${responsiveFont('12px', '13px')};
  cursor: pointer;
  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.12);
    transform: translateY(-1px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;

export const MutedLinkRow = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const MutedLink = styled.a`
  font-size: ${responsiveFont("12px", "13px")};
  color: #111827;
  font-weight: 700;
  text-decoration: none;
`;

export const Small = styled.span`
  font-size: ${responsiveFont("11px", "12px")};
  color: #6b7280;
`;

export const StatusText = styled.span`
  font-size: ${responsiveFont('11px', '12px')};
  font-weight: 600;
  color: ${(props) => (props.variant === 'error' ? '#dc2626' : props.variant === 'success' ? '#16a34a' : '#6b7280')};
`;
