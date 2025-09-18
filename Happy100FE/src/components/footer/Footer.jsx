// FILE: src/components/footer/footer.jsx
// LIB: @emotion/react + @emotion/styled
// DESC: 행복백세 푸터 컴포넌트 (반응형, Emotion)

import React from 'react';
import {
    FooterWrap,
    Container,
    LogoStack,
    LogoMark,
    Brand,
    SocialRow,
    IconLink,
    Info,
    SrOnly,
} from './style';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Footer({
    links = {
        instagram: '#',
        youtube: '#',
        naver: '#', // 네이버 메인 or 네이버 포스트
        blog: '#',
        band: 'https://naver.com',
    },
    className,
}) {
    const nav = useNavigate();
    return (
        <FooterWrap className={className}>
            <Container>
                <LogoStack>
                    <LogoMark aria-hidden="true">
                        <svg viewBox="0 0 64 64" width="72" height="72">
                            <path d="M32 58S6 42 6 24c0-6.6 5.4-12 12-12 5.1 0 9.5 3 11.4 7.3C31 15 35.4 12 40 12c6.6 0 12 5.4 12 12 0 18-20 30-20 34z" fill="#fff" opacity=".9" />
                            <g stroke="#6b4f3b" strokeWidth="2" strokeLinecap="round" opacity=".35">
                                <path d="M20 29l9 9" />
                                <path d="M26 25l8 8" />
                                <path d="M39 26l-9 9" />
                            </g>
                        </svg>
                    </LogoMark>
                    <Brand>행복백세</Brand>
                </LogoStack>

                <SocialRow aria-label="소셜 미디어">
                    <IconLink href={links.band} target="_blank" rel="noopener noreferrer">
                        <SrOnly>Naver Band</SrOnly>
                        <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true" >
                            <rect x="4" y="4" width="40" height="40" rx="10" fill="#21c531" />
                            <circle cx="24" cy="24" r="11" fill="#fff" />
                            <path d="M24 16a8 8 0 100 16 8 8 0 000-16zm0 4a4 4 0 110 8 4 4 0 010-8z" fill="#21c531" />
                        </svg>
                    </IconLink>
                </SocialRow>

                <Info>
                    <span>상호명 : 서원교육협동조합</span>
                    <span>대표자 : 신수정</span>
                    <span>주소 : 경상남도 김해시 구산로5번길 3-26, 101호(구산동)</span>
                    <span>전화번호 : 055-329-5051</span>
                    <span>사업자등록번호 : 571-88-03341</span>
                </Info>
            </Container>
        </FooterWrap>
    );
}
