import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { mediaQuery, mediaQueryUp } from '../../styles/responsive';

const containerWidth = '1180px';

const forwardSticky = { shouldForwardProp: (prop) => prop !== 'sticky' };
const forwardShow = { shouldForwardProp: (prop) => prop !== 'show' };
const forwardActive = { shouldForwardProp: (prop) => prop !== 'active' };
const forwardOpen = { shouldForwardProp: (prop) => prop !== 'open' };

export const HeaderWrap = styled('header', forwardSticky)`
  position: ${(p) => (p.sticky ? 'sticky' : 'static')};
  top: 0;
  z-index: 1000;
  width: 100%;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: saturate(180%) blur(16px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.05);
`;

export const Inner = styled.div`
  margin: 0 auto;
  width: min(${containerWidth}, 92vw);
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  min-height: 76px;

  ${mediaQuery.desktop} {
    gap: 16px;
    min-height: 70px;
  }

  ${mediaQuery.mobile} {
    gap: 16px;
    min-height: 64px;
  }
`;

export const LogoButton = styled.button`
  display: inline-flex;
  gap: 14px;
  align-items: center;
  background: transparent;
  border: 0;
  padding: 10px 8px;
  margin: -6px 0;
  cursor: pointer;
  color: inherit;
`;

export const LogoImg = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  object-fit: cover;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.35);

  ${mediaQuery.desktop} {
    width: 48px;
    height: 48px;
    border-radius: 16px;
  }

  ${mediaQuery.mobile} {
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }
`;

export const LogoSvg = styled.svg`
  width: 52px;
  height: 52px;
  border-radius: 18px;
  display: block;
`;

export const Brand = styled.span`
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-primary);
`;

export const Tagline = styled('span', forwardShow)`
  display: ${(p) => (p.show ? 'block' : 'none')};
  margin-top: 4px;
  font-size: 12px;
  color: var(--color-muted);
  font-weight: 500;

  ${mediaQuery.desktop} {
    display: none;
  }
`;

export const DesktopNav = styled.nav`
  display: none;
  flex: 1 1 auto;

  /* 1025px 이상에서만 데스크톱 내비 노출 */
  @media (min-width: 1025px) {
    display: flex;
    justify-content: center;
  }
`;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: clamp(18px, 4vw, 34px);

  ${mediaQuery.desktop} {
    gap: clamp(12px, 2.8vw, 22px);
  }
`;

export const NavItem = styled.li`
  position: relative;

  [data-kb-nav='true'] & {
    &:focus-within > ul {
      opacity: 1;
      transform: translate(-50%, 0px);
      pointer-events: auto;
    }
  }
`;

export const NavLink = styled('a', forwardActive)`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 14px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => (p.active ? 'var(--color-primary)' : '#1f2937')};
  transition: color 0.2s ease;

  &:hover {
    color: var(--color-primary);
  }

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 6px;
    transform: translateX(-50%);
    width: ${(p) => (p.active ? '70%' : '0')};
    height: 3px;
    border-radius: 999px;
    background: var(--color-primary);
    opacity: ${(p) => (p.active ? 1 : 0)};
    transition: width 0.2s ease, opacity 0.2s ease;
  }

  &:hover::after {
    width: 70%;
    opacity: 1;
  }

  ${mediaQuery.desktop} {
    padding: 12px 0;
    font-size: 15px;
  }
`;

const dropdownFade = keyframes`
  from { opacity: 0; transform: translate(-50%, -6px); }
  to { opacity: 1; transform: translate(-50%, 0px); }
`;

export const Dropdown = styled('ul', forwardOpen)`
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translate(-50%, -6px);
  min-width: 200px;
  padding: 12px;
  border-radius: 18px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.12);
  opacity: ${(p) => (p.open ? 1 : 0)};
  pointer-events: ${(p) => (p.open ? 'auto' : 'none')};
  transition: opacity 0.18s ease;
  animation: ${(p) => (p.open ? dropdownFade : 'none')} 0.22s ease;
  z-index: 20;

  &::before {
    content: '';
    position: absolute;
    inset: -14px 0 auto;
    height: 14px;
  }

  ${mediaQuery.tablet} {
    display: none;
  }
`;

export const DropdownLink = styled.a`
  display: block;
  padding: 12px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  transition: background 0.18s ease, color 0.18s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
    color: var(--color-primary);
  }
`;

export const RightArea = styled.div`
  display: none;
  align-items: center;
  gap: 12px;

  /* 1025px 이상에서만 우측 액션 노출 */
  @media (min-width: 1025px) {
    display: inline-flex;
  }
`;

export const UserArea = styled(RightArea)`
  gap: 18px;
`;

export const UserName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-muted);

  ${mediaQuery.desktop} {
    display: none;
  }
`;

export const LogoutBtn = styled.button`
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(99, 102, 241, 0.24);
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  color: var(--color-primary);
  transition: background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
    border-color: rgba(37, 99, 235, 0.38);
  }

  ${mediaQuery.desktop} {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const AuthLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.32);
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  transition: background 0.18s ease, border-color 0.18s ease, color 0.18s ease;

  &:hover {
    background: rgba(148, 163, 184, 0.12);
    color: var(--color-primary);
    border-color: rgba(99, 102, 241, 0.24);
  }

  &[data-variant='primary'] {
    background: linear-gradient(135deg, #2563eb, #3b82f6);
    color: #fff;
    border: 1px solid transparent;
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.28);

    &:hover {
      filter: brightness(0.98);
    }
  }

  ${mediaQuery.desktop} {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const CtaLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, #2563eb, #2563eb 45%, #1d4ed8 100%);
  color: #fff;
  font-weight: 700;
  font-size: 15px;
  box-shadow: 0 12px 26px rgba(37, 99, 235, 0.28);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 18px 32px rgba(37, 99, 235, 0.28);
  }

  ${mediaQuery.desktop} {
    padding: 9px 16px;
    font-size: 14px;
  }
`;

export const MobileBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 16px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  background: rgba(255, 255, 255, 0.9);
  color: var(--color-primary);

  /* 1025px 이상에서는 모바일 버튼 숨김 */
  @media (min-width: 1025px) {
    display: none;
  }
`;

const mobileSlide = keyframes`
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const MobilePanel = styled.div`
  display: block;
  border-radius: 20px;
  border: 1px solid rgba(148, 163, 184, 0.25);
  background: #fff;
  box-shadow: 0 14px 34px rgba(15, 23, 42, 0.16);
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  max-height: calc(100vh - 100px);
  animation: ${mobileSlide} 0.22s ease;

  nav {
    display: flex;
    flex-direction: column;
  }

  /* 1025px 이상에서는 모바일 패널 숨김 (태블릿~모바일에서만 표시) */
  @media (min-width: 1025px) {
    display: none;
  }
`;

export const MobileItem = styled.a`
  display: block;
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  border-bottom: 1px solid rgba(226, 232, 240, 0.8);
  background: #fff;

  &:hover {
    background: rgba(37, 99, 235, 0.08);
    color: var(--color-primary);
  }

  &:last-of-type {
    border-bottom: 0;
  }
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
