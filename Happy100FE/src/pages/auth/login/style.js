import styled from "@emotion/styled";
import { responsiveFont } from "../../../styles/responsive";

const maxW = '420px';

export const PageWrap = styled.div`
  min-height: calc(100dvh - 120px);
  display: grid;
  place-items: center;
  padding: clamp(24px, 6vw, 48px);
  background: radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.18), transparent 55%),
    radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.16), transparent 52%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.1), #f8fafc 65%);
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

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 4px;
`;

export const GhostButton = styled.button`
  height: 36px;
  padding: 0 12px;
  font-size: ${responsiveFont('12px', '13px')};
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.2);
  border-radius: 9999px;
  cursor: pointer;

  &:hover {
    background: rgba(37, 99, 235, 0.16);
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

export const ModalPrimaryButton = styled(PrimaryButton)`
  width: auto;
  min-width: 120px;
  margin-top: 0;
  padding: 0 18px;
`;

export const Divider = styled.div`
  height: 1px;
  background: rgba(148, 163, 184, 0.2);
  margin: 18px 0;
`;

export const OAuthRow = styled.div`
  display: grid;
  gap: 8px;
`;

export const OAuthBtn = styled.button`
  height: 46px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.24);
  background: #fff;
  font-size: ${responsiveFont('14px', '15px')};
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 12px 24px rgba(15, 23, 42, 0.14);
  }

  &[data-provider='google'] {
    border-color: rgba(148, 163, 184, 0.4);
    color: #111827;
  }
  &[data-provider='naver'] {
    background: #03c75a;
    border-color: #03c75a;
    color: #fff;
  }
  &[data-provider='kakao'] {
    background: #fee500;
    border-color: #fee500;
    color: #191600;
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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(16px, 4vw, 32px);
  background: rgba(15, 23, 42, 0.55);
  z-index: 1000;
`;

export const ModalCard = styled.div`
  width: 100%;
  max-width: ${maxW};
  background: rgba(255, 255, 255, 0.98);
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 28px 48px rgba(15, 23, 42, 0.28);
  padding: clamp(24px, 5vw, 32px);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: ${responsiveFont('20px', '22px')};
  font-weight: 700;
  color: #0f172a;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;

  &:hover { color: #4b5563; }
`;

export const ModalBody = styled.div`
  display: grid;
  gap: 12px;
`;

export const ModalForm = styled.form`
  display: grid;
  gap: 12px;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const HelperText = styled.p`
  margin: 0;
  font-size: ${responsiveFont("12px", "13px")};
  color: #4b5563;
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: ${responsiveFont("12px", "13px")};
  color: #dc2626;
`;

export const SuccessText = styled.p`
  margin: 0;
  font-size: ${responsiveFont("12px", "13px")};
  color: #047857;
  word-break: keep-all;
`;
