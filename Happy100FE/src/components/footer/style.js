import styled from '@emotion/styled';
import { mediaQuery } from '../../styles/responsive';

const containerWidth = '1180px';

export const FooterWrap = styled.footer`
  width: 100%;
  margin-top: clamp(60px, 12vw, 120px);
  background: linear-gradient(135deg, #0f172a 10%, #1e3a8a 55%, #2563eb 100%);
  color: #e2e8f0;
`;

export const Container = styled.div`
  width: min(${containerWidth}, 92vw);
  margin: 0 auto;
  padding: clamp(52px, 8vw, 86px) 0 clamp(40px, 7vw, 64px);
  display: grid;
  gap: clamp(26px, 6vw, 54px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

export const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 360px;
`;

export const LogoMark = styled.div`
  width: 84px;
  height: 84px;
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.35);
  border: 1px solid rgba(148, 163, 184, 0.28);
  display: grid;
  place-items: center;
  overflow: hidden;

  svg,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const LogoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Brand = styled.div`
  font-size: clamp(26px, 4vw, 32px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #fff;
`;

export const Slogan = styled.div`
  font-size: 15px;
  font-weight: 600;
  color: #bfdbfe;
  letter-spacing: 0.01em;
`;

export const Intro = styled.p`
  color: rgba(226, 232, 240, 0.85);
  line-height: 1.7;
  font-size: 14.5px;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ColumnTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #e0f2fe;
`;

export const InfoList = styled.ul`
  display: grid;
  gap: 12px;
`;

export const InfoItem = styled.li`
  color: rgba(226, 232, 240, 0.82);
  font-size: 14.5px;
  line-height: 1.6;
`;

export const QuickList = styled.div`
  display: grid;
  gap: 12px;
`;

export const QuickLink = styled.a`
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.18s ease, transform 0.18s ease;

  &:hover {
    color: #fff;
    transform: translateX(4px);
  }
`;

export const SocialRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  ${mediaQuery.mobile} {
    flex-wrap: wrap;
  }
`;

export const IconLink = styled.a`
  display: inline-flex;
  width: 42px;
  height: 42px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.35);
  border: 1px solid rgba(148, 163, 184, 0.24);
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.12);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const BottomBar = styled.div`
  width: min(${containerWidth}, 92vw);
  margin: 0 auto;
  padding: 24px 0 42px;
  border-top: 1px solid rgba(226, 232, 240, 0.18);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const Copy = styled.span`
  font-size: 13px;
  color: rgba(226, 232, 240, 0.72);
`;

export const Keyword = styled.span`
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: rgba(191, 219, 254, 0.9);
  text-transform: uppercase;
`;

export const SrOnly = styled.span`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  clip-path: inset(50%);
  border: 0;
`;
