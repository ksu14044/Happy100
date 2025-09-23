import React from 'react';
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
  Timeline,
  TimelineItem,
  TimelineBadge,
} from '../shared/InfoStyles.js';
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  KEY_PHILOSOPHY,
  PROGRAM_FLOW,
  EXPECTED_IMPACT,
} from '../../data/brandContent.js';

const MISSION_POINTS = [
  '시니어의 잠재력을 깨우는 평생학습 기반',
  '세대가 함께 공감하고 협업하는 융합 프로그램',
  '문화·예술 참여로 지역사회와 성장하는 상생 가치',
];

export default function OverviewPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>브랜드 소개</AccentTag>
        <SectionHeader>
          <PageTitle>
            {BRAND_NAME}는 {BRAND_SLOGAN}
          </PageTitle>
          <Lead>
            행복백세는 시니어 교육과 활동, 세대 융합과 문화·예술을 잇는 행복교육운동입니다. 배움의 즐거움과
            사회 참여의 기회를 확장하여 건강한 백세 시대를 준비하고, 지역사회와 함께 성장하는 선순환 구조를
            만들어 갑니다.
          </Lead>
        </SectionHeader>
        <Highlight>
          <SectionTitle>우리의 약속</SectionTitle>
          <BulletList>
            {MISSION_POINTS.map((mission) => (
              <BulletItem key={mission}>{mission}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{KEY_PHILOSOPHY.title}</SectionTitle>
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
          <SectionTitle>행복백세 프로그램의 흐름</SectionTitle>
          <Lead>
            시니어의 역량을 단계적으로 강화하고, 교육 이후의 활동까지 촘촘하게 연결되는 여정을 설계했습니다.
          </Lead>
        </SectionHeader>
        <Timeline>
          {PROGRAM_FLOW.steps.map((step, index) => (
            <TimelineItem key={step.title}>
              <TimelineBadge>{index + 1}</TimelineBadge>
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.body}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>행복백세가 만들어 가는 가치</SectionTitle>
          <Lead>
            개인과 가족, 지역사회, 나아가 사회 전체에 긍정의 파장을 만드는 행복백세의 비전을 소개합니다.
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
