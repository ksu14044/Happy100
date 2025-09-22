package com.Happy100BE.Happy100.config;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

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

    public void sendCounselMail(String to,
                                String subject,
                                String htmlBody,
                                List<MailAttachment> attachments) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        boolean hasAttachments = !CollectionUtils.isEmpty(attachments);
        MimeMessageHelper helper = new MimeMessageHelper(message, hasAttachments, StandardCharsets.UTF_8.name());
        helper.setTo(to);
        helper.setFrom(fromAddress);
        helper.setSubject(subject);
        helper.setText(htmlBody, true);

        List<MailAttachment> safeAttachments = attachments == null ? Collections.emptyList() : attachments;
        for (MailAttachment attachment : safeAttachments) {
            if (attachment == null || attachment.data() == null || attachment.data().length == 0) {
                continue;
            }
            helper.addAttachment(attachment.filename(), new ByteArrayResource(attachment.data()) {
                @Override
                public String getFilename() {
                    return attachment.filename();
                }
            }, attachment.contentType());
        }

        javaMailSender.send(message);
    }

    public record MailAttachment(String filename, byte[] data, String contentType) { }
}
