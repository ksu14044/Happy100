package com.Happy100BE.Happy100.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PasswordFindConfirmRequest {
    @NotBlank
    private String resetToken;
    @NotBlank
    @Size(min = 5, max = 30, message = "비밀번호는 5자 이상 30자 이하여야 합니다.")
    private String newPassword;
}
