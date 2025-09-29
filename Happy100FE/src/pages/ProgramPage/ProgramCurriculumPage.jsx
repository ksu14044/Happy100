import React from 'react';
import {
  PageWrap,
  Section,
  SectionHeader,
  PageTitle,
  SectionTitle,
  Lead,
  AccentTag,
  TableWrap,
  InfoTable,
  Highlight,
  BulletList,
  BulletItem,
} from '../shared/InfoStyles.js';
import { CURRICULUM_GUIDE } from '../../data/brandContent.js';

const CURRICULUM_NOTES = [
  '과정별 맞춤 평가와 피드백을 통해 역량 향상 경로를 제시합니다.',
  '현장 실습, 모의 강의, 팀 프로젝트 등 체험형 학습을 강화합니다.',
  '교육 이후에도 강사 커뮤니티와 컨설팅으로 지속적인 성장을 지원합니다.',
];

export default function ProgramCurriculumPage() {
  return (
    <PageWrap>
      <Section>
        <AccentTag>과정 안내</AccentTag>
        <SectionHeader>
          <PageTitle>행복백세 자격·교육 과정</PageTitle>
          <Lead>
            시니어 활동 지도부터 전문 강사 양성, 심화 리더 과정까지 단계별로 구성된 교육 체계입니다. 각 과정은
            실습과 코칭을 중심으로 설계되었습니다.
          </Lead>
        </SectionHeader>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>과정 구성</SectionTitle>
          <Lead>{CURRICULUM_GUIDE.description}</Lead>
        </SectionHeader>
        <TableWrap>
          <InfoTable data-variant="cards">
            <thead>
              <tr>
                <th scope="col">과정명</th>
                <th scope="col">주요 내용</th>
                <th scope="col">교육 시간</th>
                <th scope="col">대상</th>
              </tr>
            </thead>
            <tbody>
              {CURRICULUM_GUIDE.programs.map((program) => (
                <tr key={program.name}>
                  <td data-label="과정명">{program.name}</td>
                  <td data-label="주요 내용">{program.summary}</td>
                  <td data-label="교육 시간">{program.duration}</td>
                  <td data-label="대상">{program.target}</td>
                </tr>
              ))}
            </tbody>
          </InfoTable>
        </TableWrap>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>운영 안내</SectionTitle>
          <Lead>교육 운영은 참가자의 배경과 목표에 따라 유연하게 조정됩니다.</Lead>
        </SectionHeader>
        <Highlight>
          <BulletList>
            {CURRICULUM_NOTES.map((note) => (
              <BulletItem key={note}>{note}</BulletItem>
            ))}
          </BulletList>
        </Highlight>
      </Section>
    </PageWrap>
  );
}
