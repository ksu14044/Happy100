import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Title, Section, Label, Input, Button, ErrorMessage, AdminLink } from './style';
import { useGetUserInfoQuery, useDeleteAccountMutation } from '../../queries/userQuery';
import Modal from '../../components/Modal';
import NameEditForm from './components/NameEditForm';
import EmailEditForm from './components/EmailEditForm';
import PasswordEditForm from './components/PasswordEditForm';
import { tokenStorage } from '../../libs/authStorage';
import { decodeJwtPayload } from '../../libs/decoddecodeJwtPayload';

export default function MyPage() {
  console.log('[MyPage] 컴포넌트 렌더링');
  
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserInfoQuery();
  const { mutateAsync: deleteAccount, isLoading: isDeleting } = useDeleteAccountMutation();
  
  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log('[MyPage] 현재 상태:', { 
    user, 
    isLoading, 
    error, 
    editingName, 
    editingEmail, 
    editingPassword, 
    showDeleteModal 
  });

  const handleDelete = async () => {
    console.log('[MyPage] 회원 탈퇴 시도');
    try {
      await deleteAccount();
      console.log('[MyPage] 회원 탈퇴 성공');
      navigate('/login');
    } catch (error) {
      console.error('[MyPage] 회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
      setShowDeleteModal(false);
    }
  };

  // 로딩 중이면 로딩 표시
  if (isLoading) {
    return (
      <Container>
        <Title>내 정보</Title>
        <p>로딩 중...</p>
      </Container>
    );
  }

  // 에러가 있으면 에러 표시
  if (error) {
    return (
      <Container>
        <Title>내 정보</Title>
        <ErrorMessage>
          {error.response?.status === 401 
            ? "로그인이 필요합니다."
            : "정보를 불러오는 중 오류가 발생했습니다."
          }
        </ErrorMessage>
        <Button onClick={() => navigate('/login')}>로그인하기</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>내 정보</Title>
      
      <Section>
        <h2>
          기본 정보
          {user?.role === 'ROLE_ADMIN' && (
            <AdminLink to="/admin">관리자 페이지</AdminLink>
          )}
        </h2>
        <div>
          <Label>
            아이디
            <Input type="text" value={user.username} disabled />
          </Label>
          
          {editingName ? (
            <NameEditForm
              currentName={user.name}
              onCancel={() => setEditingName(false)}
            />
          ) : (
            <Label>
              이름
              <Input type="text" value={user.name} disabled />
              <Button type="button" onClick={() => setEditingName(true)}>
                이름 변경
              </Button>
            </Label>
          )}
          
          {editingEmail ? (
            <EmailEditForm
              currentEmail={user.email}
              onCancel={() => setEditingEmail(false)}
            />
          ) : (
            <Label>
              이메일
              <Input type="email" value={user.email} disabled />
              <Button type="button" onClick={() => setEditingEmail(true)}>
                이메일 변경
              </Button>
            </Label>
          )}
        </div>
      </Section>

      <Section>
        <h2>비밀번호 변경</h2>
        {editingPassword ? (
          <PasswordEditForm onCancel={() => setEditingPassword(false)} />
        ) : (
          <Button type="button" onClick={() => setEditingPassword(true)}>
            비밀번호 변경하기
          </Button>
        )}
      </Section>

      <Section>
        <h2>회원 탈퇴</h2>
        <p>탈퇴하면 모든 정보가 삭제되며 복구할 수 없습니다.</p>
        <Button type="button" variant="danger" onClick={() => setShowDeleteModal(true)}>
          회원 탈퇴
        </Button>
      </Section>

      <Modal
        isOpen={showDeleteModal}
        title="회원 탈퇴"
        message="정말 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다."
        confirmLabel="탈퇴하기"
        cancelLabel="취소"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        isConfirming={isDeleting}
      />
    </Container>
  );
}