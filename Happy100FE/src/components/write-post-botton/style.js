import styled from "@emotion/styled";

export const WriteButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 14px;  border: 1px solid #111827;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  background: #111827;
  color: #fff;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.08s ease, opacity 0.08s ease;
  &:hover { opacity: 0.92; }
  &:active { transform: translateY(1px); }
`;