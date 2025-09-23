import styled from '@emotion/styled';
import { mediaQuery } from '../../styles/responsive.js';

export const PageWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 8vw, 96px);
  padding: clamp(56px, 9vw, 110px) 0 clamp(80px, 11vw, 140px);
`;

export const Section = styled.section`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: grid;
  gap: clamp(24px, 5vw, 40px);
`;

export const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 720px;
`;

export const PageTitle = styled.h1`
  font-size: clamp(32px, 5vw, 46px);
  letter-spacing: -0.03em;
`;

export const SectionTitle = styled.h2`
  font-size: clamp(26px, 4vw, 36px);
  letter-spacing: -0.02em;
`;

export const Lead = styled.p`
  margin: 0;
  color: #475569;
  line-height: 1.8;
`;

export const TwoColumn = styled.div`
  display: grid;
  gap: clamp(24px, 4vw, 36px);
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const InfoCard = styled.div`
  padding: clamp(24px, 4vw, 32px);
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 20px 44px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  color: #1f2937;
`;

export const CardText = styled.p`
  margin: 0;
  color: #4b5563;
  line-height: 1.7;
`;

export const Highlight = styled.div`
  padding: clamp(28px, 5vw, 36px);
  border-radius: clamp(28px, 6vw, 40px);
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.16), rgba(37, 99, 235, 0) 70%);
  border: 1px solid rgba(37, 99, 235, 0.2);
  display: grid;
  gap: 16px;
`;

export const BulletList = styled.ul`
  margin: 0;
  padding-left: 0;
  display: grid;
  gap: 12px;
`;

export const BulletItem = styled.li`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content auto;
  gap: 10px;
  align-items: baseline;
  font-size: 15px;
  color: #334155;

  &::before {
    content: '•';
    color: #2563eb;
    font-size: 22px;
    line-height: 1;
  }
`;

export const AccentTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-weight: 600;
  font-size: 13px;
`;

export const Divider = styled.hr`
  width: min(1180px, 92vw);
  margin: 0 auto;
  border: none;
  height: 1px;
  background: rgba(148, 163, 184, 0.18);
`;

export const Timeline = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 28px);
`;

export const TimelineItem = styled.div`
  position: relative;
  padding: clamp(20px, 4vw, 28px);
  border-radius: 22px;
  background: #fff;
  border: 1px solid rgba(148, 163, 184, 0.18);
  box-shadow: 0 18px 36px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TimelineBadge = styled.span`
  width: 44px;
  height: 44px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  background: rgba(37, 99, 235, 0.12);
  color: #1d4ed8;
  font-weight: 700;
  font-size: 15px;
  white-space: nowrap;
`;

export const TableWrap = styled.div`
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 22px 44px rgba(15, 23, 42, 0.08);
`;

export const InfoTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 15px;

  thead {
    background: rgba(37, 99, 235, 0.08);
    color: #1e3a8a;
  }

  th, td {
    padding: clamp(18px, 3vw, 24px);
    text-align: left;
    border-bottom: 1px solid rgba(148, 163, 184, 0.16);
  }

  tbody tr:last-of-type td {
    border-bottom: none;
  }

  ${mediaQuery.mobile} {
    font-size: 14px;
  }
`;
