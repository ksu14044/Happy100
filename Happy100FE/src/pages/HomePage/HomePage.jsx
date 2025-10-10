import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  HERO_CONTENT,
  TABLE_OF_CONTENTS,
  AGING_INSIGHTS,
  OUTLOOK_SUMMARY,
  FACILITY_STATUS_SLIDE,
  WELFARE_STATUS_SLIDE,
  FACILITY_COMPARISON_SLIDE,
} from '../../data/presentationContent.js';

const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(64px, 10vw, 120px);
  padding-bottom: clamp(96px, 12vw, 160px);
`;

const HeroSection = styled.section`
  position: relative;
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(32px, 6vw, 48px);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  padding: clamp(48px, 6vw, 72px);
  border-radius: clamp(32px, 6vw, 44px);
  background: linear-gradient(120deg, rgba(96, 165, 250, 0.24), rgba(167, 139, 250, 0.18) 45%, rgba(255, 255, 255, 0.92));
  box-shadow: 0 32px 64px rgba(15, 23, 42, 0.12);
  overflow: hidden;
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 3vw, 28px);
`;

const HeroTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.16);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 14px;
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 52px);
  letter-spacing: -0.03em;
  color: #0f172a;
  line-height: 1.18;
`;

const HeroDesc = styled.p`
  margin: 0;
  color: #1f2937;
  font-size: clamp(16px, 2vw, 18px);
  line-height: 1.8;
`;

const HeroButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const PrimaryButton = styled.button`
  padding: 14px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #7c3aed);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 18px 38px rgba(99, 102, 241, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 24px 44px rgba(99, 102, 241, 0.3);
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 26px;
  border-radius: 999px;
  border: 1px solid rgba(37, 99, 235, 0.35);
  background: rgba(255, 255, 255, 0.86);
  color: #2563eb;
  font-weight: 700;
  font-size: 16px;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.12);
    transform: translateY(-2px);
  }
`;

const KeyTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const KeyTag = styled.span`
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.08);
  color: #1f2937;
  font-weight: 600;
  font-size: 13px;
`;

const HeroVisual = styled.div`
  position: relative;
  border-radius: clamp(28px, 6vw, 40px);
  overflow: hidden;
  min-height: 320px;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Section = styled.section`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(24px, 5vw, 36px);
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 720px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: -0.02em;
`;

const SectionLead = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.8;
`;

const ContentGrid = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 28px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const ContentCard = styled.article`
  display: grid;
  gap: 12px;
  padding: clamp(22px, 4vw, 30px);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 48px rgba(15, 23, 42, 0.12);
  }
`;

const ContentTitle = styled.h3`
  font-size: 20px;
  color: #1e3a8a;
`;

const ContentSummary = styled.p`
  margin: 0;
  color: #334155;
  line-height: 1.7;
`;

const ContentButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  border-radius: 999px;
  border: none;
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
  font-weight: 600;
  font-size: 14px;
  width: fit-content;

  &:hover {
    background: rgba(37, 99, 235, 0.18);
  }
`;

const BulletList = styled.ul`
  margin: 0;
  padding-left: 0;
  display: grid;
  gap: 8px;
`;

const BulletItem = styled.li`
  position: relative;
  padding-left: 18px;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 10px;
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: #2563eb;
  }
`;

const AgingGrid = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 28px);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const AgingCard = styled.article`
  display: grid;
  gap: 10px;
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: rgba(96, 165, 250, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.18);
  color: #0f172a;
`;

const SurfaceSection = styled('section')`
  width: 100%;
  padding: clamp(64px, 10vw, 110px) 0;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
  background: linear-gradient(180deg, rgba(224, 242, 254, 0.35), transparent 70%);

  &[data-variant='welfare'] {
    background: linear-gradient(180deg, rgba(219, 234, 254, 0.35), rgba(238, 242, 255, 0.6) 65%);
  }

  &[data-variant='aging'] {
    background: linear-gradient(180deg, rgba(221, 214, 254, 0.4), rgba(240, 249, 255, 0.55) 70%);
  }

  &[data-variant='comparison'] {
    background: linear-gradient(180deg, rgba(191, 219, 254, 0.4), rgba(221, 214, 254, 0.4) 65%, rgba(240, 249, 255, 0.45) 85%);
  }
