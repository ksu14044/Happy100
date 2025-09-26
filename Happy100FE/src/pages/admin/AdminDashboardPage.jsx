import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const MenuCard = styled(Link)`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }

  h2 {
    margin: 0 0 1rem 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

const AdminDashboardPage = () => {
  return (
    <Container>
      <Title>관리자 대시보드</Title>
      <MenuGrid>
        <MenuCard to="/admin/users">
          <h2>사용자 관리</h2>
          <p>사용자 계정 및 권한 관리</p>
        </MenuCard>
        <MenuCard to="/admin/posts">
          <h2>게시물 관리</h2>
          <p>게시판 글 및 댓글 관리</p>
        </MenuCard>
      </MenuGrid>
    </Container>
  );
};

export default AdminDashboardPage;