package com.Happy100BE.Happy100.mapper;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class FulltextKeywordHelperTest {

    @Test
    @DisplayName("단일 토큰에는 접두 와일드카드가 추가된다")
    void singleTokenAppendsWildcard() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("행복"))
                .isEqualTo("행복*");
    }

    @Test
    @DisplayName("여러 토큰은 공백 기준으로 각각 가공된다")
    void multipleTokensProcessedIndividually() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("행복 테스트"))
                .isEqualTo("행복* 테스트*");
    }

    @Test
    @DisplayName("이미 와일드카드를 가진 토큰은 변경되지 않는다")
    void tokenWithExistingWildcardIsNotChanged() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("행복*"))
                .isEqualTo("행복*");
    }

    @Test
    @DisplayName("불리언 모드 접두와 괄호는 유지하면서 와일드카드를 덧붙인다")
    void booleanPrefixAndParenthesisArePreserved() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("+행복)"))
                .isEqualTo("+행복*)");
    }

    @Test
    @DisplayName("문자열 따옴표가 포함된 토큰은 가공하지 않는다")
    void quotedTokenRemainsUntouched() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("\"행복\""))
                .isEqualTo("\"행복\"");
    }

    @Test
    @DisplayName("구두점이 뒤따르는 경우에도 본문에만 와일드카드가 붙는다")
    void punctuationSuffixKeepsWildcardInside() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("행복,"))
                .isEqualTo("행복*,");
    }

    @Test
    @DisplayName("공백뿐인 검색어는 null을 반환한다")
    void blankKeywordReturnsNull() {
        assertThat(FulltextKeywordHelper.toBooleanModeKeyword("   "))
                .isNull();
    }
}
