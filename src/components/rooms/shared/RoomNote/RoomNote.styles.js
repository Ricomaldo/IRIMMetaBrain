// src/components/rooms/shared/RoomNote/RoomNote.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../../styles/mixins';

export const RoomTitle = styled.div`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  margin-right: 12px;
  flex-shrink: 0;
`;

export const NoteContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 35%;
  min-width: 220px;
  max-width: 320px;
  ${parchmentBg}
  border-radius: 8px;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
`;

export const NoteHeader = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
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
  padding: 12px;
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
  border: ${({ theme }) => `1px solid rgba(139, 69, 19, 0.3)`};
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  resize: none;
  font-size: 12px;
  font-family: ${({ theme }) => theme.typography.families.primary};
  line-height: 1.4;
  padding: 8px;
  color: ${({ theme }) => theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.border};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
    font-style: italic;
  }
`;