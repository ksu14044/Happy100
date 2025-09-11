package com.Happy100BE.Happy100.dto.response;

import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.entity.QnaStatus;
import lombok.*;

import java.time.LocalDateTime;

/**
 * 등록 결과(또는 조회) 응답 DTO
 * - 프론트/Swagger에서 바로 보기 편한 구조
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class PostResponseDto {
    private Integer postId;
    private BoardType boardType;
    private String title;
    private String contentJson;
    private Integer authorUserId;
    private QnaStatus qnaStatus;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
