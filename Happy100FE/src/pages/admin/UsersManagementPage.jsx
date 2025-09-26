import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteUserApi, getUsersApi } from '../../apis/adminApi';
import { Pagination } from '../../components/Pagination';

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
  const queryClient = useQueryClient();
  // 모바일 여부 감지(페이지네이션 버튼 단순화)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  // 아이디(사용자명) 검색 입력 및 적용 상태
  const [keywordInput, setKeywordInput] = useState('');
  const [appliedKeyword, setAppliedKeyword] = useState('');
  // 하이브리드: 서버 기준(페이지 크기 10) + 검색 시 클라이언트 보강(size=50)으로 정합성 유지
  const PAGE_SIZE = 10;
  const effectiveKeyword = (appliedKeyword || '').trim();
  const isSearching = Boolean(effectiveKeyword);
  const searchType = isSearching ? (/^\d+$/.test(effectiveKeyword) ? 'USER_ID' : 'USERNAME') : undefined;
  const fetchPage = isSearching ? 1 : page;
  const fetchSize = isSearching ? 50 : PAGE_SIZE;
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users', fetchPage, fetchSize, searchType, effectiveKeyword],
    queryFn: () => getUsersApi({ page: fetchPage, size: fetchSize, searchType, keyword: effectiveKeyword }),
  });

  // 사용자 삭제 뮤테이션: 성공 시 목록 갱신
  const { mutate: deleteUser, isPending: isDeleting } = useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    onSuccess: () => {
      // 현재 페이지/검색 상태에 맞는 쿼리들 무효화 → 재조회
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  // 페이지네이션 관련 계산값
  const baseList = users?.content ?? [];
  const filteredList = useMemo(() => {
    if (!isSearching) return baseList;
    const raw = effectiveKeyword.toLowerCase();
    const isNumeric = /^\d+$/.test(effectiveKeyword);
    return baseList.filter((u) => {
      const username = String(u.username || '').toLowerCase();
      const matchesUsername = username.includes(raw);
      const matchesId = isNumeric && String(u.userId) === effectiveKeyword;
      return matchesUsername || matchesId;
    });
  }, [baseList, isSearching, effectiveKeyword]);

  const totalElements = isSearching
    ? filteredList.length
    : (users?.totalElements ?? baseList.length);
  const totalPages = isSearching
    ? Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE))
    : (users?.totalPages ?? 1);
  const rowsToRender = isSearching
    ? filteredList.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    : baseList;
  const pageItems = useMemo(() => {
    if (isMobile) return [page];
    const total = Math.max(1, totalPages);
    const cur = Math.min(Math.max(1, page), total);
    const delta = 2; // 현재 기준 양옆으로 2페이지씩 노출
    const start = Math.max(1, cur - delta);
    const end = Math.min(total, cur + delta);
    const items = [];
    if (start > 1) {
      items.push(1);
      if (start > 2) items.push('…');
    }
    for (let i = start; i <= end; i++) items.push(i);
    if (end < total) {
      if (end < total - 1) items.push('…');
      items.push(total);
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
          setAppliedKeyword(keywordInput);
          setPage(1);
        }}
      >
        <label htmlFor="userIdSearch">아이디(사용자명)</label>
        <SearchInput
          id="userIdSearch"
          placeholder="아이디 또는 숫자 ID 입력"
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
          {rowsToRender.map(user => (
            <tr key={user.id}>
              <Td>{user.userId}</Td>
              <Td>{user.username}</Td>
              <Td>{user.email}</Td>
              <Td>{user.name}</Td>
              {/* 권한 한국어 라벨 매핑: ROLE_USER → 사용자, ROLE_ADMIN → 관리자 */}
              <Td>{user.roleName === 'ROLE_ADMIN' ? '관리자' : '사용자'}</Td>
              {/* 계정 상태 한국어 라벨 매핑: 0 → 활성화, 1 → 비활성화 */}
              <Td>{Number(user.accountEnabled) === 0 ? '활성화' : '비활성화'}</Td>
              <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
              <Td>
                {/* 요구사항: 사용자 관리에서는 수정 버튼 제거, 삭제만 제공 */}
                <Button
                  variant="danger"
                  onClick={() => {
                    if (isDeleting) return;
                    const targetId = user.userId ?? user.id;
                    if (!targetId) return alert('삭제할 사용자 ID를 확인할 수 없습니다.');
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
