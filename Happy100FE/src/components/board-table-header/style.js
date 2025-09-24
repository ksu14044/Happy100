import styled from '@emotion/styled';
import { mediaQuery, responsiveFont } from '../../styles/responsive.js';

export const gridColumns = `
  minmax(0, 7fr)
  minmax(90px, 1.1fr)
  minmax(120px, 1.2fr)
  minmax(130px, 1.2fr)
`;

export const HeaderWrap = styled.div`
  background: rgba(37, 99, 235, 0.06);
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  margin: 0 auto;
  width: min(1180px, 92vw);
`;

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const RowGrid = styled.div`
  display: grid;
  align-items: center;
  gap: 0;
  min-height: 60px;
  grid-template-columns: ${(p) => p.columns || gridColumns};

  ${mediaQuery.mobile} {
    grid-template-columns: minmax(0, 5fr) minmax(90px, 1fr) minmax(110px, 1fr);
    min-height: 54px;
  }
`;

export const Cell = styled.div`
  padding: 18px 18px;
  font-weight: 700;
  font-size: ${responsiveFont('13px', '15px')};
  color: #1e293b;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${({ $align }) => $align || "center"};

  ${mediaQuery.mobile} {
    &:nth-of-type(4) {
      display: none;
    }
    padding: 14px 12px;
  }

  &:first-of-type {
    text-align: left;
  }
`;
