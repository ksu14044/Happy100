// FILE: /src/pages/WritePage/style.js
import styled from "@emotion/styled";

export const PageWrap = styled.main`
  width: 100%;
  background: #fff;
`;

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 16px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;

  @media (min-width: 768px) {
    padding: 24px;
    gap: 22px;
  }
`;

export const TitleBar = styled.div`
  display: grid;
`;

export const TitleInput = styled.input`
  width: 100%;
  /* ⬇️ 높이 축소: 폰트/패딩 조정 */
  font-size: clamp(16px, 2.2vw, 22px);
  font-weight: 700;
  line-height: 1.25;
  padding: 10px 12px; /* 이전보다 줄임 */
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  outline: none;
  &:focus {
    border-color: #111827;
    box-shadow: 0 0 0 3px rgba(17,24,39,0.08);
  }
`;

export const Field = styled.section`
  display: grid;
  gap: 10px;
`;

export const Label = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #111827;
`;

export const Help = styled.p`
  font-size: 12px;
  color: #6b7280;
  margin: 6px 0 0;
`;

/** 첨부 전체 영역 */
export const AttachArea = styled.div`
  border: 1px dashed #cbd5e1;
  border-radius: 10px;
  padding: 12px;
  display: grid;
  gap: 12px;

  @media (min-width: 768px) {
    padding: 14px;
  }
`;

/** ⬇️ 텍스트(좌) + 버튼(우) 한 줄 배치 (nowrap) */
export const AttachHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: nowrap;

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const AttachInput = styled.input`
  display: none;
`;

export const AttachList = styled.ul`
  display: grid;
  gap: 8px;
`;

export const AttachItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  background: #f9fafb;
  border: 1px solid #eef2f7;
  border-radius: 8px;
  padding: 8px 10px;

  & > span {
    flex: 1;
    font-size: 13px;
    color: #374151;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

/** 단일 에디터 래퍼: 반응형, 툴바 sticky */
export const EditorWrap = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;

  .ck.ck-toolbar {
    position: sticky;
    top: 0;
    z-index: 2;
    background: #fff;
    border-bottom: 1px solid #e5e7eb;
  }

  .ck.ck-editor__editable {
    min-height: 300px;
    @media (min-width: 768px) {
      min-height: 380px;
    }
  }
`;

export const SubmitBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  position: sticky;
  bottom: 0;
  background: #fff;
  padding-top: 8px;
`;

export const ButtonBase = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  transition: transform 0.08s ease, opacity 0.08s ease;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  &:active {
    transform: translateY(1px);
  }
`;

export const GhostBtn = styled(ButtonBase)`
  background: #fff;
  border-color: #d1d5db;
  color: #111827;
`;

export const PrimaryBtn = styled(ButtonBase)`
  background: #111827;
  color: #fff;
`;

export const DangerBtn = styled(ButtonBase)`
  background: #fee2e2;
  border-color: #fecaca;
  color: #991b1b;
`;
