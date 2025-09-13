package com.Happy100BE.Happy100.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    private Integer userId;
    private String username;
    private String password;
    private String name;
    private String email;
    private Integer roleId;
    private Integer accountEnabled;
    private LocalDateTime createdAt;

    // 조인 결과 보관용(선택)
    private String roleName;
}
