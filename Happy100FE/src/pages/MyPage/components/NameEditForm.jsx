import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Label, Input, Button, ButtonGroup, ErrorMessage } from '../style';
import { useUpdateNameMutation } from '../../../queries/userQuery';

export default function NameEditForm({ currentName, onCancel }) {
  const [name, setName] = useState(currentName);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutateAsync } = useUpdateNameMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Form] 이름 변경 폼 제출:', { name, currentName });
    
    // 유효성 검사
    if (!name.trim()) {
      console.log('[Form] 유효성 검사 실패: 이름이 비어있음');
      setError('이름을 입력해주세요');
      return;
    }
    if (name === currentName) {
      console.log('[Form] 유효성 검사 실패: 현재 이름과 동일');
      setError('현재 이름과 동일합니다');
      return;
    }
    if (name.length < 2 || name.length > 50) {
      console.log('[Form] 유효성 검사 실패: 이름 길이 제한 위반');
      setError('이름은 2~50자 사이여야 합니다');
      return;
    }

    console.log('[Form] 유효성 검사 통과, 이름 변경 시도');
    setError('');
    setIsSubmitting(true);
    
    try {
      const result = await mutateAsync(name);
      console.log('[Form] 이름 변경 성공:', result);
      onCancel();
    } catch (err) {
      console.error('[Form] 이름 변경 실패:', err);
      setError(err.response?.data?.message || '이름 변경 중 오류가 발생했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        새 이름
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

NameEditForm.propTypes = {
  currentName: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
};