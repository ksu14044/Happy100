import { api } from '../configs/axiosConfig';

export const getUsersApi = async ({ page = 1, size = 10, searchType, keyword } = {}) => {
  const params = { page, size };
  const trimmedKeyword = keyword?.trim();

  if (searchType) {
    params.searchType = searchType;
  }
  if (trimmedKeyword) {
    params.keyword = trimmedKeyword;
  }

  const { data } = await api.get('/api/admin/users', { params });
  return data;
};

export const deleteUserApi = async (userId) => {
  if (!userId && userId !== 0) {
    throw new Error('삭제할 사용자 ID가 필요합니다.');
  }
  await api.delete(`/api/admin/users/${userId}`);
  return true;
};

export const getPostsApi = async ({ page = 1, size = 10, searchType, keyword } = {}) => {
  const params = { page, size };
  const trimmedKeyword = keyword?.trim();

  if (searchType) {
    params.searchType = searchType;
  }
  if (trimmedKeyword) {
    params.keyword = trimmedKeyword;
  }

  const { data } = await api.get('/api/admin/posts', { params });
  return data;
};

export const deletePostApi = async (postId) => {
  if (!postId && postId !== 0) {
    throw new Error('삭제할 게시글 ID가 필요합니다.');
  }
  await api.delete(`/api/admin/posts/${postId}`);
  return true;
};
