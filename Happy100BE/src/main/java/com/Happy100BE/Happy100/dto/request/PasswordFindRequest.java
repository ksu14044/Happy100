package com.Happy100BE.Happy100.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class PasswordFindRequest  {
    
    @NotBlank
    private String username;

    @NotBlank
    @Email
    private String email;

}
