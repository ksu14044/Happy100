import React, { useState } from "react";
import {
    PageWrap,
    Card,
    Title,
    Form,
    Row,
    Label,
    InputGroup,
    Input,
    PrimaryButton,
    InlineButton,
    MutedLinkRow,
    MutedLink,
    Small,
    StatusText,
} from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../../mutations/authMutation";
import { checkEmailDuplicate, checkUsernameDuplicate } from "../../../apis/authApi";

export default function SignUpPage() {
    const navigate = useNavigate();
    const { mutateAsync, isPending } = useSignUpMutation();
    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        name: "",
        email: "",
    });
    const [checkingUsername, setCheckingUsername] = useState(false);
    const [checkingEmail, setCheckingEmail] = useState(false);
    const initialFeedback = { value: "", type: null, message: "" };
    const [usernameFeedback, setUsernameFeedback] = useState(initialFeedback);
    const [emailFeedback, setEmailFeedback] = useState(initialFeedback);

    const onChange = (e) =>
        setForm((s) => {
            const next = { ...s, [e.target.name]: e.target.value };
            if (e.target.name === "username") {
                setUsernameFeedback(initialFeedback);
            }
            if (e.target.name === "email") {
                setEmailFeedback(initialFeedback);
            }
            return next;
        });

    const runUsernameCheck = async () => {
        const trimmed = form.username.trim();
        if (!trimmed) {
            setUsernameFeedback({ value: "", type: "error", message: "아이디를 입력해주세요." });
            return false;
        }
        setCheckingUsername(true);
        try {
            const result = await checkUsernameDuplicate(trimmed);
            const isDuplicate = Boolean(result?.duplicate);
            setUsernameFeedback({
                value: trimmed,
                type: isDuplicate ? "error" : "success",
                message: isDuplicate ? "이미 사용 중인 아이디입니다." : "사용 가능한 아이디입니다.",
            });
            return !isDuplicate;
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "아이디 중복 확인 중 오류가 발생했습니다.";
            setUsernameFeedback({ value: "", type: "error", message: msg });
            return false;
        } finally {
            setCheckingUsername(false);
        }
    };

    const runEmailCheck = async () => {
        const trimmed = form.email.trim();
        if (!trimmed) {
            setEmailFeedback({ value: "", type: "error", message: "이메일을 입력해주세요." });
            return false;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
        if (!emailOk) {
            setEmailFeedback({ value: "", type: "error", message: "이메일 형식이 올바르지 않습니다." });
            return false;
        }
        setCheckingEmail(true);
        try {
            const result = await checkEmailDuplicate(trimmed);
            const isDuplicate = Boolean(result?.duplicate);
            setEmailFeedback({
                value: trimmed,
                type: isDuplicate ? "error" : "success",
                message: isDuplicate ? "이미 사용 중인 이메일입니다." : "사용 가능한 이메일입니다.",
            });
            return !isDuplicate;
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                "이메일 중복 확인 중 오류가 발생했습니다.";
            setEmailFeedback({ value: "", type: "error", message: msg });
            return false;
        } finally {
            setCheckingEmail(false);
        }
    };

    const ensureUsernameAvailable = async () => {
        const trimmed = form.username.trim();
        if (!trimmed) {
            alert("아이디를 입력해주세요.");
            return false;
        }
        if (usernameFeedback.type === "success" && usernameFeedback.value === trimmed) {
            return true;
        }
        return runUsernameCheck();
    };

    const ensureEmailAvailable = async () => {
        const trimmed = form.email.trim();
        if (!trimmed) {
            alert("이메일을 입력해주세요.");
            return false;
        }
        if (emailFeedback.type === "success" && emailFeedback.value === trimmed) {
            return true;
        }
        return runEmailCheck();
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // 클라이언트 검증
        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        if (!emailOk) {
            alert("이메일 형식이 올바르지 않습니다.");
            return;
        }

        const usernameAvailable = await ensureUsernameAvailable();
        if (!usernameAvailable) return;
        const emailAvailable = await ensureEmailAvailable();
        if (!emailAvailable) return;

        try {
            await mutateAsync({
                username: form.username.trim(),
                password: form.password, // 서버에서 해시 처리
                name: form.name.trim(),
                email: form.email.trim(),
            });

            alert("회원가입이 완료되었습니다. 로그인 해주세요!");
            navigate("/login", { replace: true });
        } catch (err) {
            // 서버에서 온 메시지 노출
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                "회원가입 중 오류가 발생했습니다.";
            alert(msg);
        }
    };


    return (
        <PageWrap>
            <Card>
                <Title>회원가입</Title>

                <Form onSubmit={onSubmit}>
                    <Row>
                        <Label htmlFor="username">아이디</Label>
                        <InputGroup>
                            <Input
                                id="username"
                                name="username"
                                value={form.username}
                                onChange={onChange}
                                placeholder="아이디"
                                autoComplete="username"
                                required
                            />
                            <InlineButton
                                type="button"
                                onClick={runUsernameCheck}
                                disabled={checkingUsername || !form.username.trim()}
                            >
                                {checkingUsername ? "확인 중…" : "중복 확인"}
                            </InlineButton>
                        </InputGroup>
                        {usernameFeedback.message && (
                            <StatusText variant={usernameFeedback.type}>
                                {usernameFeedback.message}
                            </StatusText>
                        )}
                    </Row>

                    <Row>
                        <Label htmlFor="password">비밀번호</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            placeholder="비밀번호"
                            autoComplete="new-password"
                            required
                        />
                    </Row>

                    <Row>
                        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                        <Input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            value={form.passwordConfirm}
                            onChange={onChange}
                            placeholder="비밀번호 확인"
                            autoComplete="new-password"
                            required
                        />
                    </Row>

                    <Row>
                        <Label htmlFor="name">이름</Label>
                        <Input
                            id="name"
                            name="name"
                            value={form.name}
                            onChange={onChange}
                            placeholder="이름"
                            autoComplete="name"
                            required
                        />
                    </Row>

                    <Row>
                        <Label htmlFor="email">이메일</Label>
                        <InputGroup>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={onChange}
                                placeholder="example@example.com"
                                autoComplete="email"
                                required
                            />
                            <InlineButton
                                type="button"
                                onClick={runEmailCheck}
                                disabled={checkingEmail || !form.email.trim()}
                            >
                                {checkingEmail ? "확인 중…" : "중복 확인"}
                            </InlineButton>
                        </InputGroup>
                        {emailFeedback.message && (
                            <StatusText variant={emailFeedback.type}>
                                {emailFeedback.message}
                            </StatusText>
                        )}
                    </Row>

                    <PrimaryButton type="submit" disabled={isPending}>
                        {isPending ? "가입 진행 중…" : "회원가입"}
                    </PrimaryButton>
                </Form>

                <MutedLinkRow>
                    <Small>이미 계정이 있으신가요?</Small>
                    <MutedLink as={Link} to="/login" onClick={() => navigate("/login")}>
                        로그인
                    </MutedLink>
                </MutedLinkRow>
            </Card>
        </PageWrap>
    );
}
