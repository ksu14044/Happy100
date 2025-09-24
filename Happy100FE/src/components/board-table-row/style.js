import styled from '@emotion/styled';
import { mediaQuery, responsiveFont } from '../../styles/responsive.js';

export const RowWrap = styled.div`
  background: #fff;
  border-left: 1px solid rgba(148, 163, 184, 0.18);
  border-right: 1px solid rgba(148, 163, 184, 0.18);
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  width: 100%;
  margin: 0;

  &:hover {
    background: rgba(248, 250, 252, 0.9);
    box-shadow: inset 0 0 0 1px rgba(37, 99, 235, 0.12);
  }

  &:last-of-type {
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
  }
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RowGrid = styled.div`
  display: grid;
  align-items: center;
  min-height: 68px;
  grid-template-columns: ${(p) => p.columns || '1fr'};

  ${mediaQuery.mobile} {
    grid-template-columns: minmax(0, 5fr) minmax(90px, 1fr) minmax(110px, 1fr);
    min-height: 58px;
  }
`;

export const Cell = styled.div`
  padding: clamp(16px, 3vw, 22px) clamp(14px, 2.6vw, 24px);
  font-size: ${responsiveFont('13px', '15px')};
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ $align }) => $align || 'left'};

  ${mediaQuery.mobile} {
    &:nth-of-type(4) {
      display: none;
    }
    padding: 16px 14px;
  }
`;

export const TitleCell = styled(Cell)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex: 1 1 auto;

  span {
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${mediaQuery.mobile} {
    align-items: flex-start;
  }
`;

export const NewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
`;
