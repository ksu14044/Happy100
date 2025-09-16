import { useQuery } from "@tanstack/react-query";
import { getPostApi } from "../apis/postApi";

export const useGetPostListQuery = ({ boardType, page = 1, size = 10, enabled = true }) =>
    useQuery({
        queryKey: ["posts", boardType, page, size], // 객체 대신 원시값으로 안정화
        queryFn: ({signal}) => getPostApi({ boardType, page, size, signal }),
        enabled: !!boardType && enabled,
        staleTime: 60 * 1000,
    });