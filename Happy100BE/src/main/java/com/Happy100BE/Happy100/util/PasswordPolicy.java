package com.Happy100BE.Happy100.util;

public class PasswordPolicy {
    public static void validate(String password) {
        if (password == null) throw new IllegalArgumentException("비밀번호가 비어 있습니다.");
        int len = password.length(); if (len < 5 || len > 30) throw new IllegalArgumentException("비밀번호는 5자 이상 30자 이하여야 합니다."); }
}
