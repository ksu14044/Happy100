import styled from "@emotion/styled";

export const containerWidth = "1280px"; // 공통값(fallback)

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
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

export const RowGrid = styled.div`
  display: grid;
  align-items: center;
  min-height: 56px; /* 행 높이 */
  /* grid-template-columns는 JSX에서 주입 */
`;

export const Cell = styled.div`
  position: relative;
  padding: 16px 12px;               /* ⬅ 헤더와 동일 패딩 */
  font-size: 14px;
  color: #222;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: ${({ $align }) => $align || "left"};

  /* 컬럼 세로 구분선 (첫 컬럼 제외) */
  &:not(:first-of-type)::before {
    content: "";
    position: absolute;
    top: 12px;
    bottom: 12px;
    left: 0;
    width: 1px;
    background: rgba(0, 0, 0, 0.06);
  }

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;
