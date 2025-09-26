import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { mediaQuery } from '../../styles/responsive';

export const Container = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);

  ${mediaQuery.mobile} {
    margin: 2rem auto;
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #0066FF;
  color: #333;
`;

export const Section = styled.section`
  margin-bottom: 3.5rem;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  h2 {
    font-size: 1.75rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
    color: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    color: #666;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
`;

export const AdminLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #0066FF;
  color: white;
  border-radius: 6px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #0052CC;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-weight: 500;
  color: #444;

  ${mediaQuery.mobile} {
    gap: 0.25rem;
  }
`;

export const Input = styled.input`
  padding: 0.875rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  transition: all 0.2s ease;
  
  &:disabled {
    background-color: #f8f9fa;
    border-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    border-color: #0066ff;
    box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const Button = styled.button`
  padding: 0.875rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: ${props => props.variant === 'danger' ? '#dc3545' : '#0066ff'};
  color: white;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? '#c82333' : '#0052cc'};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }

  &:disabled {
    background-color: #dee2e6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${mediaQuery.mobile} {
    width: 100%;
    margin-top: 0.75rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;

  ${mediaQuery.mobile} {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

export const ErrorMessage = styled.div`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.75rem;
  padding: 0.75rem;
  background-color: rgba(220, 53, 69, 0.05);
  border-radius: 6px;
  border-left: 3px solid #dc3545;
  line-height: 1.5;
`;