`;

const SurfaceInner = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(24px, 5vw, 36px);
`;

const SlideFigure = styled.figure`
  display: grid;
  gap: clamp(16px, 3vw, 24px);
  margin: 0;
  border-radius: clamp(24px, 5vw, 36px);
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 26px 48px rgba(15, 23, 42, 0.12);
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const SlideCaption = styled.figcaption`
  padding: clamp(18px, 4vw, 26px);
  color: #1f2937;
  line-height: 1.7;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.92), rgba(226, 232, 240, 0.7));
`;

const OutlookPanel = styled.div`
  display: grid;
  gap: 18px;
  padding: clamp(28px, 6vw, 40px);
  border-radius: clamp(28px, 6vw, 40px);
  background: linear-gradient(135deg, rgba(167, 139, 250, 0.28), rgba(59, 130, 246, 0.24));
  border: 1px solid rgba(14, 116, 144, 0.18);
  color: #0f172a;
`;

const OutlookList = styled.ul`
  margin: 0;
  padding-left: 0;
  display: grid;
  gap: 12px;
`;

const OutlookItem = styled.li`
  position: relative;
  padding-left: 20px;
  font-size: 16px;
  line-height: 1.7;

  &::before {
    content: '✔';
    position: absolute;
    left: 0;
    top: 0;
    color: #1d4ed8;
    font-weight: 700;
  }
`;

const SummaryNote = styled.p`
  margin: 0;
  color: #1f2937;
  line-height: 1.7;
