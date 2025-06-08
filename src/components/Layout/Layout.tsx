import React from 'react';
import styled from 'styled-components';
import { colors, spacing, breakpoints } from '../../styles/theme';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${colors.background};
  color: ${colors.text};
`;

const Main = styled.main`
  flex: 1;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
`;

const Footer = styled.footer`
  background: ${colors.backgroundSecondary};
  color: ${colors.textSecondary};
  padding: ${spacing.xl} 0;
  margin-top: auto;
  border-top: 1px solid ${colors.border};
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing.md};
  text-align: center;
  
  @media (min-width: ${breakpoints.sm}) {
    padding: 0 ${spacing.lg};
  }
`;

const FooterText = styled.p`
  margin: 0;
  color: ${colors.textMuted};
  font-size: 0.875rem;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <Main>{children}</Main>
        <Footer>
        <FooterContent>
          <FooterText>
          </FooterText>
        </FooterContent>
      </Footer>
    </LayoutContainer>
  );
};
