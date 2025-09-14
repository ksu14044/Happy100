package com.Happy100BE.Happy100.util;

import java.security.SecureRandom;

public class RandomCode {
    private static final SecureRandom RND = new SecureRandom();
    public static String sixDigit() {
        return String.format("%06d", RND.nextInt(1_000_000));
    }
    public static String opaqueToken() {
        byte[] buf = new byte[32];
        RND.nextBytes(buf);
        StringBuilder sb = new StringBuilder(64);
        for (byte b : buf) sb.append(String.format("%02x", b));
        return sb.toString(); }
}
