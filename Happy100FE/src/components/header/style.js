// FILE: src/components/header/style.js
// Emotion styled 시스템. 하나의 폴더에 컴포넌트/스타일 분리.

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

export const bp = { md: '768px', lg: '1024px', xl: '1280px' };
export const containerWidth = '1280px';

// shouldForwardProp으로 DOM 경고 방지
const forwardSticky = { shouldForwardProp: (prop) => prop !== 'sticky' };
const forwardShow = { shouldForwardProp: (prop) => prop !== 'show' };
const forwardActive = { shouldForwardProp: (prop) => prop !== 'active' };

export const HeaderWrap = styled('header', forwardSticky)`
  position: ${props => (props.sticky ? 'sticky' : 'static')};
  top: 0;
  z-index: 1000;
  background: rgba(255,255,255,.85);
  backdrop-filter: saturate(150%) blur(8px);
  border-bottom: 1px solid rgba(17,24,39,.06);
`;

export const Inner = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 0 16px 12px;
  @media (min-width: ${bp.md}) { padding: 16px 24px 16px; }
  @media (min-width: ${bp.lg}) { padding: 18px 40px 18px; }
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
`;

// style.js 중
export const LogoButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 6px 4px;

  /* a 태그로 렌더링될 때 시각 통일 */
  color: inherit;
  text-decoration: none;
`;


export const Brand = styled.span`
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #ec4899; /* primary */
  font-size: 20px;
  @media (min-width: ${bp.md}) { font-size: 22px; }
`;

export const Tagline = styled('span', forwardShow)`
  display: ${props => (props.show ? 'block' : 'none')};
  margin-top: 3px;
  font-size: 11px;
  color: #6b7280; /* gray-500 */
`;

export const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
`;

export const DesktopNav = styled.nav`
  display: none;
  @media (min-width: ${bp.md}) { display: block; }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 40px;
  @media (min-width: ${bp.lg}) { gap: 64px; }
`;

export const NavLink = styled('a', forwardActive)`
  position: relative;
  font-size: 16.5px;
  color: #374151; /* gray-700 */
  text-decoration: none;
  transition: color .2s ease;
  ${props => props.active && css`color:#111827;font-weight:600;`}
  &:hover{ color:#111827; }
  &::after{
    content:'';position:absolute;left:0;right:0;bottom:-10px;height:2px;
    background: ${props => (props.active ? '#111827' : 'transparent')};
    transition: background .2s ease;
  }
`;

export const MobileBtn = styled.button`
  border: 1px solid rgba(0,0,0,.12);
  border-radius: 12px;
  padding: 8px 10px;
  background: white;
  display: inline-flex;align-items: center;justify-content: center;
  @media (min-width: ${bp.md}) { display: none; }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const MobilePanel = styled.div`
  display: block; padding: 0 0 16px 0;
  @media (min-width: ${bp.md}) { display: none; }
  nav{ overflow: hidden; border: 1px solid #f3f4f6; border-radius: 16px; background: #fff; animation: ${slideDown} .18s ease-out; }
`;

export const MobileItem = styled.a`
  display: block; padding: 12px 16px; font-size: 16px; color: #111827; text-decoration: none;
  &:hover{ background: #f9fafb; }
`;

export const SrOnly = styled.span`
  position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
`;

export const LogoSvg = styled.svg`
  width: 36px; height: 36px;
`;

export const NavItem = styled.li`
  position: relative;

  /* 키보드 접근성: 포커스 안에서도 열리게 */
  &:focus-within > ul {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;
  }
`;

export const Dropdown = styled.ul`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 6px);
  min-width: 180px;

  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,.08);
  padding: 8px;
  z-index: 60;

  /* 기본은 숨김, open=true면 표시 */
  opacity: ${p => (p.open ? 1 : 0)};
  pointer-events: ${p => (p.open ? 'auto' : 'none')};
  transition: opacity .14s ease, transform .14s ease;

  /* hover-bridge: 탭과 패널 사이의 작은 갭을 메움 */
  &::before {
    content: "";
    position: absolute;
    left: 0; right: 0;
    top: -14px;            /* 브리지 높이 */
    height: 14px;
  }

  /* 데스크톱에서만 사용, 모바일은 기존 패널 사용 */
  @media (max-width: 767px) { display: none; }
`;

// 3) 드롭다운 링크
export const DropdownLink = styled.a`
  display: block;
  padding: 10px 12px;
  font-size: 15px;
  color: #374151;
  text-decoration: none;
  border-radius: 8px;

  &:hover {
    background: #f9fafb;
    color: #111827;
  }
`;


