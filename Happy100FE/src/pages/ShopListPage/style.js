import styled from '@emotion/styled';
import { responsiveFont } from '../../styles/responsive.js';

export const PageWrap = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  padding: 0 0 clamp(40px, 6vw, 70px);
  display: grid;
  gap: clamp(12px, 2vw, 20px);
`;

export const ListWrap = styled.div`
  display: grid;
  gap: clamp(18px, 4vw, 26px);
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const ItemLink = styled('button')`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 3vw, 22px);
  padding: clamp(18px, 3vw, 26px);
  border-radius: 24px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  background: #fff;
  box-shadow: 0 20px 44px rgba(15, 23, 42, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  text-align: left;
  height: 100%;

  border-width: 1px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 28px 60px rgba(15, 23, 42, 0.12);
  }
`;

export const Thumbnail = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 18px;
  overflow: hidden;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Info = styled.div`
  display: grid;
  gap: 14px;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: ${responsiveFont('18px', '22px')};
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

export const Summary = styled.p`
  margin: 0;
  color: ${({ muted }) => (muted ? '#94a3b8' : '#475569')};
  line-height: 1.65;
  font-size: ${responsiveFont('14px', '15px')};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Meta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: ${responsiveFont('12px', '13px')};
  color: #64748b;
`;

const StateBase = styled.div`
  padding: clamp(32px, 5vw, 48px);
  border-radius: 24px;
  text-align: center;
  font-size: ${responsiveFont('14px', '15px')};
  font-weight: 600;
`;

export const EmptyState = styled(StateBase)`
  background: rgba(37, 99, 235, 0.08);
  color: #1d4ed8;
`;

export const ErrorState = styled(StateBase)`
  background: rgba(239, 68, 68, 0.12);
  color: #b91c1c;
`;

export const LoadingState = styled(StateBase)`
  background: rgba(15, 23, 42, 0.08);
  color: #0f172a;
`;

export const NewBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
`;

export const FilterBar = styled.form`
  width: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchSelect = styled.select`
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: #fff;
  padding: 0 12px;
  font-weight: 600;
  color: #1f2937;
`;

export const SearchInput = styled.input`
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  padding: 0 14px;
  width: clamp(160px, 20vw, 240px);

  &:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
    outline: none;
  }
`;

export const SearchButton = styled.button`
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff;
  border: none;
  padding: 0 18px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

export const SortSelect = styled.select`
  height: 40px;
  border-radius: 12px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: #fff;
  padding: 0 12px;
  font-weight: 600;
  color: #1f2937;
`;
