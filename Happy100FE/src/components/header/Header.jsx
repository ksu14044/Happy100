// FILE: src/components/header/header.jsx
import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import {
    HeaderWrap, Inner, Bar, LogoButton, Brand, Tagline, LogoImg,
    DesktopNav, NavList, NavLink, MobileBtn, MobilePanel, MobileItem, SrOnly, LogoSvg, NavItem,
    Dropdown,
    DropdownLink,
} from './style';

export default function Header(props) {
    const {
        navItems, currentPath, onNavigate, onLogoClick,
        sticky = true, showTagline = true, logoSrc, className,
    } = props;
    const items = useMemo(
        () =>
            navItems ?? [
                {
                    label: '개요',
                    href: '/overview',
                    children: [
                        { label: '회사소개', href: '/overview/company' },
                        { label: '공지사항', href: '/overview/news' },
                        { label: '오시는길', href: '/overview/map' },
                    ],
                },
                {
                    label: '자격증반',
                    href: '/cert',
                    children: [
                        { label: '자격증반 모집', href: '/cert/recruit' },
                        { label: '자격증반 신청', href: '/cert/apply' },
                    ],
                },
                { label: '지사모집', href: '/franchise' },
                { label: '쇼핑몰', href: '/shop' },
                { label: 'Q&A', href: '/qna' },
            ],
        [navItems]
    );
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);       // 데스크톱 드롭다운 index
    const openTimer = useRef(null);
    const closeTimer = useRef(null);

    const clearTimers = () => {
        if (openTimer.current) clearTimeout(openTimer.current);
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };

    const scheduleOpen = (idx) => {
        clearTimers();
        openTimer.current = setTimeout(() => setOpenMenu(idx), 80);   // 열림 지연
    };
    const scheduleClose = () => {
        clearTimers();
        closeTimer.current = setTimeout(() => setOpenMenu(null), 220); // 닫힘 지연(여유)
    };

    // ⬇︎ 로고/브랜드 클릭 시 홈으로 이동
    const handleHome = useCallback(
        (e) => {
            if (onNavigate) {
                e.preventDefault();
                onNavigate('/');
                setOpen(false);
            } else if (onLogoClick) {
                // 추가 훅 사용 원할 때
                onLogoClick(e);
            }
        },
        [onNavigate, onLogoClick]
    );

    const handleNav = useCallback((e, href) => {
        if (onNavigate) {
            e.preventDefault();
            onNavigate(href);
            setOpen(false);
            setOpenMenu(null);
        }
    }, [onNavigate]);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && (setOpen(false), setOpenMenu(null));
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            clearTimers();
        };
    }, []);


    return (
        <HeaderWrap sticky={sticky} className={className}>
            <Inner>
                <Bar>
                    {/* ⬇︎ 버튼 스타일을 유지한 채 앵커로 렌더링 */}
                    <LogoButton as="a" href="/" onClick={handleHome} aria-label="행복백세 홈">
                        {logoSrc ? (
                            <LogoImg src={logoSrc} alt="행복백세 로고" />
                        ) : (
                            <LogoSvg viewBox="0 0 64 64" role="img" aria-label="행복백세 로고">
                                <defs>
                                    <linearGradient id="g" x1="0" x2="1">
                                        <stop offset="0%" stopColor="#21c55d" />
                                        <stop offset="100%" stopColor="#10b981" />
                                    </linearGradient>
                                </defs>
                                <path d="M32 58S6 42 6 24c0-6.6 5.4-12 12-12 5.1 0 9.5 3 11.4 7.3C31 15 35.4 12 40 12c6.6 0 12 5.4 12 12 0 18-20 30-20 34z" fill="#fff" stroke="#111827" strokeOpacity=".12" strokeWidth="2" />
                                <path d="M32 58S6 42 6 24c0-6.6 5.4-12 12-12 5.1 0 9.5 3 11.4 7.3.9 2 .6 6.7-1.2 8.5l-5.6 5.7c-2 2-2 5.3 0 7.3l8.3 8.3L32 58z" fill="url(#g)" />
                                <path d="M32 58s20-12 20-34c0-6.6-5.4-12-12-12-4.6 0-9 3-10.6 7.3-.8 2-.5 6.6 1.2 8.3l5.2 5.3c1.9 1.9 1.9 5 0 6.9l-7.8 7.8L32 58z" fill="#e5e7eb" />
                                <g stroke="#374151" strokeWidth="2" strokeLinecap="round">
                                    <path d="M20 29l9 9" />
                                    <path d="M26 25l8 8" />
                                    <path d="M39 26l-9 9" />
                                </g>
                                <g>
                                    <circle cx="14" cy="40" r="2.4" fill="#ef4444" />
                                    <circle cx="19" cy="45" r="2.4" fill="#3b82f6" />
                                    <circle cx="24" cy="50" r="2.4" fill="#f59e0b" />
                                </g>
                            </LogoSvg>
                        )}
                        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                            <Brand>행복백세</Brand>
                            <Tagline show={showTagline}>행복하게 백세까지</Tagline>
                        </span>
                    </LogoButton>

                    <DesktopNav aria-label="주요 메뉴">
                        <NavList>
                            {items.map((item, idx) => {
                                const isActive = currentPath && item.href && currentPath.startsWith(item.href);
                                const hasChildren = Array.isArray(item.children) && item.children.length > 0;
                                const isOpen = openMenu === idx;

                                return (
                                    <NavItem
                                        key={item.label}
                                        onMouseEnter={() => scheduleOpen(idx)}
                                        onMouseLeave={scheduleClose}
                                        onFocus={() => scheduleOpen(idx)}      // 키보드 접근
                                        onBlur={scheduleClose}
                                    >
                                        <NavLink
                                            href={item.href}
                                            onClick={(e) => handleNav(e, item.href)}
                                            active={isActive}
                                            aria-haspopup={hasChildren || undefined}
                                            aria-expanded={hasChildren ? isOpen : undefined}
                                        >
                                            {item.label}
                                        </NavLink>

                                        {hasChildren && (
                                            <Dropdown
                                                role="menu"
                                                aria-label={`${item.label} 하위 메뉴`}
                                                open={isOpen}
                                                onMouseEnter={() => scheduleOpen(idx)} // 패널 위에서도 열림 유지
                                                onMouseLeave={scheduleClose}
                                            >
                                                {item.children.map((child) => (
                                                    <li key={child.label}>
                                                        <DropdownLink
                                                            href={child.href}
                                                            onClick={(e) => handleNav(e, child.href)}
                                                            role="menuitem"
                                                        >
                                                            {child.label}
                                                        </DropdownLink>
                                                    </li>
                                                ))}
                                            </Dropdown>
                                        )}
                                    </NavItem>
                                );
                            })}
                        </NavList>
                    </DesktopNav>

                    <MobileBtn aria-controls="mobile-menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                        <SrOnly>모바일 메뉴 열기</SrOnly>
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </MobileBtn>
                </Bar>

                {open && (
                    <MobilePanel id="mobile-menu">
                        <nav>
                            {items.map((item) => (
                                <React.Fragment key={item.label}>
                                    <MobileItem href={item.href} onClick={(e) => handleNav(e, item.href)}>
                                        {item.label}
                                    </MobileItem>
                                    {item.children?.map((child) => (
                                        <MobileItem
                                            key={child.label}
                                            href={child.href}
                                            onClick={(e) => handleNav(e, child.href)}
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
