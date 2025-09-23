import React, { useState } from "react";
import {
    PageWrap,
    Card,
    Title,
    Form,
    Row,
    Label,
    Input,
    PrimaryButton,
    MutedLinkRow,
    MutedLink,
    Small,
} from "./style";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpMutation } from "../../../mutations/authMutation";

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

    const onChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

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
                        <Input
                            id="username"
                            name="username"
                            value={form.username}
                            onChange={onChange}
                            placeholder="아이디"
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
