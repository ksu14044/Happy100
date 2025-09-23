// FILE: src/components/footer/footer.jsx
// LIB: @emotion/react + @emotion/styled
// DESC: 행복백세 푸터 컴포넌트 (반응형, Emotion)

import React, { useState, useEffect } from 'react';
import {
    FooterWrap,
    Container,
    BrandColumn,
    LogoMark,
    LogoImage,
    Brand,
    Slogan,
    Intro,
    Column,
    ColumnTitle,
    InfoList,
    InfoItem,
    QuickList,
    QuickLink,
    SocialRow,
    IconLink,
    BottomBar,
    Copy,
    Keyword,
    SrOnly,
} from './style';
import { useNavigate } from 'react-router-dom';

export default function Footer({
    links = {
        instagram: '#',
        youtube: '#',
        naver: '#', // 네이버 메인 or 네이버 포스트
        blog: '#',
        band: 'https://naver.com',
    },
    quickLinks = [
        { label: '브랜드 소개', href: '/overview' },
        { label: '프로그램 안내', href: '/program' },
        { label: '공지사항', href: '/overview/news' },
        { label: '지사 모집', href: '/franchise' },
        { label: '상담 신청', href: '/counsel' },
    ],
    className,
}) {
    const nav = useNavigate();
    const logoUrl = import.meta.env.VITE_BRAND_LOGO_URL ?? '/assets/happy100-logo.jpg';
    const [logoError, setLogoError] = useState(false);

    useEffect(() => {
        setLogoError(false);
    }, [logoUrl]);

    const isValidLink = (url) => typeof url === 'string' && url.trim() && url.trim() !== '#';

    const onInternalLink = (event, href) => {
        if (!href) return;
        if (/^https?:/i.test(href)) return;
        event.preventDefault();
        nav(href);
    };

    const year = new Date().getFullYear();

    return (
        <FooterWrap className={className}>
            <Container>
                <BrandColumn>
                    <LogoMark>
                        {logoUrl && !logoError ? (
                            <LogoImage
                                src={logoUrl}
                                alt="행복백세 로고"
                                loading="lazy"
                                onError={() => setLogoError(true)}
                            />
                        ) : (
                            <svg viewBox="0 0 80 80" width="80" height="80" aria-hidden="true">
                                <rect x="0" y="0" width="80" height="80" rx="24" fill="#2563eb" opacity="0.15" />
                                <path
                                    d="M40 60c-9-4.8-22-15-22-26 0-6.6 5.4-12 12-12 4.2 0 7.9 2.1 10 5.3 2.1-3.2 5.8-5.3 10-5.3 6.6 0 12 5.4 12 12 0 12-13 21-22 26z"
                                    fill="#2563eb"
                                />
                            </svg>
                        )}
                    </LogoMark>
                    <div>
                        <Brand>행복백세</Brand>
                        <Slogan>행복이 백세까지</Slogan>
                    </div>
                    <Intro>
                        시니어의 배움과 활동, 세대가 함께하는 행복 교육 운동을 통해 건강한 백세 시대를 만들어 갑니다.
                    </Intro>

                    <SocialRow aria-label="소셜 미디어">
                        <IconLink href={links.band} target="_blank" rel="noopener noreferrer">
                            <SrOnly>네이버 밴드</SrOnly>
                            <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
                                <rect x="4" y="4" width="40" height="40" rx="10" fill="#21c531" />
                                <circle cx="24" cy="24" r="11" fill="#fff" />
                                <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 4a4 4 0 110 8 4 4 0 010-8z" fill="#21c531" />
                            </svg>
                        </IconLink>
                        {isValidLink(links.youtube) && (
                            <IconLink href={links.youtube} target="_blank" rel="noopener noreferrer">
                                <SrOnly>유튜브</SrOnly>
                                <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
                                    <rect x="4" y="4" width="40" height="40" rx="10" fill="#ff0000" />
                                    <path d="M21 18l10 6-10 6z" fill="#fff" />
                                </svg>
                            </IconLink>
                        )}
                        {isValidLink(links.instagram) && (
                            <IconLink href={links.instagram} target="_blank" rel="noopener noreferrer">
                                <SrOnly>인스타그램</SrOnly>
                                <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
                                    <linearGradient id="ig" x1="4" x2="44" y1="44" y2="4" gradientUnits="userSpaceOnUse">
                                        <stop offset="0" stopColor="#fd5" />
                                        <stop offset="0.5" stopColor="#ff543e" />
                                        <stop offset="1" stopColor="#c837ab" />
                                    </linearGradient>
                                    <rect x="4" y="4" width="40" height="40" rx="12" fill="url(#ig)" />
                                    <circle cx="24" cy="24" r="9" fill="none" stroke="#fff" strokeWidth="4" />
                                    <circle cx="33" cy="15" r="2" fill="#fff" />
                                </svg>
                            </IconLink>
                        )}
                    </SocialRow>
                </BrandColumn>

                <Column>
                    <ColumnTitle>문의 및 운영정보</ColumnTitle>
                    <InfoList>
                        <InfoItem>주관·운영 : 서원교육협동조합</InfoItem>
                        <InfoItem>대표자 : 신수정</InfoItem>
                        <InfoItem>주소 : 경상남도 김해시 구산로5번길 3-26, 101호(구산동)</InfoItem>
                        <InfoItem>전화 : 055-329-5051</InfoItem>
                        <InfoItem>사업자등록번호 : 571-88-03341</InfoItem>
                    </InfoList>
                </Column>

                <Column>
                    <ColumnTitle>바로가기</ColumnTitle>
                    <QuickList>
                        {quickLinks.map((item) => (
                            <QuickLink
                                key={item.label}
                                href={item.href}
                                onClick={(e) => onInternalLink(e, item.href)}
                            >
                                {item.label}
                            </QuickLink>
                        ))}
                    </QuickList>
                </Column>
            </Container>
            <BottomBar>
                <Copy>© {year} 서원교육협동조합. ALL RIGHTS RESERVED.</Copy>
                <Keyword>HAPPY 100 YEARS</Keyword>
            </BottomBar>
        </FooterWrap>
    );
}
