import React from 'react';
import {
  PageWrap,
  Section,
  SectionHeader,
  PageTitle,
  SectionTitle,
  Lead,
  AccentTag,
  Timeline,
  TimelineItem,
  TimelineBadge,
  CardTitle,
  CardText,
  Highlight,
  BulletList,
  BulletItem,
} from '../shared/InfoStyles.js';
import { PROGRAM_FLOW } from '../../data/brandContent.js';

const SUPPORT_MECHANISMS = [
  '단계별 담당 코치 배정과 정기 피드백 세션 운영',
  '학습 결과 공유회를 통한 상호 코칭 및 네트워킹',
  '온라인 학습 자료와 커뮤니티를 통한 지속 지원',
];

export default function ProgramFlowPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>프로그램 흐름</AccentTag>
        <SectionHeader>
          <PageTitle>행복백세 교육 절차</PageTitle>
          <Lead>
            교육 참가자는 기초 이론과 실습을 거쳐 자격 취득과 사후 활동으로 확장하는 여정을 경험합니다. 단계별
            성장을 돕는 코칭 시스템이 함께 제공됩니다.
          </Lead>
        </SectionHeader>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>{PROGRAM_FLOW.title}</SectionTitle>
          <Lead>{PROGRAM_FLOW.description}</Lead>
        </SectionHeader>
        <Timeline>
          {PROGRAM_FLOW.steps.map((step, index) => (
            <TimelineItem key={step.title}>
              <TimelineBadge>{String(index + 1).padStart(2, '0')}</TimelineBadge>
              <CardTitle>{step.title}</CardTitle>
              <CardText>{step.body}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>참여자 지원 체계</SectionTitle>
          <Lead>교육 전·중·후를 아우르는 지원 체계로 만족도와 성과를 높입니다.</Lead>
        </SectionHeader>
        <Highlight>
          <BulletList>
            {SUPPORT_MECHANISMS.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>
    </PageWrap>
  );
}
