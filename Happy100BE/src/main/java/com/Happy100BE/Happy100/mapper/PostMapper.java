package com.Happy100BE.Happy100.mapper;

import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.entity.Post;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Post에 대한 MyBatis 매퍼 인터페이스
 * - XML: resources/mapper/PostMapper.xml
 */
@Mapper
public interface PostMapper {

    /**
     * 게시글 저장
     * @param post 저장할 Post (postId는 null이어야 함)
     * @return 영향을 받은 row 수
     * - useGeneratedKeys=true 이므로 post.postId에 생성된 PK가 채워집니다.
     */
    int insertPost(Post post);

    /**
     * PK로 단건 조회
     */
    Post findById(Integer postId);

    // 게시판별 목록 페이지 조회(검색 포함)
    List<Post> findPageByBoard(
            @Param("boardType") BoardType boardType,
            @Param("keyword") String keyword,
            @Param("limit") int limit,
            @Param("offset") int offset,
            @Param("isQna") boolean isQna,
            @Param("isAdmin") boolean isAdmin,
            @Param("currentUserId") Integer currentUserId
    );

    // 게시판별 전체 건수(검색 포함)
    int countByBoard(
            @Param("boardType") BoardType boardType,
            @Param("keyword") String keyword,
            @Param("isQna") boolean isQna,
            @Param("isAdmin") boolean isAdmin,
            @Param("currentUserId") Integer currentUserId
    );

    // ====== 수정/삭제 ======
    int updatePost(Post post);

    int deletePost(@Param("postId") Integer postId);
}
