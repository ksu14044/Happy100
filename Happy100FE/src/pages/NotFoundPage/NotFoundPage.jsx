import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrap, Card, Code, Title, Desc, Actions, PrimaryBtn, GhostBtn } from './style';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Card role="region" aria-label="페이지를 찾을 수 없습니다">
        <Code>404</Code>
        <Title>요청하신 페이지를 찾을 수 없습니다</Title>
        <Desc>
          주소가 변경되었거나, 일시적으로 사용할 수 없습니다.<br />
          아래 버튼으로 이동을 계속해 주세요.
        </Desc>
        <Actions>
          <PrimaryBtn to="/">홈으로 가기</PrimaryBtn>
          <GhostBtn type="button" onClick={() => navigate(-1)}>이전 페이지</GhostBtn>
        </Actions>
      </Card>
    </Wrap>
  );
}
