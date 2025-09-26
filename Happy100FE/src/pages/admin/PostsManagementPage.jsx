import React, { useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePostApi, getPostsApi } from '../../apis/adminApi';
import { Pagination } from '../../components/Pagination';
import { useNavigate } from 'react-router-dom';

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
  const baseList = posts?.content ?? [];
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
        <label htmlFor="postTitleSearch">제목</label>
        <SearchInput
          id="postTitleSearch"
          placeholder="제목 입력"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
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
      </SearchBar>
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
            <tr key={post.id}>
              <Td>{post.postId}</Td>
              <Td>{post.title}</Td>
              <Td>관리자</Td>
              <Td>{post.boardType}</Td>
              <Td>{new Date(post.createdAt).toLocaleDateString()}</Td>
              
              <Td>
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
                    if (!pid) return alert('삭제할 게시글 ID를 확인할 수 없습니다.');
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

export default PostsManagementPage;
