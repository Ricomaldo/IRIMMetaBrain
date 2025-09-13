// src/components/rooms/RoomNote/RoomNote.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const NoteContainer = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 25%;
  min-width: 180px;
  max-width: 250px;
  ${parchmentBg}
  border-radius: 8px;
  z-index: 20;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  border: 2px solid #A0522D;
`;

export const NoteHeader = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  border-bottom: 2px solid ${props => props.theme.colors.border};
  user-select: none;
  background: rgba(139, 69, 19, 0.1);
  border-radius: 6px 6px 0 0;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(139, 69, 19, 0.2);
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
  height: 100px;
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  resize: none;
  font-size: 12px;
  font-family: ${props => props.theme.fonts.main};
  line-height: 1.4;
  padding: 8px;
  color: ${props => props.theme.colors.text.primary};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.border};
    background: rgba(255, 255, 255, 0.95);
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
    opacity: 0.6;
    font-style: italic;
  }
`;