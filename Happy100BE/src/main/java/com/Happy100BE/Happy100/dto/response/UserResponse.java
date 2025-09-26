package com.Happy100BE.Happy100.dto.response;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserResponse {
    private Integer userId;
    private String username;
    private String name;
    private String email;
    private Integer roleId;
    private String roleName;
    private Integer accountEnabled;
    private LocalDateTime createdAt;
}

