import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserInfoApi, updateNameApi, updateEmailApi, updatePasswordApi, deleteAccountApi } from '../apis/userApi';

// 사용자 정보 조회 쿼리
export const useGetUserInfoQuery = () => {
  return useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => getUserInfoApi(),
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