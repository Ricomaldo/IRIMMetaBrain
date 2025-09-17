// src/components/common/Button/Button.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

const sizeMap = {
  small: {
    padding: '6px 12px',
    fontSize: '12px',
  },
  medium: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  large: {
    padding: '12px 24px',
    fontSize: '16px',
  },
};

export const StyledButton = styled.button`
  padding: ${({ $size }) => sizeMap[$size || 'medium'].padding};
  font-size: ${({ $size }) => sizeMap[$size || 'medium'].fontSize};
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-weight: ${({ $active }) => $active ? '600' : '400'};
  cursor: pointer;
  transition: ${({ theme }) =>
    `all ${theme.motion.durations.fast} ${theme.motion.easings.standard}`};
  border-radius: ${({ theme }) => theme.radii.sm};

  ${({ theme, $variant, $active }) => {
    // Default variant (gold theme)
    if ($variant === 'default' || !$variant) {
      return `
        background: ${$active ? theme.colors.primary : 'transparent'};
        color: ${$active ? theme.colors.background : theme.colors.primary};
        border: ${theme.borders.thin} solid ${theme.colors.primary};

        &:hover {
          background: ${$active ? theme.colors.primary : alpha(theme.colors.primary, 0.1)};
          transform: translateY(-1px);
          box-shadow: ${theme.shadows.sm};
        }

        &:active {
          transform: translateY(0);
          box-shadow: inset 0 2px 4px ${alpha(theme.colors.black, 0.2)};
        }
      `;
    }

    // Secondary variant (stone theme)
    if ($variant === 'secondary') {
      return `
        background: ${$active ? theme.colors.stone : alpha(theme.colors.stone, 0.1)};
        color: ${$active ? theme.colors.background : theme.colors.text.primary};
        border: ${theme.borders.thin} solid ${alpha(theme.colors.stone, 0.5)};

        &:hover {
          background: ${alpha(theme.colors.stone, 0.3)};
          transform: translateY(-1px);
        }

        &:active {
          transform: translateY(0);
        }
      `;
    }

    // Tab variant
    if ($variant === 'tab') {
      return `
        background: ${$active ? theme.colors.primary : theme.colors.backgroundDark};
        color: ${$active ? theme.colors.background : theme.colors.text.primary};
        border: ${theme.borders.base} solid ${theme.colors.border};
        border-bottom: ${$active ? 'none' : theme.borders.base + ' solid ' + theme.colors.border};
        border-radius: ${theme.radii.md} ${theme.radii.md} 0 0;

        &:hover {
          background: ${$active ? theme.colors.primary : alpha(theme.colors.primary, 0.1)};
        }

        &:active {
          transform: translateY(1px);
        }
      `;
    }
  }}
`;