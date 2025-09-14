package com.Happy100BE.Happy100.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HexFormat;

public class Hashing {
    public static String sha256(String value) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            return HexFormat.of().formatHex(md.digest(value.getBytes(StandardCharsets.UTF_8))); }
        catch (Exception e) {
            throw new IllegalStateException("해시 생성 중 오류가 발생했습니다.");
        }
    }
}
