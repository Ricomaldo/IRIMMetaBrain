// src/components/common/IconButton/IconButton.styles.js

import styled from 'styled-components';
import { squareButton, tertiaryLevel } from '../../../styles/mixins';

export const ButtonContainer = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['active', 'variant', 'size'].includes(prop)
})`
  ${props => squareButton(props.size)}
  background: ${props => {
    if (props.variant === 'tab') {
      return props.active ? props.theme.colors.secondary : props.theme.colors.primary;
    }
    if (props.variant === 'secondary') {
      return props.theme.colors.stone;
    }
    return props.theme.colors.secondary;
  }};

  ${props => {
    if (props.variant === 'tab') {
      return `
        transition: none;
        border: 2px solid ${props.theme.colors.border};
        border-bottom: none;
        border-radius: 6px 6px 0 0;
        position: relative;
        z-index: 3;
        color: ${props.active ? props.theme.colors.text.primary : props.theme.colors.secondary};
        &:hover {
          transform: none;
          box-shadow: none;
          background: ${props.theme.colors.accent};
          color: ${props.theme.colors.secondary};
        }
      `;
    }
    if (props.variant === 'secondary') {
      return `
        ${tertiaryLevel}
        border-color: ${props.theme.colors.text.secondary};
        &:hover {
          background: ${props.theme.colors.text.secondary};
          color: ${props.theme.colors.background};
        }
      `;
    }
    return `
      &:hover {
        background: ${props.theme.colors.accent};
      }
    `;
  }}
`;

export const IconWrapper = styled.div`
  font-size: inherit;
  line-height: 1;
`;

export const Label = styled.span`
  font-size: 8px;
  color: ${props => props.theme.colors.text.primary};
  margin-top: 2px;
  text-align: center;
  font-weight: 500;
`;
