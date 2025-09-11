package com.Happy100BE.Happy100.dto.response;

import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class UserResponseDto {
    private Integer userId;
    private String username;
    private String name;
    private String email;
    private boolean accountEnabled;
}