`;

export default function HomePage() {
  const navigate = useNavigate();
  const facilitySectionRef = useRef(null);
  const welfareSectionRef = useRef(null);
  const agingSectionRef = useRef(null);

  const handleNavigate = (href) => {
    if (!href) return;
    if (href.startsWith('#')) {
      let targetRef = null;
      if (href === '#facility-status') targetRef = facilitySectionRef;
      else if (href === '#welfare-status') targetRef = welfareSectionRef;
      else if (href === '#aging-insights') targetRef = agingSectionRef;

      if (targetRef?.current) {
        const { top } = targetRef.current.getBoundingClientRect();
        const offset = window.scrollY + top - 96;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
      return;
    }
    navigate(href);
  };

  return (
    <PageWrap>
      <HeroSection>
        <HeroContent>
          <HeroTag>행복백세</HeroTag>
          <HeroTitle>행복하게 백세까지,</HeroTitle>
          <HeroTitle>모두가 웃는 첫걸음</HeroTitle>
          <HeroDesc>{HERO_CONTENT.description}</HeroDesc>
          <HeroButtons>
            <PrimaryButton type="button" onClick={() => handleNavigate(HERO_CONTENT.ctaPrimary.href)}>
              {HERO_CONTENT.ctaPrimary.label}
            </PrimaryButton>
            <SecondaryButton type="button" onClick={() => handleNavigate(HERO_CONTENT.ctaSecondary.href)}>
              {HERO_CONTENT.ctaSecondary.label}
            </SecondaryButton>
          </HeroButtons>
          <KeyTagList>
            {HERO_CONTENT.keywords.map((keyword) => (
              <KeyTag key={keyword}>{keyword}</KeyTag>
            ))}
          </KeyTagList>
        </HeroContent>
        <HeroVisual>
          <HeroImage src={HERO_CONTENT.image} alt="행복백세 프로그램에 참여하는 시니어" loading="lazy" />
        </HeroVisual>
      </HeroSection>

      <Section>
        <SectionHeader>
          <SectionTitle>행복백세 핵심 가치</SectionTitle>
          <SectionLead>증가하는 고령 인구가 행복한 노후를 보낼 수 있도록 지원합니다.</SectionLead>
        </SectionHeader>
        <ContentGrid>
          {TABLE_OF_CONTENTS.map((item) => (
            <ContentCard key={item.title}>
              <ContentTitle>{item.title}</ContentTitle>
              <ContentSummary>{item.summary}</ContentSummary>
              <ContentButton type="button" onClick={() => handleNavigate(item.anchor)}>
                자세히 보기
              </ContentButton>
            </ContentCard>
          ))}
        </ContentGrid>
      </Section>

      <SurfaceSection ref={facilitySectionRef} id="facility-status" data-variant="facility">
        <SurfaceInner>
          <SectionHeader>
            <SectionTitle>노인 관련 시설 현황</SectionTitle>
            <SectionLead>노인 주거·이용 시설의 이용자 변화와 현장 분위기를 한 장의 슬라이드로 확인하세요.</SectionLead>
          </SectionHeader>
          <SlideFigure>
            <SlideImage src={FACILITY_STATUS_SLIDE.image} alt="노인 관련 시설 현황을 정리한 프레젠테이션 슬라이드" loading="lazy" />
            <SlideCaption>{FACILITY_STATUS_SLIDE.caption}</SlideCaption>
          </SlideFigure>
        </SurfaceInner>
      </SurfaceSection>

      <SurfaceSection ref={welfareSectionRef} id="welfare-status" data-variant="welfare">
        <SurfaceInner>
          <SectionHeader>
            <SectionTitle>노인복지 시설 현황</SectionTitle>
            <SectionLead>전국 노인복지시설 통계와 이용자 증가 추세를 시각화한 슬라이드입니다.</SectionLead>
          </SectionHeader>
          <SlideFigure>
            <SlideImage src={WELFARE_STATUS_SLIDE.image} alt="노인복지 시설 현황을 보여주는 프레젠테이션 슬라이드" loading="lazy" />
            <SlideCaption>{WELFARE_STATUS_SLIDE.caption}</SlideCaption>
          </SlideFigure>
        </SurfaceInner>
      </SurfaceSection>

      <SurfaceSection data-variant="comparison">
        <SurfaceInner>
          <SectionHeader>
            <SectionTitle>선진국 운영과 한국 운영 비교</SectionTitle>
            <SectionLead>미국과 한국 주간보호센터의 운영 방식을 비교한 자료를 그대로 제공합니다.</SectionLead>
          </SectionHeader>
          <SlideFigure>
            <SlideImage src={FACILITY_COMPARISON_SLIDE.image} alt="미국과 한국 주간보호센터 운영 비교 슬라이드" loading="lazy" />
            <SlideCaption>{FACILITY_COMPARISON_SLIDE.caption}</SlideCaption>
          </SlideFigure>
        </SurfaceInner>
      </SurfaceSection>

      <SurfaceSection ref={agingSectionRef} id="aging-insights" data-variant="aging">
        <SurfaceInner>
          <SectionHeader>
            <SectionTitle>{AGING_INSIGHTS.title}</SectionTitle>
            <SectionLead>{AGING_INSIGHTS.description}</SectionLead>
          </SectionHeader>
          <AgingGrid>
            {AGING_INSIGHTS.highlights.map((highlight) => (
              <AgingCard key={highlight.title}>
                <ContentTitle>{highlight.title}</ContentTitle>
                <BulletList>
                  {highlight.details.map((detail) => (
                    <BulletItem key={detail}>{detail}</BulletItem>
                  ))}
                </BulletList>
              </AgingCard>
            ))}
          </AgingGrid>
        </SurfaceInner>
      </SurfaceSection>

      <Section>
        <SectionHeader>
          <SectionTitle>{OUTLOOK_SUMMARY.title}</SectionTitle>
          <SectionLead>
            시니어 교육 시장의 변화는 곧 지역사회와 가족 모두의 삶을 바꾸는 계기가 됩니다.
          </SectionLead>
        </SectionHeader>
        <OutlookPanel>
          <SummaryNote>
            행복백세는 레퍼런스 자료의 미래 전망을 토대로 교육·돌봄·문화가 융합된 플랫폼을 구축하고 있습니다.
          </SummaryNote>
          <OutlookList>
            {OUTLOOK_SUMMARY.points.map((point) => (
              <OutlookItem key={point}>{point}</OutlookItem>
            ))}
          </OutlookList>
        </OutlookPanel>
      </Section>
    </PageWrap>
  );
}
