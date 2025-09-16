import styled from "@emotion/styled";

export const containerWidth = "1280px"; // 공통값(fallback)

export const gridColumns = `
  minmax(0, 1fr)  /* 제목 */
  96px            /* 조회수 */
  140px           /* 작성자 */
  160px           /* 작성일자 */
`;

export const HeaderWrap = styled.div`
  background: #fafafa;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
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
  /* ⬇ 헤더/로우 불일치 원인 제거: gap을 0으로 통일 */
  gap: 0;
  height: 48px;

  @media (min-width: 768px) {
    height: 52px;
  }
`;

export const Cell = styled.div`
  /* ⬇ 로우와 동일 패딩을 줘서 시작/중심선이 일치하도록 */
  padding: 16px 12px;
  font-weight: 600;
  font-size: 14px;
  color: #444;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: ${({ $align }) => $align || "center"};

  @media (min-width: 768px) {
    font-size: 15px;
  }
`;
