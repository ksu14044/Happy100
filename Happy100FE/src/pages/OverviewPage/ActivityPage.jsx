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
import { KEY_PHILOSOPHY } from '../../data/brandContent.js';

const DETAIL_LIST = {
  '맞춤형 통합 인지수업': [
    '주간보호센터·노인정 등 현장에서 참여자 맞춤 난이도로 수업을 설계합니다.',
    '시니어요리, 공예, 숟가락 난타 등 체험형 콘텐츠를 조합해 몰입도를 높입니다.',
    '생활 속에서 이어 갈 수 있도록 활동지와 복습 키트를 함께 제공합니다.',
  ],
  '지역 공모사업 연계': [
    '지자체·교육기관과 협력해 지역 특화 과제를 발굴하고 제안합니다.',
    '공모 선정 이후에는 예산 집행, 인력 매칭, 성과 보고까지 전 과정을 지원합니다.',
    '업사이클링 재료 키트, 체험 부스 운영 등 지역 참여형 프로그램을 확장합니다.',
  ],
  '전문 인력 양성과 자격증': [
    '민간자격 과정을 통해 현장 경험 기반의 강사를 양성합니다.',
    '온라인·오프라인 병행 교육으로 지역 편차 없이 학습 기회를 제공합니다.',
    '수료 이후에는 강사 활동, 지사 설립, 프로젝트 참여 등 후속 경로를 연계합니다.',
  ],
};

const SUCCESS_FACTORS = [
  '맞춤형 교육 운영 노하우: 참여자의 경험 수준을 반영한 단계별 운영',
  '다각적 파트너십 구축: 지자체, 학교, 복지기관과의 협력 확대',
  '전문가 풀 확보: 교육·상담·문화예술 전문가와 함께하는 콘텐츠 개발',
];

export default function ActivityPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>핵심 활동</AccentTag>
        <SectionHeader>
          <PageTitle>서원교육 협동조합 핵심 활동 영역</PageTitle>
          <Lead>
            서원교육 협동조합은 통합 인지수업, 공모사업 연계, 전문 인력 양성이라는 세 축을 중심으로 지역과 현장을
            아우르는 교육 생태계를 구축합니다.
          </Lead>
        </SectionHeader>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>세 가지 활동 영역</SectionTitle>
          <Lead>한 영역에서 쌓은 경험이 다른 영역의 참여를 촉진하는 선순환 구조를 지향합니다.</Lead>
        </SectionHeader>
        <TwoColumn>
          {KEY_PHILOSOPHY.items.map((item) => {
            const details = DETAIL_LIST[item.title] ?? [];
            return (
            <InfoCard key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.subtitle}</CardText>
              <CardText>{item.body}</CardText>
              {details.length > 0 ? (
                <BulletList>
                  {details.map((detail) => (
                    <BulletItem key={detail}>{detail}</BulletItem>
                  ))}
                </BulletList>
              ) : null}
            </InfoCard>
          );
          })}
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>성공을 만드는 운영 원칙</SectionTitle>
          <Lead>현장 경험을 통해 축적된 운영 노하우와 협력 모델을 기반으로 프로그램을 설계합니다.</Lead>
        </SectionHeader>
        <Highlight>
          <BulletList>
            {SUCCESS_FACTORS.map((factor) => (
              <BulletItem key={factor}>{factor}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>
    </PageWrap>
  );
}
