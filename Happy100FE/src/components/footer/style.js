// FILE: src/components/footer/style.js
import styled from '@emotion/styled';

export const containerWidth = '1280px';
const bg = '#836a53'; // 브라운 톤

export const FooterWrap = styled.footer`
  width: 100%;
  background: ${bg};
  color: #fff;
  margin-top: 80px;
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;

  /* ↓ 패딩 절반 수준 */
  padding: 28px 12px 18px;

  display: flex;
  flex-direction: column;
  align-items: center;

  /* ↓ 요소 간 간격도 절반 */
  gap: 14px;

  @media (min-width: 768px) {
    padding: 36px 16px 22px;
    gap: 16px;
  }
`;

export const LogoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px; /* 12 → 8 */
`;

export const LogoMark = styled.div`
  /* 72 → 36 */
  width: 36px;
  height: 36px;
  svg { width: 100%; height: 100%; display: block; }
`;

export const Brand = styled.div`
  font-weight: 800;
  letter-spacing: -0.02em;
  /* 28 → 16 */
  font-size: 16px;
  line-height: 1;
  @media (min-width: 768px) { font-size: 18px; } /* 34 → 18 */
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px; /* 16 → 8 */
  @media (min-width: 768px) { gap: 9px; } /* 18 → 9 */
`;

export const IconLink = styled.a`
  display: inline-flex;
  /* 48 → 24 */
  width: 24px;
  height: 24px;

  /* 12 → 8 */
  border-radius: 8px;

  align-items: center;
  justify-content: center;
  background: transparent;

  transition: transform .15s ease, filter .15s ease;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));

  &:hover { transform: translateY(-1px) scale(1.02); }
  &:active { transform: translateY(0); }

  /* 내부 SVG도 절반 */
  svg { width: 24px; height: 24px; }
`;

export const Info = styled.div`
  display: grid;
  row-gap: 6px;         /* 8 → 6 */
  column-gap: 12px;     /* 16 → 12 */
  text-align: center;

  /* 14.5 → 12, line-height 1.9 → 1.7 */
  font-size: 12px;
  line-height: 1.7;
  opacity: .95;

  @media (min-width: 768px) { font-size: 13.5px; } /* 16 → 13.5 */
  span { display: block; }
`;

export const SrOnly = styled.span`
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
`;
