package com.Happy100BE.Happy100.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DuplicateCheckResponseDto {
    private String field;      // "username" or "email"
    private String value;      // 확인한 값
    private boolean duplicate; // true = 중복 있음, false = 사용 가능
}
