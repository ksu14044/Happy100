import React, { useState } from 'react';
import { useUsersQuery, useDeleteUserMutation } from '../../queries/adminQuery';
import { Container, Header, Table, Th, Td, ActionButton, Pagination, PageButton } from './style';

export default function AdminDashboard() {
  const [page, setPage] = useState(1);
  const { data: users, isLoading, error } = useUsersQuery({ page });
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const handleDeleteClick = (userId) => {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      deleteUser(userId);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <h1>관리자 대시보드</h1>
        </Header>
        <p>로딩 중...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <h1>관리자 대시보드</h1>
        </Header>
        <p>에러가 발생했습니다: {error.message}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>관리자 대시보드</h1>
      </Header>

      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>사용자명</Th>
            <Th>이메일</Th>
            <Th>가입일</Th>
            <Th>권한</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {(users?.content ?? []).map((user) => (
            <tr key={user.userId}>
              <Td>{user.userId}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</Td>
              <Td>{user.roleName === 'ROLE_ADMIN' ? '관리자' : '사용자'}</Td>
              <Td>
                <ActionButton
                  variant="danger"
                  onClick={() => handleDeleteClick(user.userId)}
                  disabled={isDeleting}
                >
                  삭제
                </ActionButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination>
        <PageButton
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          이전
        </PageButton>
        {[...Array(users.totalPages)].map((_, i) => (
          <PageButton
            key={i + 1}
            active={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </PageButton>
        ))}
        <PageButton
          onClick={() => setPage(p => p + 1)}
          disabled={page === users.totalPages}
        >
          다음
        </PageButton>
      </Pagination>
    </Container>
  );
}
