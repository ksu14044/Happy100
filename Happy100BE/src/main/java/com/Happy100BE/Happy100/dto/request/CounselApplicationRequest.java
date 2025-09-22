package com.Happy100BE.Happy100.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Setter
public class CounselApplicationRequest {

    @NotBlank(message = "성명을 입력해 주세요.")
    private String name;

    @NotBlank(message = "연락처를 입력해 주세요.")
    private String phone;

    @Email(message = "이메일 형식이 올바르지 않습니다.")
    @NotBlank(message = "이메일을 입력해 주세요.")
    private String email;

    @NotBlank(message = "제목을 입력해 주세요.")
    private String subject;

    @NotBlank(message = "문의 내용을 입력해 주세요.")
    private String message;

    private Boolean privacyAgreement;

    private List<MultipartFile> attachments;
}
