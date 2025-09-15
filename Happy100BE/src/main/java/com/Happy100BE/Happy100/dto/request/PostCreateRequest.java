package com.Happy100BE.Happy100.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class PostCreateRequest {
    private String boardType;      // "NEWS" | "SHOP"
    private String title;
    private String contentJson;    // 문자열 JSON
    private Integer authorId;      // user_tb.user_id (INT)
    private List<AttachmentRequest> attachments;
}

