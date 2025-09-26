import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
`;

const Title = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Message = styled.p`
  margin: 0 0 1.5rem 0;
  color: #666;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${props => props.variant === 'danger' ? '#ff4444' : '#666'};
  color: white;

  &:hover {
    background-color: ${props => props.variant === 'danger' ? '#cc0000' : '#444'};
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

export default function Modal({ title, message, isOpen, onConfirm, onCancel, confirmLabel, cancelLabel, isConfirming }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContent>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <ButtonGroup>
          <Button onClick={onCancel} disabled={isConfirming}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={isConfirming}>
            {isConfirming ? '처리 중...' : confirmLabel}
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Overlay>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  confirmLabel: PropTypes.string.isRequired,
  cancelLabel: PropTypes.string.isRequired,
  isConfirming: PropTypes.bool
};

Modal.defaultProps = {
  isConfirming: false
};