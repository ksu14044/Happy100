import styled from '@emotion/styled';
import { responsiveFont } from '../../styles/responsive';

export const Wrap = styled.section`
  width: var(--content-max-width);
  margin: clamp(80px, 12vw, 160px) auto clamp(120px, 16vw, 220px);
  display: grid;
  gap: clamp(18px, 4vw, 28px);
  place-items: center;
  text-align: center;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 920px;
  padding: clamp(28px, 6vw, 56px);
  border-radius: var(--radius-lg);
  background: #fff;
  border: 1px solid var(--color-border);
  box-shadow: 0 28px 56px rgba(15, 23, 42, 0.12);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, rgba(37,99,235,.25), rgba(56,189,248,.15));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude;
    pointer-events: none;
  }
`;

export const Code = styled.div`
  font-size: clamp(60px, 16vw, 120px);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Title = styled.h1`
  font-size: ${responsiveFont('22px', '28px')};
  letter-spacing: -0.02em;
`;

export const Desc = styled.p`
  color: var(--color-muted);
  font-size: ${responsiveFont('14px', '16px')};
  line-height: 1.9;
`;

export const Actions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: clamp(10px, 2vw, 16px);
  flex-wrap: wrap;
`;

export const PrimaryBtn = styled.a`
  padding: 12px 20px;
  border-radius: 999px;
  color: #fff;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.28);
`;

export const GhostBtn = styled.a`
  padding: 12px 18px;
  border-radius: 999px;
  color: #1f2937;
  font-weight: 700;
  background: rgba(248, 250, 252, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.4);
`;

