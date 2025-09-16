// src/components/rooms/shared/RoomNote/RoomNote.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../../styles/mixins';
import { alpha } from '../../../../styles/color';

export const RoomTitle = styled.div`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  margin-right: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
`;

export const NoteContainer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  width: 35%;
  min-width: 220px;
  max-width: 320px;
  ${parchmentBg}
  border-radius: 8px;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  box-shadow: 0 4px 8px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
  transition: all 0.3s ease;

  /* TEST-MEDIEVAL-UI: Effet glow doré au hover */
  &:hover {
    box-shadow:
      0 4px 8px ${({ theme }) => alpha(theme.colors.black, 0.3)},
      0 0 20px ${({ theme }) => alpha('#f0deba', 0.3)},
      inset 0 0 15px ${({ theme }) => alpha('#b1845a', 0.1)};
    border-color: ${({ theme }) => '#b1845a'};
    transform: translateY(-2px);
  }
`;

export const NoteHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  user-select: none;
  background: ${({ theme }) => `${theme.colors.primary}1A`}; /* 10% opacity */
  border-radius: 6px 6px 0 0;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}33`}; /* 20% opacity */
  }
`;

export const NoteContent = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  animation: slideUpFromBottom 0.3s ease-out;
  
  @keyframes slideUpFromBottom {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  border: ${({ theme }) => `${theme.borders.thin} solid ${alpha(theme.colors.primary, 0.3)}`};
  border-radius: 4px;
  background: ${({ theme }) => alpha(theme.colors.white, 0.8)};
  resize: none;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-family: ${({ theme }) => theme.typography.families.primary};
  line-height: 1.4;
  padding: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border};
    background: ${({ theme }) => alpha(theme.colors.white, 0.95)};
    box-shadow: inset 0 1px 3px ${({ theme }) => alpha(theme.colors.black, 0.1)};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
    font-style: italic;
  }
`;