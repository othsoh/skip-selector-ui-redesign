import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../styles/theme';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${spacing['2xl']};
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${spacing.md};
`;

const ErrorTitle = styled.h3`
  color: ${colors.danger};
  margin-bottom: ${spacing.md};
`;

const ErrorText = styled.p`
  color: ${colors.textSecondary};
  margin-bottom: ${spacing['2xl']};
  max-width: 400px;
`;

const Button = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  padding: ${spacing.sm} ${spacing.lg};
  font-size: 1rem;
  background-color: ${colors.primary};
  color: ${colors.white};
  
  ${props => props.variant === 'secondary' && `
    background-color: ${colors.surface};
    color: ${colors.text};
  `}
  
  ${props => props.variant === 'outline' && `
    background-color: transparent;
    color: ${colors.primary};
    border: 2px solid ${colors.primary};
  `}
  
  &:hover {
    background-color: ${colors.primaryHover};
  }
  
  ${props => props.variant === 'secondary' && `
    &:hover {
      background-color: ${colors.backgroundSecondary};
    }
  `}
  
  ${props => props.variant === 'outline' && `
    &:hover {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message,
  onRetry,
  retryText = 'Try Again'
}) => {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>{title}</ErrorTitle>
      <ErrorText>{message}</ErrorText>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          {retryText}
        </Button>
      )}
    </ErrorContainer>
  );
};
