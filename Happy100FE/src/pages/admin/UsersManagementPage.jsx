import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Pagination } from '../../components/Pagination';
import { useUsersQuery, useDeleteUserMutation } from '../../queries/adminQuery';

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
  padding: 2.5rem 2rem 3rem;

  @media (max-width: 1024px) {
    padding: 2rem 1.5rem 2.5rem;
  }

  @media (max-width: 768px) {
    max-width: none;
    padding: 1.75rem 1.25rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 1rem 2.25rem;
  }
`;

const Title = styled.h1`
  margin-bottom: 1.75rem;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
  }
`;

// 검색 바 스타일 (엔터 제출을 위해 form 사용)
const SearchBar = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const SearchField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;

  label {
    font-weight: 600;
    font-size: 0.9rem;
    color: #374151;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  padding: 0.55rem 0.85rem;
  border: 1px solid #cbd5f5;
  border-radius: 6px;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #4f46e5;
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const SearchButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

const TableWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.08);
  overflow: hidden;

  @media (max-width: 768px) {
    background: transparent;
    box-shadow: none;
    overflow: visible;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;

    tbody {
      display: grid;
      gap: 1rem;
    }

    tr {
      display: grid;
      gap: 0.75rem;
      padding: 1.1rem 1rem;
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
    }
  }
`;

const Th = styled.th`
  text-align: left;
  padding: 1rem;
  background-color: #f5f7fb;
  border-bottom: 1px solid #e3e8ef;
  font-size: 0.9rem;
  font-weight: 600;
  color: #4b5563;

  &:first-of-type {
    padding-left: 1.25rem;
  }

  &:last-of-type {
    padding-right: 1.25rem;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.95rem;
  color: #1f2937;

  &:first-of-type {
    padding-left: 1.25rem;
  }

  &:last-of-type {
    padding-right: 1.25rem;
  }

  @media (max-width: 768px) {
    padding: 0;
    border: none;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.9rem;

    &::before {
      content: attr(data-label);
      font-size: 0.75rem;
      font-weight: 600;
      color: #6b7280;
      letter-spacing: 0.01em;
      text-transform: none;
    }
  }
`;

const ActionsCell = styled(Td)`
  @media (max-width: 768px) {
    padding-top: 0.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const Button = styled.button`
  padding: 0.55rem 1.1rem;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.variant === 'danger' ? '#dc3545' : '#4f46e5'};
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.15s ease, box-shadow 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.95;
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(79, 70, 229, 0.18);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &[disabled] {
    opacity: 0.75;
    cursor: not-allowed;
    box-shadow: none;
  }

  @media (max-width: 768px) {
    width: 100%;
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
        <SearchField>
          <label htmlFor="userSearch">아이디</label>
          <SearchInput
            id="userSearch"
            placeholder="아이디 입력"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
          />
        </SearchField>
        <SearchButtons>
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
        </SearchButtons>
      </SearchBar>
      <TableWrapper>
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
                <Td data-label="ID">{user.userId}</Td>
                <Td data-label="아이디">{user.username}</Td>
                <Td data-label="이메일">{user.email}</Td>
                <Td data-label="이름">{user.name}</Td>
                <Td data-label="권한">{user.roleName === 'ROLE_ADMIN' ? '관리자' : '사용자'}</Td>
                <Td data-label="상태">{Number(user.accountEnabled) === 0 ? '활성화' : '비활성화'}</Td>
                <Td data-label="가입일">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</Td>
                <ActionsCell data-label="관리">
                  <ButtonGroup>
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
                  </ButtonGroup>
                </ActionsCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

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
