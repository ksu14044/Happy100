import { useQuery } from "@tanstack/react-query";
import { getPostApi, getPostByIdApi } from "../apis/postApi";

export const useGetPostListQuery = ({
    boardType,
    page = 1,
    size = 10,
    searchType,
    keyword,
    sort = "LATEST",
    enabled = true,
}) =>
    useQuery({
        queryKey: ["posts", boardType, page, size, searchType, keyword, sort], // 객체 대신 원시값으로 안정화
        queryFn: ({ signal }) =>
            getPostApi({ boardType, page, size, searchType, keyword, sort, signal }),
        enabled: !!boardType && enabled,
        staleTime: 60 * 1000,
    });

export const useGetPostByIdQuery = ({ postId, increaseView = true, enabled = true }) =>
    useQuery({
        queryKey: ["post", postId, increaseView],
        queryFn: ({ signal }) => getPostByIdApi({ postId, increaseView, signal }),
        enabled: !!postId && enabled,
        staleTime: 60 * 1000,
        retry: 0,
    });
