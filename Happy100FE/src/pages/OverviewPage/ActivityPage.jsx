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
  '시니어 교육': [
    '배움·활동 병행 커리큘럼으로 학습 동기를 유지합니다.',
    '두뇌·감각 자극, 건강 증진을 위한 콘텐츠를 구성합니다.',
    '실습 중심 교육으로 현장에서 바로 활용 가능한 역량을 길러 줍니다.',
  ],
  '세대 융합 프로그램': [
    '아동·청소년·가족이 함께 참여하는 공감형 프로젝트를 운영합니다.',
    '세대 간 소통을 촉진하는 협업형 활동과 멘토링을 기획합니다.',
    '돌봄 부담을 나누는 가족 참여형 프로그램을 지원합니다.',
  ],
  '문화·예술 융합': [
    '지역 축제·행사와 연계한 참여형 문화 프로그램을 진행합니다.',
    '시니어의 재능을 살린 공연·전시·체험 활동을 지원합니다.',
    '지역 예술인·기관과 협력해 지속 가능한 문화 생태계를 만듭니다.',
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
          <PageTitle>행복백세 핵심 활동 영역</PageTitle>
          <Lead>
            행복교육운동과 함께하는 행복백세는 시니어 교육, 세대 융합, 문화·예술 융합이라는 세 가지 축을 기반으로
            통합적인 배움과 활동의 장을 마련합니다.
          </Lead>
        </SectionHeader>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>세 가지 활동 영역</SectionTitle>
          <Lead>한 영역에서 쌓은 경험이 다른 영역의 참여를 촉진하는 선순환 구조를 지향합니다.</Lead>
        </SectionHeader>
        <TwoColumn>
          {KEY_PHILOSOPHY.items.map((item) => (
            <InfoCard key={item.title}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.subtitle}</CardText>
              <BulletList>
                {DETAIL_LIST[item.title].map((detail) => (
                  <BulletItem key={detail}>{detail}</BulletItem>
                ))}
              </BulletList>
            </InfoCard>
          ))}
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
