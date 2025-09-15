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
            @Param("limit") int limit);
    int updatePost(BoardPost post);
    int softDeletePost(@Param("postId") Long postId);
    int increaseViewCount(@Param("postId") Long postId);

    // Attachment
    int insertAttachments(@Param("postId") Long postId, @Param("list") List<BoardAttachment> list);
    List<BoardAttachment> selectAttachments(@Param("postId") Long postId);
    int deleteAttachmentsByPost(@Param("postId") Long postId);
    int existsEnabledBoardType(@org.apache.ibatis.annotations.Param("typeKey") String typeKey);
}