import styled from '@emotion/styled';
import { mediaQuery } from '../../styles/responsive.js';

export const TitleSection = styled.section`
  padding: clamp(48px, 8vw, 72px) 0 clamp(32px, 6vw, 48px);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(37, 99, 235, 0));
  border-bottom: 1px solid rgba(148, 163, 184, 0.18);
`;

export const Container = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: clamp(24px, 4vw, 36px);
  justify-content: space-between;
  align-items: flex-start;
`;

export const TitleRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 720px;
`;

export const TitleIconSlot = styled.span`
  display: inline-flex;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: rgba(37, 99, 235, 0.12);
  align-items: center;
  justify-content: center;

  & > svg {
    width: 22px;
    height: 22px;
  }
`;

export const TitleText = styled.h1`
  margin: 0;
  font-size: clamp(28px, 5vw, 40px);
  letter-spacing: -0.02em;
  line-height: 1.2;
  color: #0f172a;
`;

export const Description = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.7;
  max-width: 620px;
`;

export const ActionGroup = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  ${mediaQuery.mobile} {
    width: 100%;
    justify-content: flex-start;
  }
`;
