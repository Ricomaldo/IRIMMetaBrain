// src/styles/theme.js
export const theme = {
  colors: {
    primary: '#8B4513', // Marron craft
    secondary: '#D2B48C', // Beige parchemin
    accent: '#CD853F', // Bronze
    background: '#F5F5DC', // Crème
    border: '#A0522D', // Marron foncé
    text: {
      primary: '#2F1B14',
      secondary: '#5D4037'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  fonts: {
    main: '"Cinzel", serif', // Medieval style
    mono: '"Courier New", monospace'
  },
  zIndex: {
    navigation: 10,
    overlay: 20,
    modal: 30
  }
};

// src/styles/mixins.js (SCSS-like dans styled-components)
import { css } from 'styled-components';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const craftBorder = css`
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const parchmentBg = css`
  background: ${props => props.theme.colors.secondary};
  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23D2B48C" opacity="0.3"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
`;