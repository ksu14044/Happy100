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
    Small,
} from "./style";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../apis/authApi";

export default function LoginPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const onChange = (e) =>
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);
        try {
            await loginApi(form);      // 토큰 저장까지 수행됨
            navigate("/");                  // 성공 후 이동
        } catch (e) {
            setErr(e?.response?.data?.message || e.message || "로그인 실패");
            console.error(e);
        } finally {
            setLoading(false);
        }
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
                        <GhostButton type="button" onClick={() => console.log("FIND_ID")}>
                            아이디 찾기
                        </GhostButton>
                        <GhostButton type="button" onClick={() => console.log("FIND_PW")}>
                            비밀번호 찾기
                        </GhostButton>
                    </Actions>

                    <PrimaryButton type="submit" onClick={onSubmit}>로그인</PrimaryButton>
                </Form>

                <Divider />

                <OAuthRow>
                    <OAuthBtn data-provider="google" type="button" onClick={() => console.log("GOOGLE_LOGIN")}>
                        Google로 계속하기
                    </OAuthBtn>
                    <OAuthBtn data-provider="naver" type="button" onClick={() => console.log("NAVER_LOGIN")}>
                        네이버로 계속하기
                    </OAuthBtn>
                    <OAuthBtn data-provider="kakao" type="button" onClick={() => console.log("KAKAO_LOGIN")}>
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
        </PageWrap>
    );
}