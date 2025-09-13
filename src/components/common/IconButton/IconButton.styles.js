// src/components/common/IconButton/IconButton.styles.js

import styled from 'styled-components';
import { squareButton, woodBg } from '../../../styles/mixins';

export const ButtonContainer = styled.button`
  ${props => squareButton(props.size)}
  background: ${props => {
    if (props.active && props.variant === 'tab') {
      return props.theme.colors.accent;
    }
    return props.theme.colors.secondary;
  }};
  
  ${props => props.active && props.variant === 'tab' ? woodBg : ''}
  
  ${props => props.variant === 'tab' ? `
    transition: none;
    &:hover {
      transform: none;
      box-shadow: none;
      background: ${props.theme.colors.accent};
    }
  ` : `
    &:hover {
      background: ${props.theme.colors.accent};
    }
  `}
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
