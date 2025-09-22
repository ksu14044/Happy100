import styled from "@emotion/styled";
import { mediaQuery, mediaQueryUp, responsiveFont } from "../../styles/responsive";

export const containerWidth = "900px";

export const gridColumns = `
  minmax(0, 5fr)
  minmax(80px, 1fr)
  minmax(90px, 1fr)
  minmax(100px, 1fr)
`;

export const HeaderWrap = styled.div`
  background: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 0;
`;

export const RowGrid = styled.div`
  display: grid;
  align-items: center;
  gap: 0;
  min-height: 48px;
  grid-template-columns: ${(p) => p.columns || gridColumns};

  ${mediaQuery.mobile} {
    grid-template-columns: ${(p) => (p.mobileColumns ? p.mobileColumns : `minmax(0, 5fr) minmax(90px, 1fr) minmax(100px, 1fr) minmax(0, 1fr)`)};
    min-height: 44px;
  }
`;

export const Cell = styled.div`
  padding: 16px 12px;
  font-weight: 600;
  font-size: ${responsiveFont("13px", "15px")};
  color: #444;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${({ $align }) => $align || "center"};

  ${mediaQuery.mobile} {
    padding: 12px 10px;
  }
`;
