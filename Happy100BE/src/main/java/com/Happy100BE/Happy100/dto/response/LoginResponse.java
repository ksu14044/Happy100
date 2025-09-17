package com.Happy100BE.Happy100.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;


@Data
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String tokenType; // "Bearer"
    private long expiresInSeconds;
    private String username;
}