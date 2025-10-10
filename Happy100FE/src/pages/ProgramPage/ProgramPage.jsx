import React from 'react';
import styled from '@emotion/styled';
import {
  PageWrap,
  Section,
  SectionHeader,
  PageTitle,
  SectionTitle,
  Lead,
  AccentTag,
  TwoColumn,
  InfoCard,
  CardTitle,
  CardText,
  Highlight,
  BulletList,
  BulletItem,
  Timeline,
  TimelineItem,
  TimelineBadge,
} from '../shared/InfoStyles.js';
import {
  PROGRAM_FLOW,
  EXPECTED_IMPACT,
} from '../../data/brandContent.js';
import {
  PROGRAM_OVERVIEW_SLIDE,
  DOMESTIC_PROGRAM_SLIDE,
  THERAPY_PROGRAM_SLIDE,
  CERTIFICATE_TYPES_SLIDE,
} from '../../data/presentationContent.js';

const PROGRAM_FEATURES = [
  '배움, 활동, 평가, 자격, 사후 연계를 잇는 5단계 로드맵',
  '현장 중심 실습과 코칭으로 즉시 활용 가능한 역량 개발',
  '지속적인 네트워크와 커뮤니티를 통한 활동 지원',
];

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
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.92), rgba(226, 232, 240, 0.72));
`;

export default function ProgramPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>프로그램 안내</AccentTag>
        <SectionHeader>
          <PageTitle>행복백세 프로그램 로드맵</PageTitle>
          <Lead>
            행복백세의 프로그램은 기초 이론부터 사후 활동 연계까지, 시니어의 전문성과 참여도를 단계적으로
            강화하도록 설계되었습니다.
          </Lead>
        </SectionHeader>
        <Highlight>
          <SectionTitle>핵심 특징</SectionTitle>
          <BulletList>
            {PROGRAM_FEATURES.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>프로그램 개요</SectionTitle>
          <Lead>프레젠테이션 자료를 통해 프로그램 구성과 기대 효과를 한 번에 확인하세요.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage
            src={PROGRAM_OVERVIEW_SLIDE.image}
            alt="행복백세 프로그램 개요 프레젠테이션"
            loading="lazy"
          />
          <SlideCaption>{PROGRAM_OVERVIEW_SLIDE.caption}</SlideCaption>
        </SlideFigure>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>국내 시니어 프로그램 현황</SectionTitle>
          <Lead>주요 기관별 프로그램 운영 방식과 특징을 비교한 자료입니다.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage
            src={DOMESTIC_PROGRAM_SLIDE.image}
            alt="국내 시니어 프로그램 현황 프레젠테이션"
            loading="lazy"
          />
          <SlideCaption>{DOMESTIC_PROGRAM_SLIDE.caption}</SlideCaption>
        </SlideFigure>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>노인 대상 원예치료 프로그램</SectionTitle>
          <Lead>인지, 정서, 사회성 영역별 기대 효과를 정리한 슬라이드입니다.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage
            src={THERAPY_PROGRAM_SLIDE.image}
            alt="노인 대상 원예치료 프로그램 프레젠테이션"
            loading="lazy"
          />
          <SlideCaption>{THERAPY_PROGRAM_SLIDE.caption}</SlideCaption>
        </SlideFigure>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>민간 자격증 과정</SectionTitle>
          <Lead>행복백세에서 제공하는 자격증 종류와 커리큘럼을 한 장으로 요약했습니다.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage
            src={CERTIFICATE_TYPES_SLIDE.image}
            alt="민간 자격증 과정을 소개하는 프레젠테이션"
            loading="lazy"
          />
          <SlideCaption>{CERTIFICATE_TYPES_SLIDE.caption}</SlideCaption>
        </SlideFigure>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{PROGRAM_FLOW.title}</SectionTitle>
          <Lead>{PROGRAM_FLOW.description}</Lead>
        </SectionHeader>
        <TwoColumn>
          {PROGRAM_FLOW.steps.map((step) => (
            <InfoCard key={step.title}>
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.body}</CardText>
            </InfoCard>
          ))}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>성과와 기대 효과</SectionTitle>
          <Lead>행복백세 프로그램으로 기대할 수 있는 변화를 소개합니다.</Lead>
        </SectionHeader>
        <TwoColumn>
          {EXPECTED_IMPACT.map((impact) => (
            <InfoCard key={impact.category}>
              <CardTitle>{impact.category}</CardTitle>
              <BulletList>
                {impact.points.map((point) => (
                  <BulletItem key={point}>{point}</BulletItem>
                ))}
              </BulletList>
            </InfoCard>
          ))}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>교육 진행 단계</SectionTitle>
          <Lead>상담부터 사후 연계까지 이어지는 5단계 흐름입니다.</Lead>
        </SectionHeader>
        <Timeline>
          {PROGRAM_FLOW.steps.map((step, index) => (
            <TimelineItem key={`${step.title}-timeline`}>
              <TimelineBadge>{String(index + 1).padStart(2, '0')}</TimelineBadge>
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.body}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>
    </PageWrap>
  );
}
