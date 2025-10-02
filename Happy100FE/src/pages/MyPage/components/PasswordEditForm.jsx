import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button, ButtonGroup, ErrorMessage } from '../style';
import { useUpdatePasswordMutation } from '../../../queries/userQuery';

export default function PasswordEditForm({ onCancel }) {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync } = useUpdatePasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[PasswordEditForm] 비밀번호 변경 폼 제출');
    
    // 유효성 검사
    if (!newPassword) {
      console.log('[PasswordEditForm] 유효성 검사 실패: 새 비밀번호 누락');
      setError('새 비밀번호를 입력해주세요');
      return;
    }
    if (newPassword !== confirmPassword) {
      console.log('[PasswordEditForm] 유효성 검사 실패: 비밀번호 불일치');
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다');
      return;
    }
    
    // 비밀번호 길이 검사
    if (newPassword.length < 5 || newPassword.length > 30) {
      console.log('[PasswordEditForm] 유효성 검사 실패: 비밀번호 길이 제한');
      setError('비밀번호는 5~30자 사이여야 합니다');
      return;
    }

    console.log('[PasswordEditForm] 유효성 검사 통과, 비밀번호 변경 시도');
    setError('');
    setIsSubmitting(true);
    
    try {
      await mutateAsync(newPassword);
      console.log('[PasswordEditForm] 비밀번호 변경 성공');
      onCancel();
    } catch (err) {
      console.error('[PasswordEditForm] 비밀번호 변경 실패:', err);
      setError(err.response?.data?.message || '비밀번호 변경 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        새 비밀번호
        <Input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isSubmitting}
        />
      </Label>
      
      <Label>
        새 비밀번호 확인
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isSubmitting}
        />
      </Label>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <ButtonGroup>
        <Button type="button" onClick={onCancel} disabled={isSubmitting}>
          취소
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? '변경 중...' : '변경하기'}
        </Button>
      </ButtonGroup>
    </Form>
  );
}

PasswordEditForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
};
