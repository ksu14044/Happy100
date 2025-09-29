package com.Happy100BE.Happy100.mapper;

import com.Happy100BE.Happy100.entity.BoardPost;
import com.Happy100BE.Happy100.entity.BoardAttachment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {

    // Post
    int insertPost(BoardPost post);
    BoardPost selectPostById(@Param("postId") Long postId);
    List<BoardPost> selectPostList(
            @Param("boardType") String boardType,
            @Param("offset") int offset,
            @Param("limit") int limit,
            @Param("searchType") String searchType,
            @Param("keyword") String keyword,
            @Param("sort") String sort,
            @Param("useFulltext") boolean useFulltext);
    int updatePost(BoardPost post);
    int softDeletePost(@Param("postId") Long postId);
    int increaseViewCount(@Param("postId") Long postId);

    // Attachment
    int insertAttachments(@Param("postId") Long postId, @Param("list") List<BoardAttachment> list);
    List<BoardAttachment> selectAttachments(@Param("postId") Long postId);
    BoardAttachment selectAttachmentById(@Param("attachmentId") Long attachmentId);
    int deleteAttachmentsByPost(@Param("postId") Long postId);
    // 다건 첨부 일괄 조회
    java.util.List<com.Happy100BE.Happy100.entity.BoardAttachment> selectAttachmentsByPostIds(@Param("postIds") java.util.List<Long> postIds);
    int existsEnabledBoardType(@org.apache.ibatis.annotations.Param("typeKey") String typeKey);
    int countPostsByBoardType(@Param("boardType") String boardType);
    int countPostList(@Param("boardType") String boardType,
                      @Param("searchType") String searchType,
                      @Param("keyword") String keyword,
                      @Param("useFulltext") boolean useFulltext);
}
