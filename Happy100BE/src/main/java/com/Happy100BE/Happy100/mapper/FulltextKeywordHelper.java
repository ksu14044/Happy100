package com.Happy100BE.Happy100.mapper;

import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * MySQL BOOLEAN MODE용 검색어 가공 유틸리티.
 * 짧은 토큰에 접두 와일드카드(*)를 덧붙여 접두 검색이 가능하도록 한다.
 * MyBatis XML에서 정적 메서드 호출로 사용한다.
 */
public final class FulltextKeywordHelper {

    private static final String BOOLEAN_PREFIX_CHARS = "+-<>()~";
    private static final String BOOLEAN_SUFFIX_CHARS = ")]>.,;?!";

    private FulltextKeywordHelper() {
    }

    public static String toBooleanModeKeyword(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }

        String trimmed = keyword.trim();
        String[] rawTokens = trimmed.split("\\s+");
        List<String> processed = new ArrayList<>(rawTokens.length);

        for (String token : rawTokens) {
            if (!StringUtils.hasText(token)) {
                continue;
            }
            processed.add(applyPrefixWildcard(token));
        }

        if (processed.isEmpty()) {
            return trimmed;
        }
        return String.join(" ", processed);
    }

    private static String applyPrefixWildcard(String token) {
        if (token.indexOf('"') >= 0 || token.indexOf('*') >= 0) {
            return token;
        }

        int prefixEnd = findPrefixEnd(token);
        int suffixStart = findSuffixStart(token, prefixEnd);

        String prefix = token.substring(0, prefixEnd);
        String core = token.substring(prefixEnd, suffixStart);
        String suffix = token.substring(suffixStart);

        if (!StringUtils.hasText(core)) {
            return token;
        }

        return prefix + core + '*' + suffix;
    }

    private static int findPrefixEnd(String token) {
        int idx = 0;
        while (idx < token.length() && BOOLEAN_PREFIX_CHARS.indexOf(token.charAt(idx)) >= 0) {
            idx++;
        }
        return idx;
    }

    private static int findSuffixStart(String token, int start) {
        int idx = token.length();
        while (idx > start && BOOLEAN_SUFFIX_CHARS.indexOf(token.charAt(idx - 1)) >= 0) {
            idx--;
        }
        return idx;
    }
}
