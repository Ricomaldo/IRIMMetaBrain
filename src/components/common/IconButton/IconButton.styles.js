// src/components/common/IconButton/IconButton.styles.js

import styled from 'styled-components';
import { flexCenter } from '../../../styles/mixins';

export const ButtonContainer = styled.button`
  ${flexCenter}
  flex-direction: column;
  padding: ${props => props.theme.spacing.xs};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-1px);
  }
`;

export const IconWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 2px;
`;

export const Label = styled.span`
  font-size: 10px;
  color: ${props => props.theme.colors.text.secondary};
`;
