import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { responsiveFont } from "../../styles/responsive";

export const WriteButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;
  border-radius: 999px;
  font-size: ${responsiveFont('13px', '14px')};
  font-weight: 700;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  border: 1px solid transparent;
  text-decoration: none;
  box-shadow: 0 16px 32px rgba(37, 99, 235, 0.26);
  transition: transform 0.16s ease, box-shadow 0.16s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 40px rgba(37, 99, 235, 0.28);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 16px 28px rgba(37, 99, 235, 0.24);
  }
`;
