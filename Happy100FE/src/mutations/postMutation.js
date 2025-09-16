import { useMutation } from "@tanstack/react-query";
import { getPostApi } from "../apis/postApi";

export const useGetPostListMutation = () => useMutation({
    mutationKey: ["getPostList"],
    mutationFn: getPostApi,
    retry: 0,
})