package com.Happy100BE.Happy100.entity;

/**
 * QnA 전용 상태 ENUM
 * DB의 post_tb.qna_status ENUM('PENDING','COMPLETED')와 1:1로 매핑됩니다.
 * QnA가 아닌 게시판에서는 NULL이어야 합니다(DDL의 CHECK 제약으로 보조).
 */
public enum QnaStatus {
    PENDING,    // 상담대기
    COMPLETED   // 상담완료
}
