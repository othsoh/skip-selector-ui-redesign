import { createGlobalStyle } from 'styled-components';
import { colors } from './theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html, body {
    height: 100%;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', system-ui, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 400;
    background-color: ${colors.background};
    color: ${colors.text};
  }

  #root {
    height: 100%;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  button {
    font-family: inherit;
  }

  a {
    color: ${colors.primary};
    text-decoration: none;
    
    &:hover {
      color: ${colors.primaryHover};
    }
  }
`;
