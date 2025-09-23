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
} from "./style";
import { submitCounselApplication } from "../../apis/counselApi";
import { useSearchParams } from "react-router-dom";

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
