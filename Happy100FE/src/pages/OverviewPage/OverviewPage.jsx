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
  Highlight,
  BulletList,
  BulletItem,
  TwoColumn,
  InfoCard,
  CardTitle,
  CardText,
} from '../shared/InfoStyles.js';
import {
  BRAND_SLOGAN,
  KEY_PHILOSOPHY,
  EXPECTED_IMPACT,
} from '../../data/brandContent.js';
import { DIFFERENTIATION_SLIDE } from '../../data/presentationContent.js';

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

export default function OverviewPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>브랜드 소개</AccentTag>
        <SectionHeader>
          <PageTitle>{BRAND_SLOGAN}</PageTitle>
          <Lead>
            행복백세는 시니어 교육과 활동, 세대 융합과 문화·예술을 잇는 행복교육운동입니다. 지역사회와 동반 성장하는
            통합 인지교육 생태계를 기반으로 삶의 질을 높이고 지속 가능한 돌봄 환경을 조성합니다.
          </Lead>
        </SectionHeader>
        <Highlight>
          <SectionTitle>우리의 약속</SectionTitle>
          <BulletList>
            {['시니어의 잠재력을 깨우는 평생학습 기반', '세대가 공감하고 협업하는 융합 프로그램', '지역사회와 함께 성장하는 상생 가치'].map((mission) => (
              <BulletItem key={mission}>{mission}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>차별화 전략</SectionTitle>
          <Lead>행복백세의 세 가지 핵심 전략을 슬라이드로 제공합니다.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage src={DIFFERENTIATION_SLIDE.image} alt="행복백세 차별화 전략 프레젠테이션" loading="lazy" />
          <SlideCaption>{DIFFERENTIATION_SLIDE.caption}</SlideCaption>
        </SlideFigure>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>핵심 방향</SectionTitle>
          <Lead>{KEY_PHILOSOPHY.description}</Lead>
        </SectionHeader>
        <TwoColumn>
          {KEY_PHILOSOPHY.items.map((item) => (
            <InfoCard key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.subtitle}</CardText>
              <CardText>{item.body}</CardText>
            </InfoCard>
          ))}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>행복백세가 만들어 가는 가치</SectionTitle>
          <Lead>
            개인과 가족, 지역사회 전반에 긍정의 파장을 만드는 행복백세의 비전을 소개합니다.
          </Lead>
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
    </PageWrap>
  );
}
