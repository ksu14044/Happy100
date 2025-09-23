import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  BRAND_KEYWORDS,
  KEY_PHILOSOPHY,
  PROGRAM_FLOW,
  CURRICULUM_GUIDE,
  EXPECTED_IMPACT,
  CONTACT_INFO,
} from '../../data/brandContent.js';
import { mediaQuery } from '../../styles/responsive.js';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(68px, 10vw, 128px);
  padding-bottom: clamp(80px, 12vw, 160px);
`;

const HeroSection = styled.section`
  position: relative;
  padding: clamp(88px, 12vw, 140px) 0 clamp(64px, 10vw, 120px);
  background: radial-gradient(circle at 15% 20%, rgba(59, 130, 246, 0.25), transparent 55%),
    radial-gradient(circle at 85% 15%, rgba(56, 189, 248, 0.2), transparent 50%),
    linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(59, 130, 246, 0));
`;

const SectionInner = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
`;

const HeroGrid = styled.div`
  display: grid;
  align-items: center;
  gap: clamp(32px, 5vw, 48px);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 3vw, 28px);
`;

const HeroTitle = styled.h1`
  font-size: clamp(32px, 5vw, 50px);
  letter-spacing: -0.03em;
  line-height: 1.15;
  color: #0f172a;
`;

const HeroHighlight = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 10px 18px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-weight: 600;
  width: fit-content;
`;

const HeroText = styled.p`
  font-size: clamp(16px, 2vw, 18px);
  color: #475569;
  line-height: 1.8;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

const PrimaryButton = styled.button`
  padding: 14px 28px;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.2);
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 38px rgba(37, 99, 235, 0.26);
  }
`;

const SecondaryButton = styled.button`
  padding: 14px 26px;
  border-radius: 999px;
  border: 1px solid rgba(37, 99, 235, 0.3);
  background: rgba(255, 255, 255, 0.8);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 16px;
  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: rgba(37, 99, 235, 0.1);
    transform: translateY(-2px);
  }
`;

const HeroVisual = styled.div`
  position: relative;
  padding: clamp(24px, 4vw, 40px);
  border-radius: clamp(28px, 6vw, 38px);
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.22);
  overflow: hidden;
`;

const HeroVisualInner = styled.div`
  position: relative;
  display: grid;
  gap: 18px;
`;

const HeroBadgeGrid = styled.div`
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
`;

const HeroBadge = styled.div`
  padding: 16px;
  border-radius: 20px;
  background: rgba(37, 99, 235, 0.08);
  color: #1e3a8a;
  font-weight: 600;
  text-align: center;
  line-height: 1.4;
`;

const Section = styled.section`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 640px;
`;

const SectionTitle = styled.h2`
  font-size: clamp(26px, 4vw, 38px);
  letter-spacing: -0.02em;
`;

const SectionDescription = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.8;
`;

const CardGrid = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 28px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const ActivityCard = styled.div`
  position: relative;
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  gap: 14px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 34px 56px rgba(15, 23, 42, 0.12);
  }
`;

const ActivityTitle = styled.h3`
  font-size: 20px;
  color: #1e293b;
`;

const ActivitySubtitle = styled.span`
  font-weight: 600;
  color: #2563eb;
`;

const FlowTrack = styled.div`
  position: relative;
  display: grid;
  gap: clamp(18px, 3vw, 26px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const FlowStep = styled.div`
  position: relative;
  padding: 26px;
  border-radius: 24px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.18);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FlowBadge = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  font-weight: 700;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.15);
`;

const CurriculumGrid = styled.div`
  display: grid;
  gap: 18px;
`;

const CurriculumCard = styled.div`
  display: grid;
  gap: 14px;
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
`;

const CurriculumMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  font-size: 14px;
  color: #2563eb;
  font-weight: 600;
`;

const ImpactGrid = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 28px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const ImpactCard = styled.div`
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.88);
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.18);
`;

const ImpactTitle = styled.h3`
  font-size: 20px;
  color: #93c5fd;
`;

const ImpactList = styled.ul`
  display: grid;
  gap: 10px;
  padding-left: 0;
`;

const ImpactBullet = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;

  &::before {
    content: '•';
    color: #38bdf8;
    font-size: 22px;
    line-height: 1;
  }
`;

const ContactBanner = styled.section`
  width: min(1180px, 92vw);
  margin: 0 auto;
  padding: clamp(36px, 6vw, 54px);
  border-radius: clamp(28px, 6vw, 38px);
  background: linear-gradient(135deg, #1d4ed8, #2563eb 45%, #38bdf8);
  color: #fff;
  display: grid;
  gap: clamp(24px, 4vw, 32px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  align-items: center;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.2);
`;

const ContactInfo = styled.div`
  display: grid;
  gap: 10px;
`;

const ContactTitle = styled.h3`
  font-size: clamp(24px, 4vw, 30px);
  color: #fff;
`;

const ContactRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 15px;
`;

const ContactButton = styled.button`
  justify-self: flex-start;
  padding: 14px 28px;
  border-radius: 999px;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  font-weight: 700;
  font-size: 16px;
  transition: background 0.18s ease, transform 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.24);
    transform: translateY(-2px);
  }
`;

const KeywordTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.15);
  color: rgba(15, 23, 42, 0.7);
  font-weight: 600;
  font-size: 13px;
`;

const ContactGrid = styled.div`
  display: grid;
  gap: 14px;
`;

