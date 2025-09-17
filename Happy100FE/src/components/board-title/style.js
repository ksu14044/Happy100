import styled from "@emotion/styled";

/**
 * containerWidth를 공통에서 사용할 수 있다면 아래 주석을 해제하고 사용하세요.
 * 예) import { containerWidth as footerContainer } from "@/components/footer/style";
 *    export const containerWidth = footerContainer;
 */
export const containerWidth = "1280px"; // fallback

export const TitleSection = styled.section`
  /* 헤더 아래에 즉시 붙기 때문에 상단 패딩만 최소로 부여 */
  padding: clamp(16px, 2.8vw, 28px) 0 clamp(12px, 2vw, 20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 0 16px;

  @media (min-width: 768px) {
    padding: 0 24px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
`;

export const TitleIconSlot = styled.span`
  display: inline-flex;
  width: 32px;
  height: 32px;

  & > svg {
    width: 100%;
    height: 100%;
    display: block;
  }

  @media (min-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

export const TitleText = styled.h1`
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 700;
  font-size: clamp(22px, 3.8vw, 32px);
  color: #222;
`;

export const Description = styled.p`
  margin: 8px 0 0;
  color: #666;
  font-size: clamp(13px, 2.6vw, 15px);
  line-height: 1.6;
`;

export const RightSlot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  /* 데스크톱: 살짝 왼쪽·아래로 내린 듯한 인상 */
  transform: translate(-50px, 20px);

  & > * { white-space: nowrap; }

  /* 모바일: 제목 아래 줄에 배치 + 우측 정렬 + 살짝 아래 */
  @media (max-width: 768px) {
    width: 100%;
    order: 2;               /* 제목 오른쪽이 아니라 다음 줄로 */
    justify-content: flex-end;
    transform: translate(0, 6px);
    margin-top: 4px;        /* Description과 간섭 줄이기 위한 여백 */
  }
`;


