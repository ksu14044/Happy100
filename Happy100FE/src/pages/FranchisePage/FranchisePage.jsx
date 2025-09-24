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

const BENEFITS = [
  {
    title: '검증된 커리큘럼 제공',
    detail: '시니어 교육 전문가가 설계한 표준 커리큘럼과 운영 매뉴얼을 제공합니다.',
  },
  {
    title: '전문 교육·운영 지원',
    detail: '강사 양성, 운영자 교육, 행정 지원 등 지사 운영에 필요한 솔루션을 제공합니다.',
  },
  {
    title: '지역 맞춤 프로그램',
    detail: '지역 특성에 맞춘 커스터마이징을 지원하고, 지역 네트워크 구축을 돕습니다.',
  },
];

const SUPPORT = [
  '지사장·실무자 교육 및 컨설팅 제공',
  '홍보 콘텐츠, 브랜딩 자료, 온라인 채널 운영 지원',
  '지속적인 프로그램 업데이트와 공동 기획',
  '전국 네트워크를 통한 사례 공유 및 협업 기회',
];

const PROCESS = [
  {
    step: 'STEP 01',
    title: '상담 및 사업 이해',
    detail: '지사 희망 지역, 운영 계획을 상담하며 행복백세 모델을 소개합니다.',
  },
  {
    step: 'STEP 02',
    title: '협약 및 교육',
    detail: '협약 체결 후 운영자·강사 교육을 통해 지사 운영 역량을 확보합니다.',
  },
  {
    step: 'STEP 03',
    title: '개설 준비 및 홍보',
    detail: '프로그램 일정 수립, 홍보 계획 수립, 초기 운영 컨설팅을 지원합니다.',
  },
  {
    step: 'STEP 04',
    title: '지사 운영 및 성장',
    detail: '정기 평가와 컨설팅으로 지사 성장을 돕고, 공동 프로젝트를 진행합니다.',
  },
];

const SingleLineTitle = styled(PageTitle)`
  white-space: nowrap;
  overflow-wrap: normal;
  word-break: keep-all;

  @media (max-width: 720px) {
    white-space: normal;
    word-break: break-word;
  }
`;

export default function FranchisePage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>지사 모집</AccentTag>
        <SectionHeader>
          <SingleLineTitle>행복백세 지사와 함께할 파트너를 찾습니다</SingleLineTitle>
          <Lead>
            시니어 교육과 활동, 세대 융합 프로그램을 지역에서 함께 확산할 지사 파트너를 모집합니다. 행복교육운동의
            가치를 지역 주민과 나누고 싶은 단체와 기관을 환영합니다.
          </Lead>
        </SectionHeader>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>지사 파트너 혜택</SectionTitle>
          <Lead>교육, 운영, 홍보 전 영역을 지원하여 안정적인 지사 운영을 돕습니다.</Lead>
        </SectionHeader>
        <TwoColumn>
          {BENEFITS.map((item) => (
            <InfoCard key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.detail}</CardText>
            </InfoCard>
          ))}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>운영 지원</SectionTitle>
          <Lead>행복백세 본부는 지사의 안정적인 운영을 위해 지속적인 지원 체계를 갖추고 있습니다.</Lead>
        </SectionHeader>
        <Highlight>
          <BulletList>
            {SUPPORT.map((item) => (
              <BulletItem key={item}>{item}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>지사 개설 절차</SectionTitle>
          <Lead>협약 이후에도 정기적인 평가와 피드백으로 지사 운영을 함께합니다.</Lead>
        </SectionHeader>
        <Timeline>
          {PROCESS.map((item) => (
            <TimelineItem key={item.step}>
              <TimelineBadge>{item.step}</TimelineBadge>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.detail}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>
    </PageWrap>
  );
}
