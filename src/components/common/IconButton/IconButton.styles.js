// src/components/common/IconButton/IconButton.styles.js

import styled from 'styled-components';
import { squareButton, woodBg, tertiaryLevel } from '../../../styles/mixins';

export const ButtonContainer = styled.button`
  ${props => squareButton(props.size)}
  background: ${props => {
    if (props.active && props.variant === 'tab') {
      return props.theme.colors.accent;
    }
    if (props.variant === 'secondary') {
      return props.theme.colors.stone;
    }
    return props.theme.colors.secondary;
  }};

  ${props => props.active && props.variant === 'tab' ? woodBg : ''}

  ${props => {
    if (props.variant === 'tab') {
      return `
        transition: none;
        border: 2px solid ${props.theme.colors.border};
        border-bottom: none;
        border-radius: 6px 6px 0 0;
        position: relative;
        z-index: 3;
        &:hover {
          transform: none;
          box-shadow: none;
          background: ${props.theme.colors.accent};
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
