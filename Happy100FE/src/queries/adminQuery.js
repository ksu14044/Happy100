import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePostApi, deleteUserApi, getPostsApi, getUsersApi } from '../apis/adminApi';

const ADMIN_QUERY_KEYS = {
  users: 'admin-users',
  posts: 'admin-posts',
};

export const useUsersQuery = (params = {}, options = {}) => {
  const { page = 1, size = 10, searchType, keyword } = params;
  const queryKey = [
    ADMIN_QUERY_KEYS.users,
    page,
    size,
    searchType ?? null,
    keyword ?? null,
  ];

  return useQuery({
    queryKey,
    queryFn: () => getUsersApi({ page, size, searchType, keyword }),
    ...options,
  });
};

export const usePostsQuery = (params = {}, options = {}) => {
  const { page = 1, size = 10, searchType, keyword } = params;
  const queryKey = [
    ADMIN_QUERY_KEYS.posts,
    page,
    size,
    searchType ?? null,
    keyword ?? null,
  ];

  return useQuery({
    queryKey,
    queryFn: () => getPostsApi({ page, size, searchType, keyword }),
    ...options,
  });
};

export const useDeleteUserMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const originalOnSuccess = options.onSuccess;

  return useMutation({
    mutationFn: (userId) => deleteUserApi(userId),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEYS.users] });
      if (typeof originalOnSuccess === 'function') {
        originalOnSuccess(data, variables, context);
      }
    },
  });
};

export const useDeletePostMutation = (options = {}) => {
  const queryClient = useQueryClient();
  const originalOnSuccess = options.onSuccess;

  return useMutation({
    mutationFn: (postId) => deletePostApi(postId),
    ...options,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEYS.posts] });
      if (typeof originalOnSuccess === 'function') {
        originalOnSuccess(data, variables, context);
      }
    },
  });
};
