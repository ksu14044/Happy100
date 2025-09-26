import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button, ButtonGroup, ErrorMessage } from '../style';
import { useUpdateEmailMutation } from '../../../queries/userQuery';

export default function EmailEditForm({ currentEmail, onCancel }) {
  const [email, setEmail] = useState(currentEmail);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync } = useUpdateEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[EmailEditForm] 이메일 변경 폼 제출:', { email, currentEmail });
    
    // 유효성 검사
    if (!email.trim()) {
      console.log('[EmailEditForm] 유효성 검사 실패: 이메일이 비어있음');
      setError('이메일을 입력해주세요');
      return;
    }
    if (email === currentEmail) {
      console.log('[EmailEditForm] 유효성 검사 실패: 현재 이메일과 동일');
      setError('현재 이메일과 동일합니다');
      return;
    }
    
    // 이메일 형식 검사
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      console.log('[EmailEditForm] 유효성 검사 실패: 이메일 형식 불일치');
      setError('올바른 이메일 형식이 아닙니다');
      return;
    }

    console.log('[EmailEditForm] 유효성 검사 통과, 이메일 변경 시도');
    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await mutateAsync(email);
      console.log('[EmailEditForm] 이메일 변경 성공:', result);
      onCancel();
    } catch (err) {
      console.error('[EmailEditForm] 이메일 변경 실패:', err);
      setError(err.response?.data?.message || '이메일 변경 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        새 이메일
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          autoFocus
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Label>
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

EmailEditForm.propTypes = {
  currentEmail: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};