const ResponsiveSpacer = styled.div`
  display: none;
  height: 1px;

  ${mediaQuery.mobile} {
    display: block;
  }
`;

export default function HomePage() {
  const navigate = useNavigate();

  const onNavigate = (href) => {
    navigate(href);
  };

  return (
    <Wrapper>
      <HeroSection>
        <SectionInner>
          <HeroGrid>
            <HeroContent>
              <HeroHighlight>행복교육운동</HeroHighlight>
              <HeroTitle>
                {BRAND_NAME}와 함께
                <br />
                {BRAND_SLOGAN}
              </HeroTitle>
              <HeroText>
                시니어 교육과 활동, 세대 융합과 문화예술을 잇는 행복백세의 통합 프로그램을 통해
                지속가능한 백세 시대를 설계해 보세요.
              </HeroText>
              <HeroActions>
                <PrimaryButton type="button" onClick={() => onNavigate('/counsel')}>
                  상담 신청하기
                </PrimaryButton>
                <SecondaryButton type="button" onClick={() => onNavigate('/program')}>
                  프로그램 살펴보기
                </SecondaryButton>
              </HeroActions>
            </HeroContent>

            <HeroVisual>
              <HeroVisualInner>
                <KeywordTag>{BRAND_KEYWORDS}</KeywordTag>
                <HeroBadgeGrid>
                  <HeroBadge>시니어 교육<br />맞춤 설계</HeroBadge>
                  <HeroBadge>세대 융합<br />공동체</HeroBadge>
                  <HeroBadge>문화·예술<br />현장 참여</HeroBadge>
                </HeroBadgeGrid>
              </HeroVisualInner>
            </HeroVisual>
          </HeroGrid>
        </SectionInner>
      </HeroSection>

      <Section>
        <SectionHeader>
          <SectionTitle>{KEY_PHILOSOPHY.title}</SectionTitle>
          <SectionDescription>{KEY_PHILOSOPHY.description}</SectionDescription>
        </SectionHeader>
        <CardGrid>
          {KEY_PHILOSOPHY.items.map((item) => (
            <ActivityCard key={item.title}>
              <ActivitySubtitle>{item.subtitle}</ActivitySubtitle>
              <ActivityTitle>{item.title}</ActivityTitle>
              <SectionDescription>{item.body}</SectionDescription>
            </ActivityCard>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{PROGRAM_FLOW.title}</SectionTitle>
          <SectionDescription>{PROGRAM_FLOW.description}</SectionDescription>
        </SectionHeader>
        <FlowTrack>
          {PROGRAM_FLOW.steps.map((step, index) => (
            <FlowStep key={step.title}>
              <FlowBadge>{String(index + 1).padStart(2, '0')}</FlowBadge>
              <ActivityTitle>{step.title}</ActivityTitle>
              <SectionDescription>{step.body}</SectionDescription>
            </FlowStep>
          ))}
        </FlowTrack>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{CURRICULUM_GUIDE.title}</SectionTitle>
          <SectionDescription>{CURRICULUM_GUIDE.description}</SectionDescription>
        </SectionHeader>
        <CurriculumGrid>
          {CURRICULUM_GUIDE.programs.map((program) => (
            <CurriculumCard key={program.name}>
              <ActivityTitle>{program.name}</ActivityTitle>
              <SectionDescription>{program.summary}</SectionDescription>
              <CurriculumMeta>
                <span>{program.duration}</span>
                <span>{program.target}</span>
              </CurriculumMeta>
            </CurriculumCard>
          ))}
        </CurriculumGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>기대 효과</SectionTitle>
          <SectionDescription>
            개인과 가족, 지역사회, 나아가 사회 전체가 함께 성장하도록 설계된 행복백세의 가치입니다.
          </SectionDescription>
        </SectionHeader>
        <ImpactGrid>
          {EXPECTED_IMPACT.map((impact) => (
            <ImpactCard key={impact.category}>
              <ImpactTitle>{impact.category}</ImpactTitle>
              <ImpactList>
                {impact.points.map((point) => (
                  <ImpactBullet key={point}>{point}</ImpactBullet>
                ))}
              </ImpactList>
            </ImpactCard>
          ))}
        </ImpactGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>상담 및 제휴 문의</SectionTitle>
          <SectionDescription>
            프로그램 참여, 지사 설립, 제휴 문의 등 무엇이든 편하게 문의해 주세요. 담당자가 빠르게 도와드리겠습니다.
          </SectionDescription>
        </SectionHeader>
        <ContactBanner>
          <ContactInfo>
            <ContactTitle>함께할 준비가 되셨나요?</ContactTitle>
            <ContactGrid>
              <ContactRow>
                <strong>주관·운영</strong>
                <span>{CONTACT_INFO.operator}</span>
              </ContactRow>
              <ContactRow>
                <strong>문의 전화</strong>
                <span>{CONTACT_INFO.phone}</span>
              </ContactRow>
              <ContactRow>
                <strong>주소</strong>
                <span>{CONTACT_INFO.address}</span>
              </ContactRow>
              {CONTACT_INFO.email ? (
                <ContactRow>
                  <strong>이메일</strong>
                  <span>{CONTACT_INFO.email}</span>
                </ContactRow>
              ) : null}
            </ContactGrid>
          </ContactInfo>
          <ResponsiveSpacer />
          <ContactButton type="button" onClick={() => onNavigate('/counsel')}>
            상담 신청 바로가기
          </ContactButton>
        </ContactBanner>
      </Section>
    </Wrapper>
  );
}
