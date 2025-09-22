import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";
import { mediaQuery, mediaQueryUp } from "../../styles/responsive";

export const containerWidth = "1100px";

// DOM 경고 방지용 shouldForwardProp
const forwardSticky = { shouldForwardProp: (prop) => prop !== "sticky" };
const forwardShow = { shouldForwardProp: (prop) => prop !== "show" };
const forwardActive = { shouldForwardProp: (prop) => prop !== "active" };
const forwardOpen = { shouldForwardProp: (prop) => prop !== "open" };

export const HeaderWrap = styled("header", forwardSticky)`
  position: ${(p) => (p.sticky ? "sticky" : "static")};
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: saturate(150%) blur(8px);
  border-bottom: 1px solid rgba(17, 24, 39, 0.06);
`;

export const Inner = styled.div`
  max-width: ${containerWidth};
  margin: 0 auto;
  padding: 12px 16px;

  ${mediaQuery.mobile} {
    padding: 16px 20px;
  }

  ${mediaQueryUp.desktop} {
    padding: 18px 32px;
  }
`;

export const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
`;

export const RightArea = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  ${mediaQueryUp.tablet} {
    display: flex;
  }
`;

// [ADDED] 로그인 상태 우측 영역
export const UserArea = styled.div`
  display: none;
  align-items: center;
  gap: 10px;

  ${mediaQueryUp.tablet} {
    display: flex;
  }
`;

// [ADDED] 로그인 사용자 이름
export const UserName = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

// [ADDED] 로그아웃 버튼
export const LogoutBtn = styled.button`
  height: 36px;
  padding: 0 12px;
  border-radius: 9999px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: #374151;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: #f9fafb;
  }
`;

export const AuthLink = styled.a`
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 9999px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  color: #374151;
  background: #fff;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
  &:hover {
    background: #f9fafb;
  }
  &[data-variant="primary"] {
    background: #111827;
    color: #fff;
    border-color: #111827;
    &:hover {
      opacity: 0.92;
    }
  }
`;

export const LogoButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 6px 4px;
  color: inherit;
  text-decoration: none;
`;

export const Brand = styled.span`
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.02em;
  color: #ec4899;
  font-size: 18px;

  ${mediaQueryUp.tablet} {
    font-size: 22px;
  }
`;

export const Tagline = styled("span", forwardShow)`
  display: ${(p) => (p.show ? "block" : "none")};
  margin-top: 3px;
  font-size: 11px;
  color: #6b7280;
`;

export const LogoImg = styled.img`
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
`;

export const LogoSvg = styled.svg`
  width: 36px;
  height: 36px;
`;

export const DesktopNav = styled.nav`
  display: none;

  ${mediaQueryUp.tablet} {
    display: block;
  }
`;

export const NavList = styled.ul`
  display: flex;
  gap: 28px;

  ${mediaQueryUp.desktop} {
    gap: 48px;
  }
`;

export const NavItem = styled.li`
  position: relative;

  /* 키보드 접근 시(TAB) :focus-within으로 열림 허용 */
  [data-kb-nav="true"] & {
    &:focus-within > ul {
      opacity: 1;
      transform: translate(-50%, 0);
      pointer-events: auto;
    }
  }
`;

export const NavLink = styled("a", forwardActive)`
  position: relative;
  font-size: 16.5px;
  color: #374151;
  text-decoration: none;
  transition: color 0.2s ease;
  ${(p) =>
    p.active &&
    css`
      color: #111827;
      font-weight: 600;
    `}
  &:hover {
    color: #111827;
  }
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 2px;
    background: ${(p) => (p.active ? "#111827" : "transparent")};
    transition: background 0.2s ease;
  }
`;

const slideDown = keyframes`
  from { opacity: 0; transform: translateY(-6px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const MobileBtn = styled.button`
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  padding: 8px 10px;
  background: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${mediaQueryUp.tablet} {
    display: none;
  }
`;

export const MobilePanel = styled.div`
  display: block;
  padding: 0 0 16px 0;
  ${mediaQueryUp.tablet} {
    display: none;
  }
  nav {
    overflow: hidden;
    border: 1px solid #f3f4f6;
    border-radius: 16px;
    background: #fff;
    animation: ${slideDown} 0.18s ease-out;
  }
`;

export const MobileItem = styled.a`
  display: block;
  padding: 12px 16px;
  font-size: 16px;
  color: #111827;
  text-decoration: none;
  &:hover {
    background: #f9fafb;
  }
`;

/* Dropdown: open prop이 DOM으로 나가지 않도록 필터 */
export const Dropdown = styled("ul", forwardOpen)`
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translate(-50%, 6px);
  min-width: 180px;
  background: #fff;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  padding: 8px;
  z-index: 60;

  /* 기본 숨김, open=true면 표시 */
  opacity: ${(p) => (p.open ? 1 : 0)};
  pointer-events: ${(p) => (p.open ? "auto" : "none")};
  transition: opacity 0.14s ease, transform 0.14s ease;

  /* 탭과 패널 사이의 작은 갭을 메우는 브리지 */
  &::before {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: -14px;
    height: 14px;
  }

  ${mediaQuery.tablet} {
    display: none;
  }
`;

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

export const SrOnly = styled.span`
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
`;
