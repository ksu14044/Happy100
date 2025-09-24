import { useMutation } from "@tanstack/react-query";
import { createPostApi, deletePostApi, getPostApi, updatePostApi } from "../apis/postApi";

export const useGetPostListMutation = () => useMutation({
    mutationKey: ["getPostList"],
    mutationFn: getPostApi,
    retry: 0,
})

export const useCreatePostMutation = () =>
  useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostApi,
    retry: 0,
  });

export const useUpdatePostMutation = () =>
  useMutation({
    mutationKey: ["updatePost"],
    mutationFn: updatePostApi,
    retry: 0,
  });

export const useDeletePostMutation = () =>
  useMutation({
    mutationKey: ["deletePost"],
    mutationFn: deletePostApi,
    retry: 0,
  });
