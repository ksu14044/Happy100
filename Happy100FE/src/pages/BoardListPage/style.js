import styled from '@emotion/styled';

export const PageContainer = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  padding: clamp(16px, 3vw, 24px) 0;
`;

export const StatusMessage = styled.div`
  padding: clamp(28px, 4vw, 40px);
  border-radius: 24px;
  background: rgba(37, 99, 235, 0.08);
  color: #1e3a8a;
  text-align: center;
  font-weight: 600;
  line-height: 1.7;
`;

export const ErrorMessage = styled(StatusMessage)`
  background: rgba(239, 68, 68, 0.1);
  color: #b91c1c;
`;
