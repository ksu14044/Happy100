package com.Happy100BE.Happy100.entity;

import lombok.*;
import java.time.LocalDateTime;

/**
 * post_tb와 1:1 매핑되는 엔티티(도메인 모델)
 * - contentJson은 JSON 문자열로 보관(서비스 레이어에서 유효성 검사)
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Post {
    private Integer postId;            // PK (INT AUTO_INCREMENT)
    private BoardType boardType;       // 게시판 종류 (ENUM)
    private String title;              // 제목
    private String contentJson;        // 본문(JSON 문자열: 텍스트/이미지/동영상 혼합)
    private Integer authorUserId;      // 작성자(user_tb.user_id)
    private QnaStatus qnaStatus;       // QnA일 때만 사용, 그 외 게시판은 null
    private LocalDateTime createdAt;   // DB DEFAULT CURRENT_TIMESTAMP
    private LocalDateTime updatedAt;   // DB ON UPDATE CURRENT_TIMESTAMP
}
