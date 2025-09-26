import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { tokenStorage } from '../libs/authStorage';
import { decodeJwtPayload } from '../libs/decoddecodeJwtPayload';

export default function AdminRoute({ children }) {
  const location = useLocation();
  const auth = tokenStorage.load();
  const accessToken = auth?.accessToken;
  
  if (!accessToken) {
    // 로그인되지 않은 경우
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const decoded = decodeJwtPayload(accessToken);
  if (!decoded || decoded.role !== 'ROLE_ADMIN') {
    // 관리자가 아닌 경우
    return <Navigate to="/" replace />;
  }

  return children;
}