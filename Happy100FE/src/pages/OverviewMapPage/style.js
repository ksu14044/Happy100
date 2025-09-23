import styled from "@emotion/styled";
import { responsiveFont } from "../../styles/responsive";

export const PageWrap = styled.main`
  width: min(1180px, 92vw);
  margin: clamp(60px, 10vw, 120px) auto clamp(90px, 12vw, 150px);
  display: grid;
  gap: clamp(20px, 4vw, 32px);
`;

export const Card = styled.section`
  background: #fff;
  border-radius: 32px;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.12);
  padding: clamp(28px, 4.8vw, 44px);
  display: grid;
  gap: clamp(18px, 3vw, 30px);
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
  height: clamp(300px, 45vw, 440px);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
`;

export const Info = styled.div`
  display: grid;
  gap: 10px;
  background: rgba(15, 23, 42, 0.04);
  border-radius: 18px;
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.18);
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
