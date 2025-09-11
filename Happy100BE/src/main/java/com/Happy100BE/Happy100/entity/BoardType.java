package com.Happy100BE.Happy100.entity;

/**
 * 게시판 종류 ENUM
 * DB의 post_tb.board_type ENUM('NOTICE','CLASS','SHOP','QNA')와 1:1로 매핑됩니다.
 * MyBatis는 기본 EnumTypeHandler로 name()을 문자열로 저장/조회합니다.
 */
public enum BoardType {
    NOTICE,  // 공지사항
    CLASS,   // 자격증 반
    SHOP,    // 쇼핑몰
    QNA      // QnA 상담
}
