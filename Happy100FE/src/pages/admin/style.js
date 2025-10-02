import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

export const Th = styled.th`
  padding: 1rem;
  background: #f8f9fa;
  text-align: left;
  font-weight: 600;
  color: #495057;
  border-bottom: 2px solid #dee2e6;
`;

export const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
  color: #495057;
`;

export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${props => {
    if (props.variant === 'danger') return '#dc3545';
    if (props.variant === 'edit') return '#0066ff';
    return '#6c757d';
  }};
  color: white;

  &:hover {
    filter: brightness(90%);
  }

  &:disabled {
    background-color: #dee2e6;
    cursor: not-allowed;
  }

  & + & {
    margin-left: 0.5rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`;

export const PageButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #dee2e6;
  background: ${props => props.active ? '#0066ff' : 'white'};
  color: ${props => props.active ? 'white' : '#495057'};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: ${props => props.active ? '#0066ff' : '#f8f9fa'};
  }

  &:disabled {
    background: #f8f9fa;
    color: #adb5bd;
    cursor: not-allowed;
  }
`;
