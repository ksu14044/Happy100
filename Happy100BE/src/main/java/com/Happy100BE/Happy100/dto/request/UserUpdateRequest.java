package com.Happy100BE.Happy100.dto.request;

import lombok.Data;

@Data
public class UserUpdateRequest {
    // 관리자 수정 필드: 이름, 이메일, 권한(roleId), 활성화 여부
    private String name;
    private String email;
    private Integer roleId;
    private Integer accountEnabled; // 0: 활성, 1: 비활성
}

