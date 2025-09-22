package com.Happy100BE.Happy100.service.support;

import java.util.Arrays;

public enum CounselApplicationType {
    BRANCH("branch", "지사 신청"),
    CERTIFICATE("certificate", "자격증반 신청");

    private final String code;
    private final String displayName;

    CounselApplicationType(String code, String displayName) {
        this.code = code;
        this.displayName = displayName;
    }

    public String getCode() {
        return code;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static CounselApplicationType fromCode(String code) {
        return Arrays.stream(values())
                .filter(type -> type.code.equalsIgnoreCase(code))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("지원하지 않는 상담 종류입니다: " + code));
    }
}
