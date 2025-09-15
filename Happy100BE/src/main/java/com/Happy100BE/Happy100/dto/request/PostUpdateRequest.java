package com.Happy100BE.Happy100.dto.request;

import lombok.Data;
import java.util.List;

@Data
public class PostUpdateRequest {
    private Long postId;
    private String title;
    private String contentJson;
    private List<AttachmentRequest> attachments; // 전체 교체 전략
}

