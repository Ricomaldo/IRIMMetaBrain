// src/components/common/MarkdownEditor/MarkdownEditor.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const EditorContainer = styled.div`
  width: 100%;
  ${parchmentBg}
  border-radius: 8px;
  border: 2px solid #A0522D;
  overflow: hidden;
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${props => `${props.theme.colors.primary}1A`};
  border-bottom: 2px solid ${props => props.theme.colors.border};
  font-size: 12px;
  font-weight: bold;
`;

export const EditorTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
`;

export const TabsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const Tab = styled.button`
  padding: 4px 8px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background: ${props => props.active
    ? props.theme.colors.primary
    : 'rgba(255, 255, 255, 0.8)'
  };
  color: ${props => props.active
    ? '#fff'
    : props.theme.colors.text.primary
  };
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.active
      ? props.theme.colors.primary
      : `${props.theme.colors.primary}33`
    };
  }
`;

export const EditorContent = styled.div`
  padding: 12px;
  animation: ${props => props.animate ? 'fadeIn 0.2s ease-out' : 'none'};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: ${props => props.height || '120px'};
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.8);
  resize: vertical;
  font-size: ${props => props.compact ? '11px' : '12px'};
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

export const ToolbarContainer = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 8px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(139, 69, 19, 0.2);
  border-radius: 4px;
`;

export const ToolbarButton = styled.button`
  padding: 4px 6px;
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.8);
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => `${props.theme.colors.primary}33`};
    border-color: ${props => props.theme.colors.border};
  }

  &:active {
    transform: translateY(1px);
  }
`;