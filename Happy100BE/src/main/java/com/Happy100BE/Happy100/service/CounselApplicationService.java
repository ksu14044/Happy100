package com.Happy100BE.Happy100.service;

import com.Happy100BE.Happy100.config.MailSenderAdapter;
import com.Happy100BE.Happy100.dto.request.CounselApplicationRequest;
import com.Happy100BE.Happy100.service.support.CounselApplicationType;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CounselApplicationService {

    private final MailSenderAdapter mailSenderAdapter;

    @Value("${app.contact.recipient-email}")
    private String recipientEmail;

    private static final DateTimeFormatter TIMESTAMP_FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    public void submit(CounselApplicationType type, CounselApplicationRequest request) {
        if (!Boolean.TRUE.equals(request.getPrivacyAgreement())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "개인정보 취급방침에 동의해야 상담 신청이 가능합니다.");
        }

        List<MailSenderAdapter.MailAttachment> attachments = mapAttachments(request);
        String mailSubject = "[Happy100 상담신청] " + type.getDisplayName() + " - " + safe(request.getSubject());
        String mailBody = buildBody(type, request);

        try {
            mailSenderAdapter.sendCounselMail(recipientEmail, mailSubject, mailBody, attachments);
        } catch (MessagingException e) {
            log.error("상담 신청 메일 전송 실패", e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "상담 신청 메일 전송 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
    }

    private List<MailSenderAdapter.MailAttachment> mapAttachments(CounselApplicationRequest request) {
        if (CollectionUtils.isEmpty(request.getAttachments())) {
            return List.of();
        }
        List<MailSenderAdapter.MailAttachment> results = new ArrayList<>();
        request.getAttachments().forEach(file -> {
            if (file == null || file.isEmpty()) {
                return;
            }
            try {
                String filename = file.getOriginalFilename();
                byte[] data = file.getBytes();
                String contentType = file.getContentType() != null ? file.getContentType() : "application/octet-stream";
                results.add(new MailSenderAdapter.MailAttachment(filename, data, contentType));
            } catch (Exception e) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "첨부파일을 읽는 중 오류가 발생했습니다.", e);
            }
        });
        return results;
    }

    private String buildBody(CounselApplicationType type, CounselApplicationRequest request) {
        StringBuilder sb = new StringBuilder();
        sb.append("<h2>상담 신청 접수</h2>");
        sb.append("<p>구분: ").append(HtmlUtils.htmlEscape(type.getDisplayName())).append("</p>");
        sb.append("<p>접수 시각: ").append(HtmlUtils.htmlEscape(LocalDateTime.now().format(TIMESTAMP_FORMATTER))).append("</p>");
        sb.append("<hr />");
        appendField(sb, "성명", request.getName());
        appendField(sb, "핸드폰", request.getPhone());
        appendField(sb, "이메일", request.getEmail());
        appendField(sb, "제목", request.getSubject());
        sb.append("<p>문의 내용:</p>");
        sb.append("<div style=\"white-space: pre-wrap; border:1px solid #ccc; padding:12px;\">");
        sb.append(HtmlUtils.htmlEscape(request.getMessage()));
        sb.append("</div>");
        sb.append("<p>개인정보 처리방침 동의: ").append(request.getPrivacyAgreement() ? "동의" : "미동의").append("</p>");
        int attachmentCount = request.getAttachments() == null ? 0 : (int) request.getAttachments().stream().filter(f -> f != null && !f.isEmpty()).count();
        sb.append("<p>첨부파일 수: ").append(attachmentCount).append("</p>");
        return sb.toString();
    }

    private void appendField(StringBuilder sb, String label, String value) {
        sb.append("<p>").append(HtmlUtils.htmlEscape(label)).append(": ")
                .append(HtmlUtils.htmlEscape(safe(value))).append("</p>");
    }

    private String safe(String value) {
        return value == null ? "" : value;
    }
}
