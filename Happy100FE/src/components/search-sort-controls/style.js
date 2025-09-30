import styled from '@emotion/styled';

export const ControlsForm = styled.form`
  width: 100%;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: flex-end;
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

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
