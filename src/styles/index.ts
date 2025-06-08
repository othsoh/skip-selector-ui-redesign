import styled from 'styled-components';
import { colors, spacing, breakpoints } from './theme';

export * from './theme';
export { GlobalStyle } from './GlobalStyle';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
  
  @media (min-width: ${breakpoints.sm}) {
    padding: 0 ${spacing.lg};
  }
`;

export const Grid = styled.div<{ columns?: number; gap?: string }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.gap || spacing.lg};
  
  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  }
  
  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(${props => props.columns || 3}, 1fr);
  }
`;

export const Button = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${props => props.size === 'sm' ? '0.25rem' : '0.5rem'};
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  
  padding: ${spacing.sm} ${spacing.lg};
  font-size: 1rem;
  
  ${props => props.size === 'sm' && `
    padding: ${spacing.xs} ${spacing.sm};
    font-size: 0.875rem;
  `}
  
  ${props => props.size === 'lg' && `
    padding: ${spacing.lg} ${spacing.xl};
    font-size: 1.125rem;
  `}
  
  ${props => props.fullWidth && 'width: 100%;'}
  
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

export const Card = styled.div`
  background: ${colors.surface};
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: all 0.2s ease;
  border: 1px solid ${colors.border};
  
  &:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    transform: translateY(-2px);
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${colors.border};
  border-top: 4px solid ${colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: ${spacing.xl} auto;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
