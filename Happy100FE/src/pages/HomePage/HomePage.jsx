import React from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  BRAND_KEYWORDS,
  COOP_OVERVIEW,
  LICENSE_GUIDE,
  PARTNERSHIP_ACTIVITIES,
  SOCIAL_CHALLENGES,
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
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const Card = styled.div`
  position: relative;
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.08);
  border: 1px solid rgba(148, 163, 184, 0.2);
  display: flex;
  flex-direction: column;
  gap: 18px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 34px 56px rgba(15, 23, 42, 0.12);
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  color: #1e293b;
`;

const CardSummary = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.7;
`;

const BulletList = styled.ul`
  display: grid;
  gap: 10px;
  padding-left: 0;
`;

const BulletItem = styled.li`
  display: flex;
  gap: 10px;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '•';
    color: #2563eb;
    font-size: 20px;
    line-height: 1;
  }
`;

const CurriculumGrid = styled.div`
  display: grid;
  gap: clamp(18px, 3vw, 26px);
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`;

const CurriculumCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.08);
`;

const ChipList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-left: 0;
`;

const Chip = styled.li`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  font-size: 13px;
  font-weight: 600;
`;

const HighlightGrid = styled.div`
  display: grid;
  gap: clamp(18px, 3vw, 24px);
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
`;

const HighlightCard = styled.div`
  padding: clamp(24px, 4vw, 30px);
  border-radius: 22px;
  background: rgba(37, 99, 235, 0.08);
  border: 1px solid rgba(37, 99, 235, 0.18);
  color: #1f2937;
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 22px 40px rgba(15, 23, 42, 0.08);
`;

const HighlightTitle = styled.h3`
  font-size: 18px;
  color: #1d4ed8;
`;

const HighlightSummary = styled.p`
  margin: 0;
  color: #334155;
  line-height: 1.7;
`;

const IssueGrid = styled.div`
  display: grid;
  gap: clamp(18px, 3vw, 26px);
`;

const IssueCard = styled.div`
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(148, 163, 184, 0.24);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 14px;
`;

const IssueTitle = styled.h3`
  font-size: 18px;
  color: #1e293b;
`;

const IssueList = styled.ul`
  display: grid;
  gap: 10px;
  padding-left: 0;
`;

const IssueItem = styled.li`
  display: flex;
  gap: 10px;
  color: #1f2937;
  font-size: 15px;
  line-height: 1.6;

  &::before {
    content: '·';
    color: #2563eb;
    font-size: 24px;
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

const ContactGrid = styled.div`
  display: grid;
  gap: 14px;
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
              <HeroHighlight>{BRAND_NAME}</HeroHighlight>
              <HeroTitle>
                {BRAND_SLOGAN}
                <br />
                현장과 지역사회를 잇다
              </HeroTitle>
              <HeroText>
                시니어와 장애우를 위한 통합 인지교육, 공모사업, 자격증 과정을 통해 지역사회와 함께 성장하는
                서원교육 협동조합의 교육 여정을 만나보세요.
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
                  {COOP_OVERVIEW.map((item) => (
                    <HeroBadge key={item.title}>{item.title}</HeroBadge>
                  ))}
                </HeroBadgeGrid>
              </HeroVisualInner>
            </HeroVisual>
          </HeroGrid>
        </SectionInner>
      </HeroSection>

      <Section>
        <SectionHeader>
          <SectionTitle>서원교육 협동조합 개요</SectionTitle>
          <SectionDescription>
            시니어와 장애우의 일상에 필요한 인지활동과 체험 교육을 제공하며, 지역과 기관을 연결하는 교육 허브로
            자리하고 있습니다.
          </SectionDescription>
        </SectionHeader>
        <CardGrid>
          {COOP_OVERVIEW.map((item) => (
            <Card key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardSummary>{item.summary}</CardSummary>
              <BulletList>
                {item.details.map((detail) => (
                  <BulletItem key={detail}>{detail}</BulletItem>
                ))}
              </BulletList>
            </Card>
          ))}
        </CardGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>자격증 안내</SectionTitle>
          <SectionDescription>
            현장의 필요에 맞춘 통합인지, 요리, 원예, 난타, 감성 코칭 등 전문 강사 과정을 통해 실무 역량을 갖춘 인재를
            양성합니다.
          </SectionDescription>
        </SectionHeader>
        <CurriculumGrid>
          {LICENSE_GUIDE.map((license) => (
            <CurriculumCard key={license.name}>
              <CardTitle>{license.name}</CardTitle>
              <CardSummary>{license.summary}</CardSummary>
              <ChipList>
                {license.highlights.map((highlight) => (
                  <Chip key={highlight}>{highlight}</Chip>
                ))}
              </ChipList>
            </CurriculumCard>
          ))}
        </CurriculumGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>지역사회와 사회적 협동조합 간 연계활동</SectionTitle>
          <SectionDescription>
            현장 중심 프로젝트와 문화 활동을 통해 협동조합, 기관, 단체가 함께 성장하는 협력 모델을 만듭니다.
          </SectionDescription>
        </SectionHeader>
        <HighlightGrid>
          {PARTNERSHIP_ACTIVITIES.map((activity) => (
            <HighlightCard key={activity.title}>
              <HighlightTitle>{activity.title}</HighlightTitle>
              <HighlightSummary>{activity.description}</HighlightSummary>
            </HighlightCard>
          ))}
        </HighlightGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>현대사회 문제와 대응</SectionTitle>
          <SectionDescription>
            급속한 고령화와 교육 수요 변화에 대응하기 위해 데이터를 기반으로 한 진단과 미래 전략을 제시합니다.
          </SectionDescription>
        </SectionHeader>
        <IssueGrid>
          {SOCIAL_CHALLENGES.map((issue) => (
            <IssueCard key={issue.title}>
              <IssueTitle>{issue.title}</IssueTitle>
              <IssueList>
                {issue.points.map((point) => (
                  <IssueItem key={point}>{point}</IssueItem>
                ))}
              </IssueList>
            </IssueCard>
          ))}
        </IssueGrid>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>상담 및 제휴 문의</SectionTitle>
          <SectionDescription>
            프로그램 도입, 강사 협력, 공모사업 제안 등 다양한 협력을 기다리고 있습니다. 필요하신 내용을 남겨주시면
            담당자가 신속하게 안내드리겠습니다.
          </SectionDescription>
        </SectionHeader>
        <ContactBanner>
          <ContactInfo>
            <ContactTitle>지금 바로 함께 도전해요</ContactTitle>
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
