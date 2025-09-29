import React, { useState } from "react";
import {
    PageWrap,
    Card,
    Title,
    Form,
    Row,
    Label,
    Input,
    Actions,
    PrimaryButton,
    GhostButton,
    MutedLinkRow,
    MutedLink,
    Divider,
    OAuthRow,
    OAuthBtn,
    OAuthIcon,
    Small,
    ModalOverlay,
    ModalCard,
    ModalHeader,
    ModalTitle,
    CloseButton,
    ModalBody,
    ModalForm,
    ModalFooter,
    HelperText,
    ErrorText,
    SuccessText,
    ModalPrimaryButton,
} from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../../../configs/axiosConfig";
import {
    loginApi,
    findUsernameByEmail,
    requestPasswordResetCode,
    verifyPasswordResetCode,
    confirmPasswordReset,
} from "../../../apis/authApi";
import googleLogo from "../../../assets/images/google-logo.png";
import naverLogo from "../../../assets/images/naver-logo.svg";
import kakaoLogo from "../../../assets/images/kakao-logo.svg";

const API_BASE_URL = import.meta.env.DEV
    ? "" // dev: Vite proxy 사용 → 동일 오리진 경로로 이동
    : (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

export default function LoginPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [showFindIdModal, setShowFindIdModal] = useState(false);
    const [idEmail, setIdEmail] = useState("");
    const [idResult, setIdResult] = useState("");
    const [idError, setIdError] = useState("");
    const [idLoading, setIdLoading] = useState(false);
    const [showFindPwModal, setShowFindPwModal] = useState(false);
    const [pwStep, setPwStep] = useState("request");
    const [pwForm, setPwForm] = useState({
        username: "",
        email: "",
        code: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [pwToken, setPwToken] = useState("");
    const [pwMessage, setPwMessage] = useState("");
    const [pwError, setPwError] = useState("");
    const [pwLoading, setPwLoading] = useState(false);

    const onChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            await loginApi(form);      // 서버가 쿠키로 세션 설정
            // 세션이 생겼으니 실제 사용자 정보로 preview 갱신
            try {
                const me = await api.get('/api/users/me', { validateStatus: (s) => s === 200 });
                const d = me?.data || {};
                let role = d.role || d.roleName || null;
                if (!role && Array.isArray(d.authorities)) {
                    const found = d.authorities.find((r) => typeof r === 'string' && r.includes('ROLE_'));
                    role = found || null;
                }
                const preview = { name: d.name || d.username || '회원', role: role || 'ROLE_USER' };
                localStorage.setItem('user_preview', JSON.stringify(preview));
            } catch {}
            await queryClient.invalidateQueries({ queryKey: ['user','me'] });
            navigate("/");            // 성공 후 이동
        } catch (e) {
            setErr(e?.response?.data?.message || e.message || "로그인 실패");
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const resetFindIdState = () => {
        setIdEmail("");
        setIdResult("");
        setIdError("");
        setIdLoading(false);
    };

    const openFindIdModal = () => {
        resetFindIdState();
        setShowFindIdModal(true);
    };

    const closeFindIdModal = () => {
        setShowFindIdModal(false);
    };

    const handleFindIdSubmit = async (e) => {
        e.preventDefault();
        setIdError("");
        setIdResult("");
        const email = idEmail.trim();
        if (!email) {
            setIdError("이메일을 입력해주세요.");
            return;
        }
        setIdLoading(true);
        try {
            const username = await findUsernameByEmail(email);
            setIdResult(username);
        } catch (error) {
            if (error?.response?.status === 404) {
                setIdError("해당 이메일로 가입된 아이디를 찾을 수 없습니다.");
            } else {
                setIdError(error?.response?.data?.message || error.message || "아이디를 찾을 수 없습니다.");
            }
        } finally {
            setIdLoading(false);
        }
    };

    const resetPwState = () => {
        setPwForm({
            username: "",
            email: "",
            code: "",
            newPassword: "",
            confirmPassword: "",
        });
        setPwToken("");
        setPwStep("request");
        setPwMessage("");
        setPwError("");
        setPwLoading(false);
    };

    const openFindPwModal = () => {
        resetPwState();
        setShowFindPwModal(true);
    };

    const closeFindPwModal = () => {
        setShowFindPwModal(false);
        resetPwState();
    };

    const handlePwFormChange = (e) => {
        const { name, value } = e.target;
        setPwForm((prev) => ({ ...prev, [name]: value }));
    };

    const handlePwRequest = async (e) => {
        e.preventDefault();
        setPwError("");
        setPwMessage("");
        const username = pwForm.username.trim();
        const email = pwForm.email.trim();
        if (!username || !email) {
            setPwError("아이디와 이메일을 모두 입력해주세요.");
            return;
        }
        setPwLoading(true);
        try {
            await requestPasswordResetCode({ username, email });
            setPwMessage("인증 코드가 이메일로 발송되었습니다.");
            setPwStep("verify");
        } catch (error) {
            setPwError(error?.response?.data?.message || error.message || "인증 코드를 요청할 수 없습니다.");
        } finally {
            setPwLoading(false);
        }
    };

    const handlePwVerify = async (e) => {
        e.preventDefault();
        setPwError("");
        setPwMessage("");
        const code = pwForm.code.trim();
        if (!code) {
            setPwError("이메일로 받은 6자리 코드를 입력해주세요.");
            return;
        }
        setPwLoading(true);
        try {
            const token = await verifyPasswordResetCode({
                username: pwForm.username.trim(),
                email: pwForm.email.trim(),
                code,
            });
            if (!token) {
                throw new Error("리셋 토큰을 발급받지 못했습니다.");
            }
            setPwToken(token);
            setPwMessage("인증이 완료되었습니다. 새 비밀번호를 입력해주세요.");
            setPwStep("confirm");
        } catch (error) {
            setPwError(error?.response?.data?.message || error.message || "인증 코드 확인에 실패했습니다.");
        } finally {
            setPwLoading(false);
        }
    };

    const handlePwConfirm = async (e) => {
        e.preventDefault();
        setPwError("");
        setPwMessage("");
        if (!pwToken) {
            setPwError("인증 절차를 먼저 완료해주세요.");
            return;
        }
        if (pwForm.newPassword.trim().length < 5) {
            setPwError("비밀번호는 5자 이상이어야 합니다.");
            return;
        }
        if (pwForm.newPassword !== pwForm.confirmPassword) {
            setPwError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
            return;
        }
        setPwLoading(true);
        try {
            await confirmPasswordReset({
                resetToken: pwToken,
                newPassword: pwForm.newPassword,
            });
            setPwMessage("비밀번호가 변경되었습니다. 새 비밀번호로 로그인해주세요.");
            setPwStep("done");
        } catch (error) {
            setPwError(error?.response?.data?.message || error.message || "비밀번호 재설정에 실패했습니다.");
        } finally {
            setPwLoading(false);
        }
    };

    const handleOAuthLogin = (provider) => {
        const providerPath = provider.toLowerCase();
        // dev: Vite proxy('/oauth2')를 통해 동일 오리진 상대 경로 사용
        // prod: VITE_API_BASE_URL 기반 절대 경로 사용
        const base = API_BASE_URL || "";
        window.location.href = `${base}/oauth2/authorization/${providerPath}`;
    };

    return (
        <PageWrap>
            <Card>
                <Title>로그인</Title>

                <Form onSubmit={onSubmit}>
                    <Row>
                        <Label htmlFor="username">아이디</Label>
                        <Input
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={onChange}
                            placeholder="아이디를 입력하세요"
                            autoComplete="username"
                            required
                        />
                    </Row>

                    <Row>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            placeholder="비밀번호를 입력하세요"
                            autoComplete="current-password"
                            required
                        />
                    </Row>

                    <Actions>
                        <GhostButton type="button" onClick={openFindIdModal}>
                            아이디 찾기
                        </GhostButton>
                        <GhostButton type="button" onClick={openFindPwModal}>
                            비밀번호 찾기
                        </GhostButton>
                    </Actions>

                    {err && <ErrorText role="alert">{err}</ErrorText>}

                    <PrimaryButton type="submit" disabled={loading}>
                        {loading ? "로그인 중…" : "로그인"}
                    </PrimaryButton>
                </Form>

                <Divider />

                <OAuthRow>
                    <OAuthBtn data-provider="google" type="button" onClick={() => handleOAuthLogin("google")}>
                        <OAuthIcon aria-hidden="true">
                            <img src={googleLogo} alt="" loading="lazy" />
                        </OAuthIcon>
                        Google로 계속하기
                    </OAuthBtn>
                    <OAuthBtn data-provider="naver" type="button" onClick={() => handleOAuthLogin("naver")}>
                        <OAuthIcon aria-hidden="true">
                            <img src={naverLogo} alt="" loading="lazy" />
                        </OAuthIcon>
                        네이버로 계속하기
                    </OAuthBtn>
                    <OAuthBtn data-provider="kakao" type="button" onClick={() => handleOAuthLogin("kakao")}>
                        <OAuthIcon aria-hidden="true">
                            <img src={kakaoLogo} alt="" loading="lazy" />
                        </OAuthIcon>
                        카카오로 계속하기
                    </OAuthBtn>
                </OAuthRow>

                <MutedLinkRow>
                    <Small>계정이 없으신가요?</Small>
                    <MutedLink as={Link} to="/signup" onClick={() => navigate("/signup")}>
                        회원가입
                    </MutedLink>
                </MutedLinkRow>
            </Card>

            {showFindIdModal && (
                <ModalOverlay role="dialog" aria-modal="true">
                    <ModalCard>
                        <ModalHeader>
                            <ModalTitle>아이디 찾기</ModalTitle>
                            <CloseButton type="button" aria-label="닫기" onClick={closeFindIdModal}>
                                ×
                            </CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            <ModalForm onSubmit={handleFindIdSubmit}>
                                <Row>
                                    <Label htmlFor="find-id-email">가입 이메일</Label>
                                    <Input
                                        id="find-id-email"
                                        type="email"
                                        value={idEmail}
                                        onChange={(e) => setIdEmail(e.target.value)}
                                        placeholder="가입 시 사용한 이메일을 입력하세요"
                                        required
                                    />
                                </Row>
                                {idError && <ErrorText>{idError}</ErrorText>}
                                {idResult && (
                                    <SuccessText>
                                        가입된 아이디는 <strong>{idResult}</strong> 입니다.
                                    </SuccessText>
                                )}
                                <ModalFooter>
                                    <GhostButton type="button" onClick={closeFindIdModal}>
                                        닫기
                                    </GhostButton>
                                    <ModalPrimaryButton type="submit" disabled={idLoading}>
                                        {idLoading ? "조회 중..." : "아이디 찾기"}
                                    </ModalPrimaryButton>
                                </ModalFooter>
                            </ModalForm>
                        </ModalBody>
                    </ModalCard>
                </ModalOverlay>
            )}

            {showFindPwModal && (
                <ModalOverlay role="dialog" aria-modal="true">
                    <ModalCard>
                        <ModalHeader>
                            <ModalTitle>비밀번호 찾기</ModalTitle>
                            <CloseButton type="button" aria-label="닫기" onClick={closeFindPwModal}>
                                ×
                            </CloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {pwMessage && <SuccessText>{pwMessage}</SuccessText>}
                            {pwError && <ErrorText>{pwError}</ErrorText>}

                            {pwStep === "request" && (
                                <ModalForm onSubmit={handlePwRequest}>
                                    <Row>
                                        <Label htmlFor="pw-username">아이디</Label>
                                        <Input
                                            id="pw-username"
                                            name="username"
                                            value={pwForm.username}
                                            onChange={handlePwFormChange}
                                            placeholder="가입한 아이디를 입력하세요"
                                            autoComplete="username"
                                            required
                                        />
                                    </Row>
                                    <Row>
                                        <Label htmlFor="pw-email">가입 이메일</Label>
                                        <Input
                                            id="pw-email"
                                            name="email"
                                            type="email"
                                            value={pwForm.email}
                                            onChange={handlePwFormChange}
                                            placeholder="가입 시 사용한 이메일"
                                            autoComplete="email"
                                            required
                                        />
                                    </Row>
                                    <HelperText>
                                        입력하신 이메일로 인증 코드가 발송됩니다.
                                    </HelperText>
                                    <ModalFooter>
                                        <GhostButton type="button" onClick={closeFindPwModal}>
                                            닫기
                                        </GhostButton>
                                        <ModalPrimaryButton type="submit" disabled={pwLoading}>
                                            {pwLoading ? "요청 중..." : "인증 코드 받기"}
                                        </ModalPrimaryButton>
                                    </ModalFooter>
                                </ModalForm>
                            )}

                            {pwStep === "verify" && (
                                <ModalForm onSubmit={handlePwVerify}>
                                    <HelperText>
                                        {pwForm.email} 로 전송된 6자리 인증 코드를 입력해주세요.
                                    </HelperText>
                                    <Row>
                                        <Label htmlFor="pw-code">인증 코드</Label>
                                        <Input
                                            id="pw-code"
                                            name="code"
                                            value={pwForm.code}
                                            onChange={handlePwFormChange}
                                            placeholder="6자리 숫자 코드"
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            required
                                        />
                                    </Row>
                                    <ModalFooter>
                                        <GhostButton type="button" onClick={closeFindPwModal}>
                                            닫기
                                        </GhostButton>
                                        <ModalPrimaryButton type="submit" disabled={pwLoading}>
                                            {pwLoading ? "확인 중..." : "인증하기"}
                                        </ModalPrimaryButton>
                                    </ModalFooter>
                                </ModalForm>
                            )}

                            {pwStep === "confirm" && (
                                <ModalForm onSubmit={handlePwConfirm}>
                                    <HelperText>새롭게 사용할 비밀번호를 입력해주세요.</HelperText>
                                    <Row>
                                        <Label htmlFor="pw-new">새 비밀번호</Label>
                                        <Input
                                            id="pw-new"
                                            name="newPassword"
                                            type="password"
                                            value={pwForm.newPassword}
                                            onChange={handlePwFormChange}
                                            placeholder="새 비밀번호"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </Row>
                                    <Row>
                                        <Label htmlFor="pw-confirm">새 비밀번호 확인</Label>
                                        <Input
                                            id="pw-confirm"
                                            name="confirmPassword"
                                            type="password"
                                            value={pwForm.confirmPassword}
                                            onChange={handlePwFormChange}
                                            placeholder="새 비밀번호 확인"
                                            autoComplete="new-password"
                                            required
                                        />
                                    </Row>
                                    <ModalFooter>
                                        <GhostButton type="button" onClick={closeFindPwModal}>
                                            닫기
                                        </GhostButton>
                                        <ModalPrimaryButton type="submit" disabled={pwLoading}>
                                            {pwLoading ? "변경 중..." : "비밀번호 변경"}
                                        </ModalPrimaryButton>
                                    </ModalFooter>
                                </ModalForm>
                            )}

                            {pwStep === "done" && (
                                <>
                                    <SuccessText>
                                        비밀번호가 성공적으로 변경되었습니다. 변경된 비밀번호로 로그인해주세요.
                                    </SuccessText>
                                    <ModalFooter>
                                        <ModalPrimaryButton type="button" onClick={closeFindPwModal}>
                                            확인
                                        </ModalPrimaryButton>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalBody>
                    </ModalCard>
                </ModalOverlay>
            )}
        </PageWrap>
    );
}
