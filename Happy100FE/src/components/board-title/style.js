import styled from "@emotion/styled";
import { mediaQuery, mediaQueryUp, responsiveFont } from "../../styles/responsive";

export const containerWidth = "900px";

export const TitleSection = styled.section`
  padding: clamp(20px, 3vw, 32px) 0 clamp(16px, 2.4vw, 24px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: #fff;

  ${mediaQuery.mobile} {
    padding: 18px 0 14px;
  }
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;

  ${mediaQuery.tablet} {
    padding: 0 20px;
  }

  ${mediaQuery.mobile} {
    padding: 0 16px;
  }
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  ${mediaQuery.mobile} {
    align-items: center;
    gap: 10px;
  }
`;

export const TitleIconSlot = styled.span`
  display: inline-flex;
  width: 32px;
  height: 32px;

  ${mediaQueryUp.tablet} {
    width: 36px;
    height: 36px;
  }

  & > svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const TitleText = styled.h1`
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.02em;
  font-weight: 700;
  font-size: ${responsiveFont("22px", "32px")};
  color: #222;
`;

export const Description = styled.p`
  margin: clamp(4px, 1vw, 8px) 0 0;
  color: #666;
  font-size: ${responsiveFont("13px", "15px")};
  line-height: 1.6;
  ${mediaQuery.mobile} {
    margin-top: 6px;
  }
`;

export const RightSlot = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transform: translate(-20px, 16px);

  & > * {
    white-space: nowrap;
  }

  ${mediaQuery.tablet} {
    width: auto;
    order: 0;
    justify-content: flex-end;
    transform: none;
    margin-top: 0;
  }

  ${mediaQuery.mobile} {
    width: 100%;
    order: 2;
    justify-content: flex-end;
    margin-top: 9px;
    transform: none;
  }
`;
