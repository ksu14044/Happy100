import React, { useMemo, useState, useEffect, useRef, useCallback } from "react";
import {
    HeaderWrap, Inner, Bar, LogoButton, Brand, Tagline, LogoImg,
    DesktopNav, NavList, NavItem, NavLink,
    Dropdown, DropdownLink,
    MobileBtn, MobilePanel, MobileItem, SrOnly, LogoSvg,
    RightArea, AuthLink,
    // [ADDED IMPORT] 로그인 사용자 영역/버튼 스타일
    UserArea, UserName, LogoutBtn,
} from "./style";
// [ADDED] 토큰 저장소에서 로그인 상태 읽기/지우기
import { tokenStorage } from "../../libs/authStorage";

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
                    label: "개요",
                    href: "/overview",
                    children: [
                        { label: "회사소개", href: "/overview/company" },
                        { label: "공지사항", href: "/overview/news" },
                        { label: "오시는길", href: "/overview/map" },
                    ],
                },
                {
                    label: "자격증반",
                    href: "/cert/recruit",
                },
                { label: "지사모집", href: "/franchise" },
                { label: "쇼핑몰", href: "/shop/list" },
                { label: "상담신청", href: "/counsel" },
            ],
        [navItems]
    );

    const [mobileOpen, setMobileOpen] = useState(false);
    const [openIdx, setOpenIdx] = useState(null); // 드롭다운 열린 인덱스
    const navRef = useRef(null);

    // [CHANGED] 초기 로그인 상태를 load()로 반영
    const [auth, setAuth] = useState(() => tokenStorage.load());
    // [ADDED] 다른 탭 변경/로그인 완료 후 헤더 갱신
    useEffect(() => {
        const onStorage = (e) => {
            if (e.key === "auth_token") setAuth(tokenStorage.load());
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);
    useEffect(() => {
        const unsub = tokenStorage.subscribe(setAuth);
        // cross-tab 반영: storage 이벤트도 유지
        const onStorage = (e) => {
            if (e.key === "auth_token") setAuth(tokenStorage.load());
        };
        window.addEventListener("storage", onStorage);
        return () => {
            unsub();
            window.removeEventListener("storage", onStorage);
        };
    }, []);

    // [ADDED] 표시용 이름 계산
    const displayName =
        auth?.user || "회원";

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
    const onLogout = useCallback(() => {
        tokenStorage.clear(); // ← 구독자 알림으로 헤더 즉시 갱신
        if (onNavigate) onNavigate("/");
    }, [onNavigate]);

    const [logoFailed, setLogoFailed] = useState(false);
    const resolvedLogoSrc = logoSrc ?? import.meta.env.VITE_BRAND_LOGO_URL ?? "/assets/happy100-logo.jpg";
    const showImageLogo = resolvedLogoSrc && !logoFailed;

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
                            <LogoSvg aria-hidden />
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
                    {auth?.accessToken ? (
                        // [ADDED] 로그인 상태 UI
                        <UserArea>
                            <UserName>{displayName}님</UserName>
                            <LogoutBtn type="button" onClick={onLogout}>
                                로그아웃
                            </LogoutBtn>
                        </UserArea>
                    ) : (
                        // 기존: 로그인/회원가입
                        <RightArea>
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
                            {auth?.accessToken ? (
                                <React.Fragment>
                                    <MobileItem as="div" style={{ fontWeight: 700, cursor: "default" }}>
                                        {displayName}님
                                    </MobileItem>
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
