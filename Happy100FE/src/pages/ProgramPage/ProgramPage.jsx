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
} from '../shared/InfoStyles.js';
import {
  PROGRAM_FLOW,
  CURRICULUM_GUIDE,
  EXPECTED_IMPACT,
} from '../../data/brandContent.js';

const PROGRAM_FEATURES = [
  '배움, 활동, 평가, 자격, 사후 연계를 잇는 5단계 로드맵',
  '현장 중심 실습과 코칭으로 즉시 활용 가능한 역량 개발',
  '지속적인 네트워크와 커뮤니티를 통한 활동 지원',
];

export default function ProgramPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>프로그램 안내</AccentTag>
        <SectionHeader>
          <PageTitle>행복백세 프로그램의 전체 구조</PageTitle>
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
          <SectionTitle>{CURRICULUM_GUIDE.title}</SectionTitle>
          <Lead>{CURRICULUM_GUIDE.description}</Lead>
        </SectionHeader>
        <TwoColumn>
          {CURRICULUM_GUIDE.programs.map((program) => (
            <InfoCard key={program.name}>
              <CardTitle>{program.name}</CardTitle>
              <CardText>{program.summary}</CardText>
              <CardText>{program.duration}</CardText>
              <CardText>{program.target}</CardText>
            </InfoCard>
          ))}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>성과와 기대 효과</SectionTitle>
          <Lead>행복백세 프로그램을 통해 기대할 수 있는 다층적 변화를 살펴보세요.</Lead>
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
