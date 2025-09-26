import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Pagination } from '../../components/Pagination';
import { useUsersQuery, useDeleteUserMutation } from '../../queries/adminQuery';

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
`;

// 검색 바 스타일 (엔터 제출을 위해 form 사용)
const SearchBar = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: ${props => props.variant === 'danger' ? '#dc3545' : '#007bff'};
  color: white;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

const UsersManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  // 모바일 여부 감지(페이지네이션 버튼 단순화)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  const [keywordInput, setKeywordInput] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  const PAGE_SIZE = 10;
  const { data: users, isLoading, error } = useUsersQuery({
    page,
    size: PAGE_SIZE,
    keyword: appliedKeyword ? appliedKeyword.trim() : undefined,
  });
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUserMutation();

  const totalElements = users?.totalElements ?? 0;
  const totalPages = Math.max(1, users?.totalPages ?? 1);
  const rowsToRender = users?.content ?? [];

  const pageItems = useMemo(() => {
    if (isMobile) return [page];
    const cur = Math.min(Math.max(1, page), totalPages);
    const delta = 2;
    const start = Math.max(1, cur - delta);
    const end = Math.min(totalPages, cur + delta);
    const items = [];
    if (start > 1) {
      items.push(1);
      if (start > 2) items.push('…');
    }
    for (let i = start; i <= end; i += 1) {
      items.push(i);
    }
    if (end < totalPages) {
      if (end < totalPages - 1) items.push('…');
      items.push(totalPages);
    }
    return items;
  }, [page, totalPages, isMobile]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <Container>
      <Title>사용자 관리</Title>
      {/* 아이디(사용자명) 검색: 엔터로 제출 가능 */}
        <SearchBar
          onSubmit={(e) => {
            e.preventDefault();
            setAppliedKeyword(keywordInput.trim());
            setPage(1);
          }}
        >
          <label htmlFor="userSearch">아이디</label>
          <SearchInput
            id="userSearch"
            placeholder="아이디 입력"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
          <Button type="submit">검색</Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              setKeywordInput('');
              setAppliedKeyword('');
              setPage(1);
            }}
          >
            초기화
          </Button>
        </SearchBar>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>아이디</Th>
            <Th>이메일</Th>
            <Th>이름</Th>
            <Th>권한</Th>
            <Th>상태</Th>
            <Th>가입일</Th>
            <Th>관리</Th>
          </tr>
        </thead>
        <tbody>
          {rowsToRender.map((user) => (
            <tr key={user.userId}>
              <Td>{user.userId}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.name}</Td>
              <Td>{user.roleName === 'ROLE_ADMIN' ? '관리자' : '사용자'}</Td>
              <Td>{Number(user.accountEnabled) === 0 ? '활성화' : '비활성화'}</Td>
              <Td>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</Td>
              <Td>
                <Button
                  variant="danger"
                  onClick={() => {
                    if (isDeleting) return;
                    const targetId = user.userId;
                    if (!targetId) {
                      alert('삭제할 사용자 ID를 확인할 수 없습니다.');
                      return;
                    }
                    if (!window.confirm(`사용자(ID: ${targetId})를 삭제하시겠습니까?`)) return;
                    deleteUser(targetId, {
                      onError: (err) => {
                        const msg = err?.response?.data?.message || err?.message || '삭제 중 오류가 발생했습니다.';
                        alert(msg);
                      },
                    });
                  }}
                >
                  {isDeleting ? '삭제 중...' : '삭제'}
                </Button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* 페이지네이션 */}
      {totalElements > 0 && (
        <Pagination
          total={totalElements}
          page={page}
          totalPages={totalPages}
          pageItems={pageItems}
          onChange={setPage}
          isMobile={isMobile}
        />
      )}
    </Container>
  );
};

export default UsersManagementPage;
