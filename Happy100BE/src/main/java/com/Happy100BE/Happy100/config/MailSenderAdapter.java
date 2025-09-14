package com.Happy100BE.Happy100.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailSenderAdapter {
    private final JavaMailSender javaMailSender;

    @Value("${MAIL_USERNAME}")
    private String fromAddress;

    public void sendCode(String to, String code, long minutesTtl) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(to);
        msg.setSubject("비밀번호 재설정 인증코드");
        msg.setText("인증코드: " + code + "\n유효시간: " + minutesTtl + "분\n타인에게 공유하지 마세요.");
        msg.setFrom(fromAddress);
        javaMailSender.send(msg);
    }
}
