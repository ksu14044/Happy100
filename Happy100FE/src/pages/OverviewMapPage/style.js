import styled from "@emotion/styled";
import { responsiveFont } from "../../styles/responsive";

export const PageWrap = styled.main`
  min-height: calc(100dvh - 160px);
  padding: clamp(24px, 5vw, 60px) clamp(16px, 6vw, 80px);
  background: #f8fafc;
  display: grid;
  gap: clamp(16px, 3vw, 32px);
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 10px 32px rgba(15, 23, 42, 0.08);
  padding: clamp(20px, 4vw, 40px);
  display: grid;
  gap: clamp(16px, 2.5vw, 28px);
`;

export const Title = styled.h1`
  margin: 0;
  font-size: ${responsiveFont("22px", "28px")};
  font-weight: 800;
  color: #0f172a;
`;

export const Address = styled.p`
  margin: 0;
  font-size: ${responsiveFont("14px", "16px")};
  color: #1f2937;
  line-height: 1.5;
`;

export const MapBox = styled.div`
  width: 100%;
  height: clamp(280px, 45vw, 420px);
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #cbd5f5;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const Info = styled.div`
  display: grid;
  gap: 8px;
  background: #f1f5f9;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e2e8f0;
`;

export const Label = styled.span`
  font-size: ${responsiveFont("12px", "13px")};
  font-weight: 600;
  color: #475569;
  letter-spacing: 0.02em;
  text-transform: uppercase;
`;

export const Description = styled.p`
  margin: 0;
  font-size: ${responsiveFont("12px", "14px")};
  color: #334155;
  line-height: 1.65;
`;

export const StatusMessage = styled.p`
  margin: 0;
  font-size: ${responsiveFont("12px", "13px")};
  color: #dc2626;
`;
