import styled from '@emotion/styled';
import { responsiveFont } from '../../styles/responsive.js';

export const PaginationWrap = styled.nav`
  width: min(1180px, 92vw);
  margin: clamp(36px, 6vw, 60px) auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
`;

export const PaginationRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const PaginationButton = styled.button`
  padding: 10px 18px;
  border-radius: 999px;
  border: 1px solid ${({ active }) => (active ? 'rgba(37, 99, 235, 0.8)' : 'rgba(148, 163, 184, 0.6)')};
  background: ${({ active }) => (active ? 'linear-gradient(135deg, #2563eb, #1d4ed8)' : 'rgba(255, 255, 255, 0.92)')};
  color: ${({ active }) => (active ? '#fff' : '#1f2937')};
  cursor: ${({ disabled, active }) => (disabled && !active ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled, active }) => (disabled && !active ? 0.55 : 1)};
  font-size: ${responsiveFont('13px', '14px')};
  min-width: 48px;
  box-shadow: ${({ active }) => (active ? '0 14px 24px rgba(37, 99, 235, 0.24)' : 'inset 0 0 0 0 rgba(0,0,0,0)')};
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;

  &:hover {
    transform: ${({ disabled, active }) => (disabled && !active ? 'none' : 'translateY(-2px)')};
    border-color: rgba(37, 99, 235, 0.8);
  }
`;

export const PaginationSummary = styled.span`
  font-size: ${responsiveFont('12px', '13px')};
  color: #64748b;
`;
