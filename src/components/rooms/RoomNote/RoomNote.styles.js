// src/components/rooms/RoomNote/RoomNote.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const NoteContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 12.5%;
  min-width: 120px;
  ${parchmentBg}
  border-radius: 4px;
  z-index: 20;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const NoteHeader = styled.div`
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  user-select: none;
`;

export const NoteContent = styled.div`
  padding: 8px;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  background: transparent;
  resize: none;
  font-size: 10px;
  font-family: ${props => props.theme.fonts.main};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
    opacity: 0.7;
  }
`;