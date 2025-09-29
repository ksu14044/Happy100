import { api } from '../configs/axiosConfig';

// 사용자 정보 조회
export const getUserInfoApi = async () => {
  const response = await api.get('/api/users/me', {
    // 401(비로그인)도 예외로 처리하지 않고 정상 흐름으로 받음
    validateStatus: (status) => status === 200 || status === 401,
  });
  if (response.status === 200) return response.data;
  return null; // 401 등은 비로그인 처리
};

// 강제 조회: 보호 페이지 등에서는 실제 세션 여부 확인이 필요할 수 있음
export const getUserInfoApiForced = async () => {
  const response = await api.get('/api/users/me');
  return response.data;
};

// 이름 변경
export const updateNameApi = async (name) => {
  console.log('[API] 이름 변경 시도:', { name });
  
  if (!name?.trim()) {
    console.error('[API] 이름 변경 실패: 이름이 비어있음');
    throw new Error('이름은 필수입니다');
  }
  
  try {
    const response = await api.put('/api/users/me/name', null, {
      params: { name }
    });
    console.log('[API] 이름 변경 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('[API] 이름 변경 실패:', error.response?.data || error.message);
    throw error;
  }
};

// 이메일 변경
export const updateEmailApi = async (email) => {
  if (!email?.trim()) throw new Error('이메일은 필수입니다');
  const response = await api.put('/api/users/me/email', null, {
    params: { email }
  });
  return response.data;
};

// 비밀번호 변경
export const updatePasswordApi = async (newPassword) => {
  if (!newPassword) throw new Error('새 비밀번호는 필수입니다');
  
  console.log('[API] 비밀번호 변경 요청:', { newPassword });
  const response = await api.put('/api/users/me/password', null, {
    params: { password: newPassword }
  });
  return response.data;
};

// 회원 탈퇴
export const deleteAccountApi = async () => {
  const response = await api.delete('/api/users/me/delete');
  return response.data;
};
