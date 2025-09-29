import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    PageWrap,
    Title,
    TabRow,
    TabButton,
    Form,
    Row,
    Label,
    Input,
    Textarea,
    FileInput,
    FileInfo,
    CheckboxRow,
    SubmitButton,
    StatusMessage,
    Description,
    PolicyBox,
    Collapsible,
    CollapsibleSummary,
} from "./style";
import { submitCounselApplication } from "../../apis/counselApi";
import { useSearchParams } from "react-router-dom";
import { CONTACT_INFO } from "../../data/brandContent.js";

const TABS = [
    { code: "branch", label: "지사 신청" },
    { code: "certificate", label: "자격증반 신청" },
];

const createInitialForm = () => ({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
    attachments: [],
    privacyAgreement: false,
});

const getValidTab = (code) => (TABS.some((tab) => tab.code === code) ? code : TABS[0].code);

export default function CounselPage() {
    const [searchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState(() => getValidTab(searchParams.get("type")));
    const [form, setForm] = useState(() => createInitialForm());
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: null, message: "" });
    const fileInputRef = useRef(null);

    const resetForm = useCallback(() => {
        setForm(createInitialForm());
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);

    useEffect(() => {
        const next = getValidTab(searchParams.get("type"));
        setActiveTab((prev) => {
            if (prev === next) return prev;
            resetForm();
            setStatus({ type: null, message: "" });
            return next;
        });
    }, [searchParams, resetForm]);

    const activeLabel = useMemo(
        () => TABS.find((tab) => tab.code === activeTab)?.label ?? "",
        [activeTab]
    );

    const onChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setForm((prev) => {
            if (type === "file") {
                return { ...prev, attachments: Array.from(files || []) };
            }
            if (type === "checkbox") {
                return { ...prev, [name]: checked };
            }
            return { ...prev, [name]: value };
        });
    };

    const validate = () => {
        if (!form.name.trim()) return "성명을 입력해 주세요.";
        if (!form.phone.trim()) return "연락처를 입력해 주세요.";
        if (!form.email.trim()) return "이메일을 입력해 주세요.";
        if (!form.subject.trim()) return "제목을 입력해 주세요.";
        if (!form.message.trim()) return "문의 내용을 입력해 주세요.";
        if (!form.privacyAgreement) return "개인정보 취급방침에 동의해야 신청할 수 있습니다.";
        return null;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: null, message: "" });

        const validationError = validate();
        if (validationError) {
            setStatus({ type: "error", message: validationError });
            return;
        }

        setLoading(true);
        try {
            await submitCounselApplication(activeTab, form);
            setStatus({ type: "success", message: `${activeLabel} 신청이 접수되었습니다.` });
            resetForm();
        } catch (err) {
            const message = err?.response?.data?.message || err?.message || "신청 중 오류가 발생했습니다.";
            setStatus({ type: "error", message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrap>
            <Title>상담 신청</Title>
            <Description>
                행복백세에 관심을 가져 주셔서 감사합니다. 신청 유형을 선택하고 필요한 정보를 입력해 주시면 담당자가 확인 후 연락드립니다.
            </Description>
            <TabRow role="tablist" aria-label="상담 유형 선택">
                {TABS.map((tab) => (
                    <TabButton
                        key={tab.code}
                        role="tab"
                        type="button"
                        aria-selected={activeTab === tab.code}
                        onClick={() => {
                            setActiveTab(tab.code);
                            setStatus({ type: null, message: "" });
                        }}
                        active={activeTab === tab.code}
                    >
                        {tab.label}
                    </TabButton>
                ))}
            </TabRow>

            <Form onSubmit={onSubmit} encType="multipart/form-data">
                <Row>
                    <Label htmlFor="name">성명</Label>
                    <Input id="name" name="name" value={form.name} onChange={onChange} placeholder="이름을 입력하세요" required />
                </Row>
                <Row>
                    <Label htmlFor="phone">핸드폰</Label>
                    <Input id="phone" name="phone" value={form.phone} onChange={onChange} placeholder="연락 가능한 번호" required />
                </Row>
                <Row>
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="이메일 주소" required />
                </Row>
                <Row>
                    <Label htmlFor="subject">제목</Label>
                    <Input id="subject" name="subject" value={form.subject} onChange={onChange} placeholder={`${activeLabel} 관련 제목`} required />
                </Row>
                <Row>
                    <Label htmlFor="message">문의내용</Label>
                    <Textarea id="message" name="message" value={form.message} onChange={onChange} placeholder="상세 문의 내용을 입력해 주세요." required />
                </Row>
                <Row>
                    <Label htmlFor="attachments">첨부파일</Label>
                    <div>
                        <FileInput
                            id="attachments"
                            name="attachments"
                            type="file"
                            multiple
                            onChange={onChange}
                            ref={fileInputRef}
                        />
                        {form.attachments.length > 0 && (
                            <FileInfo>{form.attachments.length}개의 파일이 선택되었습니다.</FileInfo>
                        )}
                    </div>
                </Row>
                <CheckboxRow>
                    <input
                        id="privacyAgreement"
                        type="checkbox"
                        name="privacyAgreement"
                        checked={form.privacyAgreement}
                        onChange={onChange}
                    />
                    <label htmlFor="privacyAgreement">개인정보 취급방침에 동의합니다.</label>
                </CheckboxRow>

                <Collapsible>
                    <CollapsibleSummary>개인정보 수집·이용 안내</CollapsibleSummary>
                    <PolicyBox role="region" aria-label="개인정보 수집·이용 안내">
                        <strong>개인정보 수집·이용 안내</strong>
                        <ul>
                            <li>수집 항목: 성명, 연락처(휴대전화), 이메일, 문의 제목·내용, 첨부파일(선택), 신청 유형(지사/자격증반)</li>
                            <li>수집·이용 목적: 상담 신청 확인 및 회신, 서비스 안내, 민원 처리 및 분쟁 대응</li>
                            <li>보유·이용 기간: 서버 DB에 저장하지 않으며, 접수·회신 등 처리 완료 즉시 서버 내 정보는 파기합니다. 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관 후 파기합니다.</li>
                            <li>저장 방식: 서버 DB 미저장. 접수된 내용은 내부 메일/업무도구로 전달하여 처리합니다.</li>
                            <li>동의 거부 권리 및 불이익: 동의를 거부할 권리가 있으나, 미동의 시 상담 접수 및 응대가 제한될 수 있습니다.</li>
                            <li>제3자 제공/처리위탁: 제3자에게 제공하지 않으며, 위탁이 필요한 경우 사전에 고지하고 동의를 받습니다.</li>
                            <li>자동 수집 정보: 보안 목적의 시스템 접근 로그 등은 법령에 따라 일정 기간 보관될 수 있습니다.</li>
                            <li>개인정보 처리 책임자/문의: 운영기관 {CONTACT_INFO.operator}, 문의 {CONTACT_INFO.phone} / {CONTACT_INFO.email}</li>
                        </ul>
                    </PolicyBox>
                </Collapsible>

                {status.message && (
                    <StatusMessage data-variant={status.type}>{status.message}</StatusMessage>
                )}

                <SubmitButton type="submit" disabled={loading}>
                    {loading ? "접수 중..." : `${activeLabel}하기`}
                </SubmitButton>
            </Form>
        </PageWrap>
    );
}
