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
  TableWrap,
  InfoTable,
  Timeline,
  TimelineItem,
  TimelineBadge,
} from '../shared/InfoStyles.js';
import {
  BRAND_NAME,
  BRAND_SLOGAN,
  BRAND_KEYWORDS,
  CONTACT_INFO,
} from '../../data/brandContent.js';

const CORE_VALUES = [
  '배움과 활동이 이어지는 평생학습 플랫폼 구축',
  '세대 공감을 이끄는 통합 교육 콘텐츠 제공',
  '지역사회와 상생하는 사회적 가치 실현',
];

const COMPANY_TODOS = [
  {
    badge: 'VISION',
    title: '행복교육운동 플랫폼',
    body: '시니어 교육과 사회 참여를 통합적으로 지원하는 플랫폼으로 자리매김합니다.',
  },
  {
    badge: 'NETWORK',
    title: '전국 지사 협력망 구축',
    body: '지역별 특성을 반영한 지사와 파트너 기관을 통해 현장 중심 프로그램을 확산합니다.',
  },
  {
    badge: 'CARE',
    title: '돌봄과 교육의 연계',
    body: '돌봄 부담을 줄이고 세대 간 이해를 높이는 복합 돌봄·교육 모델을 개발합니다.',
  },
];

const HISTORY = [
  {
    year: '2020',
    title: '행복백세 준비 및 기획',
    detail: '시니어 교육 수요 분석과 프로그램 모델링, 행복교육운동의 방향성 수립',
  },
  {
    year: '2021',
    title: '시범 운영 및 커리큘럼 정교화',
    detail: '시니어 놀이·활동 지도과정, 전문강사 과정 등 핵심 교육안 구축',
  },
  {
    year: '2022-2023',
    title: '세대 융합 프로그램 확장',
    detail: '아동·청소년·가족이 함께하는 프로그램을 확대하고 지역 축제와 협력',
  },
  {
    year: '2024-',
    title: '전국 지사 및 파트너십 확대',
    detail: '지사 모집과 파트너십 체계를 강화하여 행복백세 네트워크를 본격 확장',
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

export default function CompanyPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>회사소개</AccentTag>
        <SectionHeader>
          <SingleLineTitle>
            {BRAND_NAME}, 서원교육협동조합이 만듭니다
          </SingleLineTitle>
          <Lead>
            서원교육협동조합은 행복백세 브랜드를 통해 시니어 교육, 세대 융합 프로그램, 문화·예술 활동을
            연결하는 행복교육운동을 전개하고 있습니다. {BRAND_SLOGAN}라는 슬로건 아래, 지역사회와 함께 성장하는
            사회적 가치를 추구합니다.
          </Lead>
        </SectionHeader>
        <Highlight>
          <SectionTitle>핵심 가치</SectionTitle>
          <BulletList>
            {CORE_VALUES.map((value) => (
              <BulletItem key={value}>{value}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>행복백세 운영 철학</SectionTitle>
          <Lead>
            다양한 세대와 지역이 함께 공감하고 성장할 수 있도록, 교육·돌봄·문화가 연결된 통합 시스템을 구축합니다.
          </Lead>
        </SectionHeader>
        <TwoColumn>
          {COMPANY_TODOS.map((item) => (
            <InfoCard key={item.badge}>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.body}</CardText>
            </InfoCard>
          ))}
          <InfoCard>
            <CardTitle>키워드</CardTitle>
            <CardText>{BRAND_KEYWORDS}</CardText>
            <CardText>{BRAND_SLOGAN}</CardText>
          </InfoCard>
        </TwoColumn>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>운영 정보</SectionTitle>
          <Lead>행복백세는 사회적 협동조합인 서원교육협동조합이 운영합니다.</Lead>
        </SectionHeader>
        <TableWrap>
          <InfoTable>
            <tbody>
              <tr>
                <th scope="row">주관·운영</th>
                <td>{CONTACT_INFO.operator}</td>
              </tr>
              <tr>
                <th scope="row">대표자</th>
                <td>신수정</td>
              </tr>
              <tr>
                <th scope="row">주소</th>
                <td>{CONTACT_INFO.address}</td>
              </tr>
              <tr>
                <th scope="row">전화</th>
                <td>{CONTACT_INFO.phone}</td>
              </tr>
              <tr>
                <th scope="row">이메일</th>
                <td>{CONTACT_INFO.email}</td>
              </tr>
              <tr>
                <th scope="row">사업자등록번호</th>
                <td>571-88-03341</td>
              </tr>
            </tbody>
          </InfoTable>
        </TableWrap>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>행복백세의 발자취</SectionTitle>
          <Lead>교육-활동-연계 전 과정이 단계적으로 발전하는 여정을 이어가고 있습니다.</Lead>
        </SectionHeader>
        <Timeline>
          {HISTORY.map((item) => (
            <TimelineItem key={item.title}>
              <TimelineBadge>{item.year}</TimelineBadge>
              <CardTitle>{item.title}</CardTitle>
              <CardText>{item.detail}</CardText>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>
    </PageWrap>
  );
}
