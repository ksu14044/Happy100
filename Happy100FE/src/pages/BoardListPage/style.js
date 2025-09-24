import styled from '@emotion/styled';

export const PageWrap = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  padding: 0 0 clamp(40px, 6vw, 70px);
  display: grid;
  gap: clamp(12px, 2vw, 20px);
`;

export const PageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: clamp(12px, 2vw, 18px) 0;
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


export const ListContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const TableBlock = styled.div`
  width: min(1180px, 92vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
