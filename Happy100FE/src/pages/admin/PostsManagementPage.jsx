import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePostApi, getPostsApi } from '../../apis/adminApi';
import { Pagination } from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

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

const PostsManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // 모바일 여부 감지(페이지네이션 버튼 단순화)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 480px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  // 제목 검색 입력/적용 상태
  const [titleInput, setTitleInput] = useState('');
  const [appliedTitle, setAppliedTitle] = useState('');
  // 하이브리드: 서버 기준(페이지 크기 10) + 검색 시 클라이언트 보강(size=50)
  const PAGE_SIZE = 10;
  const effectiveTitle = (appliedTitle || '').trim();
  const isSearching = Boolean(effectiveTitle);
  const fetchPage = isSearching ? 1 : page;
  const fetchSize = isSearching ? 50 : PAGE_SIZE;
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts', fetchPage, fetchSize, effectiveTitle],
    queryFn: () => getPostsApi({ page: fetchPage, size: fetchSize, searchType: isSearching ? 'TITLE' : undefined, keyword: effectiveTitle }),
  });
  
  // 게시글 삭제 뮤테이션: 성공 시 목록 갱신
  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: (postId) => deletePostApi(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
  // 페이지네이션 관련 계산값
  const baseList = useMemo(() => posts?.content ?? [], [posts]);
  const filteredList = useMemo(() => {
    if (!isSearching) return baseList;
    const lowered = effectiveTitle.toLowerCase();
    return baseList.filter((p) => String(p.title || '').toLowerCase().includes(lowered));
  }, [baseList, isSearching, effectiveTitle]);
  const totalElements = isSearching
    ? filteredList.length
    : (posts?.totalElements ?? baseList.length);
  const totalPages = isSearching
    ? Math.max(1, Math.ceil(filteredList.length / PAGE_SIZE))
    : (posts?.totalPages ?? 1);
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
      <Title>게시물 관리</Title>
      {/* 제목 검색: 엔터로 제출 가능 */}
      <SearchBar
        onSubmit={(e) => {
          e.preventDefault();
          setAppliedTitle(titleInput);
          setPage(1);
        }}
      >
        <SearchField>
          <label htmlFor="postTitleSearch">제목</label>
          <SearchInput
            id="postTitleSearch"
            placeholder="제목 입력"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </SearchField>
        <SearchButtons>
          <Button type="submit">검색</Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => {
              setTitleInput('');
              setAppliedTitle('');
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
              <Th>제목</Th>
              <Th>작성자</Th>
              <Th>게시판</Th>
              <Th>작성일</Th>
              <Th>관리</Th>
            </tr>
          </thead>
          <tbody>
            {rowsToRender.map(post => (
              <tr key={post.id ?? post.postId}>
                <Td data-label="ID">{post.postId}</Td>
                <Td data-label="제목">{post.title}</Td>
                <Td data-label="작성자">관리자</Td>
                <Td data-label="게시판">{post.boardType}</Td>
                <Td data-label="작성일">{new Date(post.createdAt).toLocaleDateString()}</Td>
                <ActionsCell data-label="관리">
                  <ButtonGroup>
                    <Button
                      onClick={() => {
                        const boardType = String(post.boardType || '').toUpperCase();
                        const sectionMap = { NEWS: 'news', CERT: 'cert', SHOP: 'shop' };
                        const section = sectionMap[boardType];
                        const pid = post.postId ?? post.id;
                        if (!section || !pid) {
                          alert('수정 경로를 계산할 수 없습니다.');
                          return;
                        }
                        navigate(`/${section}/edit/${pid}`);
                      }}
                    >
                      수정
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        if (isDeleting) return;
                        const pid = post.postId ?? post.id;
                        if (!pid) {
                          alert('삭제할 게시글 ID를 확인할 수 없습니다.');
                          return;
                        }
                        if (!window.confirm(`게시글(ID: ${pid})을 삭제하시겠습니까?`)) return;
                        deletePost(pid, {
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

export default PostsManagementPage;
