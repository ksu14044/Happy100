package com.Happy100BE.Happy100.repository;

import com.Happy100BE.Happy100.entity.BoardPost;
import com.Happy100BE.Happy100.entity.BoardAttachment;
import com.Happy100BE.Happy100.mapper.BoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class BoardRepository {

    private final BoardMapper boardMapper;

    public Long insertPost(BoardPost post, List<BoardAttachment> attachments) {
        boardMapper.insertPost(post);
        Long postId = post.getPostId();
        if (attachments != null && !attachments.isEmpty()) {
            boardMapper.insertAttachments(postId, attachments);
        }
        return postId;
    }

    public BoardPost findPost(Long postId) {
        return boardMapper.selectPostById(postId);
    }

    public List<BoardPost> findPostList(String boardType, int offset, int limit) {
        return boardMapper.selectPostList(boardType, offset, limit);
    }

    public List<BoardAttachment> findAttachments(Long postId) {
        return boardMapper.selectAttachments(postId);
    }

    public BoardAttachment findAttachment(Long attachmentId) {
        return boardMapper.selectAttachmentById(attachmentId);
    }

    public int updatePost(BoardPost post, List<BoardAttachment> newAttachments) {
        int updated = boardMapper.updatePost(post);
        boardMapper.deleteAttachmentsByPost(post.getPostId());
        if (newAttachments != null && !newAttachments.isEmpty()) {
            boardMapper.insertAttachments(post.getPostId(), newAttachments);
        }
        return updated;
    }

    public int softDelete(Long postId) {
        return boardMapper.softDeletePost(postId);
    }

    public void increaseView(Long postId) {
        boardMapper.increaseViewCount(postId);
    }

    public boolean existsEnabledBoardType(String typeKey) {
        return boardMapper.existsEnabledBoardType(typeKey) > 0;
    }

    public int countPostsByBoardType(String boardType) {
        return boardMapper.countPostsByBoardType(boardType);
    }
}
