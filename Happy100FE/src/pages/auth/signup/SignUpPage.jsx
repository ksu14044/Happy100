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

export default function SignUpPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordConfirm: "",
        name: "",
        email: "",
    });

    const onChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onSubmit = (e) => {
        e.preventDefault();
        if (form.password !== form.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        console.log("SIGNUP", form); // TODO: 회원가입 API 연동
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

                    <PrimaryButton type="submit">회원가입</PrimaryButton>
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
