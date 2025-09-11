package com.Happy100BE.Happy100.dto.request;

import com.Happy100BE.Happy100.entity.BoardType;
import com.Happy100BE.Happy100.entity.QnaStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

/**
 * 게시글 등록 요청 DTO
 * - contentJson은 '문자열 형태의 유효한 JSON'이어야 합니다.
 *   (서비스에서 ObjectMapper로 실제 JSON 유효성 검증)
 * - QNA 게시판일 경우 qnaStatus 필수, 그 외 게시판은 null로 보내주세요.
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class CreatePostRequest {

    @NotNull(message = "boardType은 필수입니다.")
    private BoardType boardType;

    @NotBlank(message = "title은 비어 있을 수 없습니다.")
    private String title;

    @NotBlank(message = "contentJson은 비어 있을 수 없습니다. 유효한 JSON 문자열을 보내주세요.")
    private String contentJson;

    // QNA 게시판일 때만 유효합니다.
    private QnaStatus qnaStatus;
}
