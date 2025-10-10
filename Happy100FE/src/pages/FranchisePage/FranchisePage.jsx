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
  FRANCHISE_SUPPORT,
  FRANCHISE_PROCESS,
} from '../../data/presentationContent.js';

const FlowSection = styled.section`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(24px, 5vw, 36px);
`;

const SlideFigure = styled.figure`
  margin: 0;
  display: grid;
  gap: 16px;
  border-radius: clamp(28px, 6vw, 40px);
  overflow: hidden;
  background: #fff;
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.18);
`;

const SlideImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const SlideCaption = styled.figcaption`
  padding: clamp(20px, 4vw, 28px);
  color: #1f2937;
  line-height: 1.7;
`;

export default function FranchisePage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>지사 모집</AccentTag>
        <SectionHeader>
          <PageTitle>행복백세와 함께할 파트너를 찾습니다</PageTitle>
        
        </SectionHeader>
      </Section>

      <FlowSection>
        <SectionHeader>
          <SectionTitle>가맹지사 혜택 및 운영 방식</SectionTitle>
          <Lead>슬라이드 원본을 그대로 활용해 행복백세 파트너십의 핵심 메시지를 전달합니다.</Lead>
        </SectionHeader>
        <SlideFigure>
          <SlideImage
            src={FRANCHISE_SUPPORT.visual}
            alt="행복백세 가맹지사 혜택과 운영 방식을 설명한 슬라이드"
            loading="lazy"
          />
          <SlideCaption>
            행복백세는 프로그램 지원, 교육, 자격증, 영업, 지자체 사업 등 전 영역을 단계적으로 돕는 파트너십을 제공합니다.
          </SlideCaption>
        </SlideFigure>
      </FlowSection>

      <Section>
        <SectionHeader>
          <SectionTitle>지사 파트너 혜택</SectionTitle>
          <Lead>전문 교육·운영 지원·지역 맞춤형 프로그램 등 실질적인 성장 지원을 제공합니다.</Lead>
        </SectionHeader>
        <TwoColumn>
          {[
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
          ].map((item) => (
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
            {[
              '지사장·실무자 교육 및 컨설팅 제공',
              '홍보 콘텐츠, 브랜딩 자료, 온라인 채널 운영 지원',
              '지속적인 프로그램 업데이트와 공동 기획',
              '전국 네트워크를 통한 사례 공유 및 협업 기회',
            ].map((support) => (
              <BulletItem key={support}>{support}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>지사 개설 절차</SectionTitle>
          <Lead>상담에서 운영까지 전 단계에 걸친 파트너십 프로세스를 제공합니다.</Lead>
        </SectionHeader>
        <Timeline>
          {FRANCHISE_PROCESS.map((item) => (
            <TimelineItem key={item.step}>
              <TimelineBadge>{item.step}</TimelineBadge>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.description}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>
    </PageWrap>
  );
}
