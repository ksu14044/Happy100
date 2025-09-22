// FILE: src/pages/PostDetail/style.js
import styled from "@emotion/styled";
import { mediaQuery, responsiveFont } from "../../styles/responsive";
// 핵심 스타일은 WritePage와 일관되게 재사용
import {
    EditorWrap as BaseEditorWrap,
    ButtonBase,
} from "../WritePage/style";

/** 상세 제목: WritePage의 TitleInput 타이포와 스케일을 맞춤 */
export const TitleText = styled.h1`
  font-size: ${responsiveFont("18px", "22px")};
  font-weight: 700;
  line-height: 1.25;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin: 0;
  background: #fff;
  word-break: keep-all;
`;

/** 메타 정보 바(작성자/작성일/조회수) */
export const MetaBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  padding: 6px 2px 0;
  color: #6b7280;
  font-size: ${responsiveFont("12px", "13px")};

  & > span {
    position: relative;
  }

  & > span + span::before {
    content: "•";
    position: relative;
    left: -7px;
    margin-right: -5px;
    color: #d1d5db;
  }
`;

/** 본문 컨테이너: CKEditor 미사용 시에도 동일한 룩&필 적용 */
export const ContentWrap = styled(BaseEditorWrap)`
  padding: 0; /* BaseEditorWrap에 border/rounding만 유지 */

  article.ck-content-like {
    padding: 14px;
    line-height: 1.7;
  }

  ${mediaQuery.tablet} {
    article.ck-content-like {
      padding: 18px;
    }
  }

  /* 본문 공통 타이포/요소 스타일 */
  article.ck-content-like {
    h1, h2, h3, h4, h5, h6 {
      margin: 1.2em 0 0.6em;
      line-height: 1.25;
      font-weight: 700;
    }
    h1 { font-size: ${responsiveFont("22px", "28px")}; }
    h2 { font-size: ${responsiveFont("20px", "24px")}; }
    h3 { font-size: ${responsiveFont("18px", "20px")}; }

    p { margin: 0.9em 0; }
    ul, ol { padding-left: 1.2em; margin: 0.9em 0; }

    blockquote {
      margin: 1em 0;
      padding: 0.6em 0.9em;
      background: #f9fafb;
      border-left: 3px solid #e5e7eb;
      color: #374151;
      border-radius: 6px;
    }

    img, video, iframe {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 12px auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 1em 0;
      font-size: ${responsiveFont("13px", "14px")};
    }
    table th, table td {
      border: 1px solid #e5e7eb;
      padding: 8px;
    }
    table th {
      background: #f3f4f6;
      font-weight: 700;
    }

    pre, code, kbd, samp {
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    }
    pre {
      background: #0b102033;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 12px;
      overflow: auto;
    }
    code {
      background: #f3f4f6;
      padding: 2px 6px;
      border-radius: 4px;
    }
  }
`;

/** 상/하단 액션 바 (목록/수정 등) */
export const BackBar = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
  position: sticky;
  bottom: 0;
  background: #fff;
  padding-top: 8px;

  ${mediaQuery.tablet} {
    gap: 12px;
  }
`;

/** 필요 시 세컨더리 버튼이 더 필요하면 이렇게 확장 가능 */
export const SecondaryBtn = styled(ButtonBase)`
  background: #f3f4f6;
  color: #111827;
  border: 1px solid #e5e7eb;
`;
