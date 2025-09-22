import styled from '@emotion/styled';
import { mediaQuery, mediaQueryUp, responsiveFont } from '../../styles/responsive';

export const containerWidth = '1100px';
const bg = '#836a53';

export const FooterWrap = styled.footer`
  width: 100%;
  background: ${bg};
  color: #fff;
  margin-top: 40px;
`;

export const Container = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 32px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  ${mediaQuery.tablet} {
    padding: 28px 20px 20px;
    gap: 14px;
  }

  ${mediaQuery.mobile} {
    padding: 24px 16px 18px;
    gap: 12px;
  }
`;

export const LogoStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const LogoMark = styled.div`
  width: 40px;
  height: 40px;

  ${mediaQuery.mobile} {
    width: 32px;
    height: 32px;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export const Brand = styled.div`
  font-weight: 800;
  letter-spacing: -0.02em;
  font-size: ${responsiveFont('16px', '18px')};
  line-height: 1;
`;

export const SocialRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
`;

export const IconLink = styled.a`
  display: inline-flex;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: transparent;
  transition: transform .15s ease, filter .15s ease;
  filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));

  &:hover { transform: translateY(-1px) scale(1.02); }
  &:active { transform: translateY(0); }

  svg { width: 24px; height: 24px; }

  ${mediaQuery.mobile} {
    width: 24px;
    height: 24px;
    svg { width: 22px; height: 22px; }
  }
`;

export const Info = styled.div`
  display: grid;
  row-gap: 6px;
  column-gap: 14px;
  text-align: center;
  font-size: ${responsiveFont('12px', '13.5px')};
  line-height: 1.7;
  opacity: .95;
  span { display: block; }

  ${mediaQueryUp.tablet} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const SrOnly = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
`;
