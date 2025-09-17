import { useMutation } from "@tanstack/react-query";
import { createPostApi, getPostApi } from "../apis/postApi";

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