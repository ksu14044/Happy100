import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfoApi, getUserInfoApiForced, updateNameApi, updateEmailApi, updatePasswordApi, deleteAccountApi } from '../apis/userApi';

// 사용자 정보 조회 쿼리
export const useGetUserInfoQuery = () => {
  const enabled = typeof window !== 'undefined' && sessionStorage.getItem('has_session') === '1';
  const initial = (() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const raw = localStorage.getItem('user_preview');
      return raw ? JSON.parse(raw) : undefined;
    } catch { return undefined; }
  })();
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => getUserInfoApi(), // 401도 null로 반환되므로 에러 아님
    enabled,
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
    initialData: initial,
    onSuccess: (data) => {
      try {
        if (data) localStorage.setItem('user_preview', JSON.stringify({ name: data.name || data.username || '회원', role: data.role || 'ROLE_USER' }));
        else localStorage.removeItem('user_preview');
      } catch {}
    },
  });
};

// 보호 페이지 등에서 강제로 사용자 정보를 확인할 때 사용
export const useGetUserInfoQueryForce = () => {
  return useQuery({
    queryKey: ['user', 'me', 'force'],
    queryFn: () => getUserInfoApiForced(),
    staleTime: 0,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// 이름 변경 뮤테이션
export const useUpdateNameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNameApi,
    onMutate: (variables) => {
      console.log('[Query] 이름 변경 시작:', variables);
    },
    onSuccess: (data) => {
      console.log('[Query] 이름 변경 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    },
    onError: (error) => {
      console.error('[Query] 이름 변경 실패:', error);
    }
  });
};

// 이메일 변경 뮤테이션
export const useUpdateEmailMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEmailApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
    }
  });
};

// 비밀번호 변경 뮤테이션
export const useUpdatePasswordMutation = () => {
  return useMutation({
    mutationFn: updatePasswordApi
  });
};

// 회원 탈퇴 뮤테이션
export const useDeleteAccountMutation = () => {
  return useMutation({
    mutationFn: deleteAccountApi
  });
};
