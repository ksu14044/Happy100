package com.Happy100BE.Happy100.dto.response;

import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.entity.QnaStatus;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 게시글 목록(리스트)에서 사용하는 요약 DTO
 * - 내용(contentJson)은 목록에서 무겁기 때문에 제외
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class PostListItemDto {
    private Integer postId;
    private BoardType boardType;
    private String title;
    private Integer authorUserId;
    private QnaStatus qnaStatus;      // QNA일 때만 값, 그 외 null
    private LocalDateTime createdAt;
}
