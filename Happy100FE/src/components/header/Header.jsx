import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
    HeaderWrap, Inner, Bar, LogoButton, Brand, Tagline, LogoImg,
    DesktopNav, NavList, NavItem, NavLink,
    Dropdown, DropdownLink,
    MobileBtn, MobilePanel, MobileItem, SrOnly, LogoSvg,
    RightArea, AuthLink, UserArea, UserName, LogoutBtn, CtaLink,
} from "./style";
import { logout as requestLogout } from "../../apis/authApi";
import { useGetUserInfoQuery } from "../../queries/userQuery";
import { useQueryClient } from "@tanstack/react-query";

export default function Header({
    navItems,
    currentPath,
    onNavigate,
    onLogoClick,
    sticky = true,
    showTagline = true,
    logoSrc,
    className,
}) {
    // 키보드(Tab)로 진입했을 때만 :focus-within 열림 허용
    const [kbNav, setKbNav] = useState(false);
    useEffect(() => {
        const onKey = (e) => e.key === "Tab" && setKbNav(true);
        const onPointer = () => setKbNav(false);
        window.addEventListener("keydown", onKey, true);
        window.addEventListener("pointerdown", onPointer, true);
        return () => {
            window.removeEventListener("keydown", onKey, true);
            window.removeEventListener("pointerdown", onPointer, true);
        };
    }, []);

    const items = useMemo(
        () =>
            navItems ?? [
                {
                    label: "브랜드",
                    href: "/overview",
                    children: [
                        { label: "회사소개", href: "/overview/company" },
                        { label: "핵심 활동", href: "/overview/activity" },
                        { label: "공지사항", href: "/overview/news" },
                        { label: "오시는 길", href: "/overview/map" },
                    ],
                },
                {
                    label: "프로그램",
                    href: "/program",
                    children: [
                        { label: "교육 절차", href: "/program/flow" },
                        { label: "과정 안내", href: "/program/curriculum" },
                    ],
                },
                {
                    label: "자격증반 모집",
                    href: "/cert/recruit",
                    children: [{ label: "상담 신청", href: "/counsel?type=certificate" }],
                },
                {
                    label: "지사모집",
                    href: "/franchise",
                    children: [{ label: "상담 신청", href: "/counsel?type=branch" }],
                },
                { label: "쇼핑몰", href: "/shop/list" },
            ],
        [navItems]
    );

  const [mobileOpen, setMobileOpen] = useState(false);
    const [openIdx, setOpenIdx] = useState(null); // 드롭다운 열린 인덱스
    const navRef = useRef(null);

    // 쿠키 기반 인증: 현재 사용자 정보 조회
    const { data: user, refetch } = useGetUserInfoQuery();
    const userInfo = useMemo(() => {
        if (user && typeof user === 'object') {
            // role 우선순위: role -> roleName -> authorities 배열
            let role = user.role || user.roleName || null;
            if (!role && Array.isArray(user.authorities)) {
                const found = user.authorities.find((r) => typeof r === 'string' && r.includes('ROLE_'));
                role = found || null;
            }
            return { name: user.name || user.username || '회원', role: role || 'ROLE_USER' };
        }
        return null;
    }, [user]);
    
    // 표시용 이름과 관리자 권한 계산
    const displayName = userInfo?.name ?? "회원";
    const isAdmin = userInfo?.role === "ROLE_ADMIN";



    const go = useCallback(
        (e, href) => {
            if (onNavigate) {
                e.preventDefault();
                onNavigate(href);
            } else if (href === "/" && onLogoClick) {
                onLogoClick(e);
            }
            setMobileOpen(false);
            // 클릭 자체로는 드롭다운을 닫지 않음 — 영역에서 벗어날 때 닫힘
        },
        [onNavigate, onLogoClick]
    );

    // [ADDED] 로그아웃
    const queryClient = useQueryClient();
    const onLogout = useCallback(async () => {
        await requestLogout();
        // 즉시 UI 반영: 캐시를 비우고 무효화
        queryClient.setQueryData(['user','me'], null);
        await queryClient.invalidateQueries({ queryKey: ['user','me'] });
        if (onNavigate) onNavigate("/");
    }, [onNavigate, queryClient]);

    const [logoFailed, setLogoFailed] = useState(false);
  const resolvedLogoSrc = logoSrc ?? import.meta.env.VITE_BRAND_LOGO_URL ?? "/assets/happy100-logo.jpg";
  const showImageLogo = resolvedLogoSrc && !logoFailed;

  // Lock body scroll while mobile menu is open so only the menu panel scrolls
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

    return (
        <HeaderWrap sticky={sticky} className={className}>
            <Inner>
                <Bar>
                    <LogoButton as="a" href="/" onClick={(e) => go(e, "/")} aria-label="행복백세 홈">
                        {showImageLogo ? (
                            <LogoImg
                                src={resolvedLogoSrc}
                                alt="행복백세 로고"
                                loading="lazy"
                                onError={() => setLogoFailed(true)}
                            />
                        ) : (
                            <LogoSvg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
                                <defs>
                                    <linearGradient id="happy100-logo" x1="0" x2="1" y1="1" y2="0">
                                        <stop offset="0%" stopColor="#2563eb" />
                                        <stop offset="100%" stopColor="#38bdf8" />
                                    </linearGradient>
                                </defs>
                                <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#happy100-logo)" opacity="0.9" />
                                <path
                                    d="M32 45.5c-7.2-3.8-17-11.9-17-20.4 0-5.2 4.2-9.4 9.4-9.4 3.3 0 6.3 1.7 8 4.3 1.7-2.6 4.7-4.3 8-4.3 5.2 0 9.4 4.2 9.4 9.4 0 8.5-9.8 16.6-17 20.4z"
                                    fill="#fff"
                                    opacity="0.95"
                                />
                            </LogoSvg>
                        )}
                        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                            <Brand>행복백세</Brand>
                            <Tagline show={showTagline}>행복하게 백세까지</Tagline>
                        </span>
                    </LogoButton>

                    {/* 데스크톱 내비: 호버로 열림, 영역 이탈 시 닫힘 */}
                    <DesktopNav
                        ref={navRef}
                        data-kb-nav={kbNav ? "true" : "false"}
                        aria-label="주요 메뉴"
                        onMouseLeave={() => setOpenIdx(null)}
                    >
                        <NavList>
                            {items.map((item, idx) => {
                                const active = currentPath && item.href && currentPath.startsWith(item.href);
                                const hasChildren = !!(item.children && item.children.length);
                                const open = openIdx === idx;

                                return (
                                    <NavItem key={item.label} onMouseEnter={() => setOpenIdx(idx)}>
                                        <NavLink
                                            href={item.href}
                                            active={active}
                                            aria-haspopup={hasChildren || undefined}
                                            aria-expanded={hasChildren ? open : undefined}
                                            onClick={(e) => go(e, item.href)}
                                        >
                                            {item.label}
                                        </NavLink>

                                        {hasChildren && (
                                            <Dropdown
                                                role="menu"
                                                aria-label={`${item.label} 하위 메뉴`}
                                                open={open}
                                                onMouseLeave={() => setOpenIdx(null)}
                                            >
                                                {item.children.map((child) => (
                                                    <DropdownLink
                                                        key={child.label}
                                                        href={child.href}
                                                        onClick={(e) => go(e, child.href)}
                                                    >
                                                        {child.label}
                                                    </DropdownLink>
                                                ))}
                                            </Dropdown>
                                        )}
                                    </NavItem>
                                );
                            })}
                        </NavList>
                    </DesktopNav>

                    {/* 데스크톱 우측 */}
                    {userInfo ? (
                        <UserArea>
                            <CtaLink href="/counsel" onClick={(e) => go(e, "/counsel")}>
                                상담 신청
                            </CtaLink>
                            {isAdmin && (
                                <AuthLink href="/admin" onClick={(e) => go(e, "/admin")}>
                                    관리자
                                </AuthLink>
                            )}
                            <UserName onClick={(e) => go(e, "/mypage")} style={{ cursor: 'pointer' }}>
                                {displayName}님
                            </UserName>
                            <LogoutBtn type="button" onClick={onLogout}>
                                로그아웃
                            </LogoutBtn>
                        </UserArea>
                    ) : (
                        <RightArea>
                            <CtaLink href="/counsel" onClick={(e) => go(e, "/counsel")}>
                                상담 신청
                            </CtaLink>
                            <AuthLink href="/login" onClick={(e) => go(e, "/login")}>
                                로그인
                            </AuthLink>
                            <AuthLink href="/signup" data-variant="primary" onClick={(e) => go(e, "/signup")}>
                                회원가입
                            </AuthLink>
                        </RightArea>
                    )}

                    {/* 모바일 메뉴 버튼 */}
                    <MobileBtn
                        aria-controls="mobile-menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <SrOnly>모바일 메뉴 열기</SrOnly>
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </MobileBtn>
                </Bar>

                {/* 모바일 패널 */}
                {mobileOpen && (
                    <MobilePanel id="mobile-menu">
                        <nav>
                            {/* [ADDED] 모바일 상단에 로그인 상태에 따른 액션 */}
                            {userInfo ? (
                                <React.Fragment>
                                    <MobileItem as="div" style={{ fontWeight: 700, cursor: "default" }}>
                                        {displayName}님
                                    </MobileItem>
                                    {isAdmin && (
                                        <MobileItem href="/admin" onClick={(e) => go(e, "/admin")}>
                                            관리자 페이지
                                        </MobileItem>
                                    )}
                                    <MobileItem as="button" onClick={onLogout} style={{ textAlign: "left" }}>
                                        로그아웃
                                    </MobileItem>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <MobileItem href="/login" onClick={(e) => go(e, "/login")}>
                                        로그인
                                    </MobileItem>
                                    <MobileItem href="/signup" onClick={(e) => go(e, "/signup")}>
                                        회원가입
                                    </MobileItem>
                                </React.Fragment>
                            )}

                            <MobileItem
                                href="/counsel"
                                onClick={(e) => go(e, "/counsel")}
                                style={{ fontWeight: 700, color: "var(--color-primary)", background: "rgba(37,99,235,0.1)" }}
                            >
                                상담 신청
                            </MobileItem>

                            {items.map((item) => (
                                <React.Fragment key={item.label}>
                                    <MobileItem href={item.href} onClick={(e) => go(e, item.href)}>
                                        {item.label}
                                    </MobileItem>
                                    {item.children?.map((child) => (
                                        <MobileItem
                                            key={child.label}
                                            href={child.href}
                                            onClick={(e) => go(e, child.href)}
                                            style={{ paddingLeft: 28, fontSize: 14 }}
                                        >
                                            └ {child.label}
                                        </MobileItem>
                                    ))}
                                </React.Fragment>
                            ))}
                        </nav>
                    </MobilePanel>
                )}
            </Inner>
        </HeaderWrap>
    );
}
