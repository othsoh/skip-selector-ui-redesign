import React from 'react';
import styled from 'styled-components';
import { colors, spacing } from '../../styles/theme';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: ${spacing['2xl']};
`;

const LoadingText = styled.p`
  margin-top: ${spacing.md};
  color: ${colors.textSecondary};
  font-size: 1rem;
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.border};
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

interface LoadingProps {
  text?: string;
}

export const Loading: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};
