import styled from "@emotion/styled";
import { mediaQuery, mediaQueryUp, responsiveFont } from "../../styles/responsive";

export const containerWidth = "900px";

export const RowWrap = styled.div`
  background: #fff;
  border-bottom: 1px solid #eee;
  transition: background-color 0.18s ease;
  cursor: pointer;

  &:hover {
    background: #f8fafc;
  }
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 0;
`;

export const RowGrid = styled.div`
  display: grid;
  align-items: center;
  min-height: 56px;
  grid-template-columns: ${(p) => p.columns || "1fr"};
  gap: 0;

  ${mediaQuery.mobile} {
    grid-template-columns: minmax(0, 5fr) minmax(90px, 1fr) minmax(90px, 1fr);
    min-height: 52px;
  }
`;

export const Cell = styled.div`
  position: relative;
  padding: 16px 12px;
  font-size: ${responsiveFont("13px", "15px")};
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ $align }) => $align || "left"};

  &:not(:first-of-type)::before {
    content: "";
    position: absolute;
    top: 12px;
    bottom: 12px;
    left: 0;
    width: 1px;
    background: rgba(0, 0, 0, 0.06);
  }

  ${mediaQuery.mobile} {
    &:nth-of-type(4) {
      display: none;
    }
    padding: 14px 10px;
  }
`;
