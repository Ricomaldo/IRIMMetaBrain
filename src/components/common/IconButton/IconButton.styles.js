// src/components/common/IconButton/IconButton.styles.js

import styled from 'styled-components';
import { squareButton, tertiaryLevel } from '../../../styles/mixins';
import { alpha } from '../../../styles/color';

export const ButtonContainer = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['active', '$active', 'variant', 'size'].includes(prop)
})`
  ${props => squareButton(props.size)}
  background: ${props => {
    if (props.variant === 'tab') {
      return props.$active ? props.theme.colors.secondary : props.theme.colors.primary;
    }
    if (props.variant === 'secondary') {
      return props.theme.colors.stone;
    }
    return props.theme.colors.secondary;
  }};

  ${props => {
    if (props.variant === 'tab') {
      return `
        transition: all ${props.theme.motion.durations.fast} ${props.theme.motion.easings.standard};
        border: ${props.theme.borders.base} solid ${props.theme.colors.border};
        border-bottom: none;
        border-radius: ${props.theme.radii.md} ${props.theme.radii.md} 0 0;
        position: relative;
        z-index: ${props.theme.zIndex.level3};
        color: ${props.$active ? props.theme.colors.text.primary : props.theme.colors.secondary};
        /* TEST-MEDIEVAL-UI: Outline doré pour tab actif (au lieu de border qui se fait recouvrir) */
        ${props.$active ? `
          box-shadow:
            inset 0 0 0 2px ${props.theme.colors.secondary},
            inset 0 0 0 4px #b1845a,
            0 0 10px rgba(240, 222, 186, 0.3);
        ` : ''}
        &:hover {
          transform: none;
          box-shadow: none;
          background: ${props.theme.colors.accent};
          color: ${props.theme.colors.secondary};
        }
        &:active {
          transform: translateY(1px);
          box-shadow: inset 0 2px 4px ${alpha(props.theme.colors.black, 0.2)};
        }
      `;
    }
    if (props.variant === 'secondary') {
      return `
        ${tertiaryLevel}
        border-color: ${props.theme.colors.text.secondary};
        transition: all ${props.theme.motion.durations.fast} ${props.theme.motion.easings.standard};
        &:hover {
          background: ${props.theme.colors.text.secondary};
          color: ${props.theme.colors.background};
        }
        &:active {
          transform: scale(0.96);
          box-shadow: inset 0 2px 4px ${alpha(props.theme.colors.black, 0.2)};
        }
      `;
    }
    return `
      transition: all ${props.theme.motion.durations.fast} ${props.theme.motion.easings.standard};
      &:hover {
        background: ${props.theme.colors.accent};
      }
      &:active {
        transform: scale(0.95);
        box-shadow: inset 0 2px 4px ${alpha(props.theme.colors.black, 0.3)};
      }
    `;
  }}
`;

export const IconWrapper = styled.div`
  font-size: inherit;
  line-height: 1;
`;

export const Label = styled.span`
  font-size: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-top: ${({ theme }) => theme.spacing['3xs']};
  text-align: center;
  font-weight: 500;
`;
