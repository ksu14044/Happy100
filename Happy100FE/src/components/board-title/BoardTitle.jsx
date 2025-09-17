import React from "react";
import PropTypes from "prop-types";
import {
    TitleSection,
    Container,
    TitleRow,
    TitleIconSlot,
    TitleText,
    Description,
    RightSlot,
} from "./style";
import WritePostButton from "../write-post-botton/WritePostButton";

/**
 * BoardTitle
 * - 언제나 "헤더 바로 아래"에 배치하세요. (헤더와 타이틀 사이에는 아무것도 두지 않음)
 * - 다양한 게시판에서 공통 사용
 */
export default function BoardTitle({
    title,
    description,
    icon,
    right,
    as = "h1",
    className,
    "aria-label": ariaLabel,
}) {
    var section = "";
    if (title === "공지사항") {
        section = "news";
    } else if (title === "자격증반") {
        section = "cert";
    } else if (title === "쇼핑몰") {
        section = "shop";
    }
    return (
        <TitleSection aria-label={ariaLabel} className={className}>
            <Container>
                <TitleRow>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        {icon ? <TitleIconSlot aria-hidden>{icon}</TitleIconSlot> : null}
                        <TitleText as={as}>{title}</TitleText>
                    </div>
                    <RightSlot>
                        {/* 우선 BoardTitle 내부에 기본 제공: 관리자에게만 보임 */}
                        <WritePostButton section={section} />
                        {/* 외부에서 전달된 우측 액션이 있으면 함께 표시 */}
                        {right ?? null}
                    </RightSlot>
                </TitleRow>
                {description ? <Description>{description}</Description> : null}
            </Container>
        </TitleSection>
    );
}

BoardTitle.propTypes = {
    /** 게시판 이름(필수) */
    title: PropTypes.string.isRequired,
    /** 보조 설명(선택) */
    description: PropTypes.node,
    /** 왼쪽 아이콘 슬롯(선택) */
    icon: PropTypes.node,
    /** 우측 액션 영역(선택): 버튼/필터/탭 등 */
    right: PropTypes.node,
    /** heading 태그 (기본 h1) */
    as: PropTypes.oneOf(["h1", "h2", "h3"]),
    className: PropTypes.string,
    "aria-label": PropTypes.string,
};
