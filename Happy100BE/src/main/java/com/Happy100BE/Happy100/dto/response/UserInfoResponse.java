package com.Happy100BE.Happy100.dto.response;


import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserInfoResponse {
    private Integer userId;
    private String username;
    private String name;
    private String email;
    private String role; // ROLE_*
}