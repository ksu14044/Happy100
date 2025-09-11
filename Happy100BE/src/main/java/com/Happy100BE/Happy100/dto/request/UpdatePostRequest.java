package com.Happy100BE.Happy100.dto.request;

import com.Happy100BE.Happy100.entity.QnaStatus;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

/**
 * 게시글 수정 요청 DTO
 * - boardType은 변경하지 않습니다(서버에서 기존 값 유지).
 * - contentJson은 유효한 JSON 문자열이어야 합니다(서비스에서 검증).
 * - QNA 게시판일 경우에만 qnaStatus가 필요합니다.
 */
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class UpdatePostRequest {

    @NotBlank(message = "title은 비어 있을 수 없습니다.")
    private String title;

    @NotBlank(message = "contentJson은 비어 있을 수 없습니다. 유효한 JSON 문자열을 보내주세요.")
    private String contentJson;

    // QNA일 때만 사용 (그 외 게시판은 null 이어야 함)
    private QnaStatus qnaStatus;
}
