import styled from '@emotion/styled';
import { mediaQuery, responsiveFont } from '../../styles/responsive.js';

export const PageWrap = styled.div`
  width: min(780px, 92vw);
  margin: clamp(60px, 10vw, 120px) auto clamp(90px, 12vw, 160px);
  padding: clamp(32px, 5vw, 48px);
  border-radius: 32px;
  background: #fff;
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.18);
`;

export const Title = styled.h1`
  margin-bottom: 16px;
  font-size: ${responsiveFont('28px', '34px')};
  font-weight: 800;
  color: #0f172a;
`;

export const Description = styled.p`
  margin-bottom: 32px;
  color: #475569;
  line-height: 1.8;
  font-size: ${responsiveFont('14px', '15px')};
`;

export const TabRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 32px;

  ${mediaQuery.mobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

export const TabButton = styled.button`
  flex: 1;
  padding: 14px 18px;
  border-radius: 16px;
  border: 1px solid ${({ active }) => (active ? 'rgba(37, 99, 235, 0.6)' : 'rgba(148, 163, 184, 0.4)')};
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(248, 250, 252, 0.9)')};
  color: ${({ active }) => (active ? '#fff' : '#1f2937')};
  font-size: ${responsiveFont('15px', '16px')};
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(37, 99, 235, 0.22);
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
  gap: 10px;
`;

export const Label = styled.label`
  font-weight: 700;
  color: #0f172a;
  font-size: ${responsiveFont('14px', '15px')};
`;

export const Input = styled.input`
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  font-size: ${responsiveFont('15px', '16px')};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 0.7);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
`;

export const Textarea = styled.textarea`
  padding: 14px 16px;
  border-radius: 18px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  font-size: ${responsiveFont('15px', '16px')};
  min-height: 180px;
  resize: vertical;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    outline: none;
    border-color: rgba(37, 99, 235, 0.7);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
  }
`;

export const FileInput = styled.input`
  display: block;
  font-size: ${responsiveFont('13px', '14px')};
`;

export const FileInfo = styled.p`
  margin-top: 6px;
  font-size: ${responsiveFont('13px', '14px')};
  color: #475569;
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: ${responsiveFont('13px', '14px')};
  color: #1f2937;

  input[type='checkbox'] {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    border: 1px solid rgba(148, 163, 184, 0.6);
  }
`;

export const PolicyBox = styled.div`
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(148, 163, 184, 0.12);
  border: 1px solid rgba(148, 163, 184, 0.28);
  color: #334155;
  font-size: ${responsiveFont('12px', '13px')};
  line-height: 1.7;

  strong {
    color: #0f172a;
  }

  ul {
    margin: 8px 0 0 16px;
    padding: 0;
  }

  li {
    list-style: disc;
    margin: 4px 0;
  }
`;

export const Collapsible = styled.details`
  margin-top: 6px;
`;

export const CollapsibleSummary = styled.summary`
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.4);
  color: #0f172a;
  font-weight: 700;
  font-size: ${responsiveFont('13px', '14px')};

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: '▾';
    font-size: 14px;
    color: #334155;
    transform: rotate(0deg);
    transition: transform 0.18s ease;
  }

  /* rotate icon when open */
  details[open] &::after {
    transform: rotate(-180deg);
  }
`;

export const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 14px 32px;
  border-radius: 999px;
  font-size: ${responsiveFont('15px', '16px')};
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  border: none;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.65;
    box-shadow: none;
  }

  &:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 28px rgba(37, 99, 235, 0.26);
  }
`;

export const StatusMessage = styled.p`
  padding: 16px 18px;
  border-radius: 18px;
  font-size: ${responsiveFont('13px', '14px')};
  line-height: 1.6;
  background: ${(props) => {
    const variant = props['data-variant'];
    if (variant === 'success') return 'rgba(34, 197, 94, 0.12)';
    if (variant === 'error') return 'rgba(239, 68, 68, 0.12)';
    return 'rgba(148, 163, 184, 0.16)';
  }};
  color: ${(props) => {
    const variant = props['data-variant'];
    if (variant === 'success') return '#047857';
    if (variant === 'error') return '#b91c1c';
    return '#475569';
  }};
`;
