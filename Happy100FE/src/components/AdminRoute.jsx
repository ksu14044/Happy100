import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetUserInfoQueryForce } from '../queries/userQuery';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useGetUserInfoQueryForce();

  useEffect(() => {
    if (isLoading) return;
    if (error || !user) {
      window.alert('로그인이 필요합니다. 관리자 전용 페이지입니다.');
      navigate('/login', { replace: true, state: { from: location } });
      return;
    }
    if (user.role !== 'ROLE_ADMIN') {
      window.alert('접근 권한이 없습니다. 관리자만 이용 가능합니다.');
      navigate('/', { replace: true });
    }
  }, [isLoading, error, user, navigate, location]);

  if (isLoading) return null;
  if (!user || user.role !== 'ROLE_ADMIN') return null;
  return children;
}
