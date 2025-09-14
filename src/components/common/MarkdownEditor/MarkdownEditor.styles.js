// src/components/common/MarkdownEditor/MarkdownEditor.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const EditorContainer = styled.div`
  width: 100%;
  height: ${props => props.$variant === 'embedded' ? '100%' : 'auto'};
  ${props => props.$variant === 'embedded' ? 'background: transparent;' : parchmentBg}
  border-radius: ${props => props.$variant === 'embedded' ? '0' : '8px'};
  border: ${props => props.$variant === 'embedded' ? 'none' : '2px solid #A0522D'};
  overflow: hidden;
  display: ${props => props.$variant === 'embedded' ? 'flex' : 'block'};
  flex-direction: ${props => props.$variant === 'embedded' ? 'column' : 'initial'};
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
  background: ${props => props.$active
    ? props.theme.colors.primary
    : '#FFFFFF'
  };
  color: ${props => props.$active
    ? '#fff'
    : props.theme.colors.text.primary
  };
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$active
      ? props.theme.colors.primary
      : `${props.theme.colors.primary}33`
    };
  }
`;

export const EditorContent = styled.div`
  padding: ${props => props.$variant === 'embedded' ? '0' : '12px'};
  animation: ${props => props.$animate ? 'fadeIn 0.2s ease-out' : 'none'};
  flex: 1;
  display: flex;
  flex-direction: column;
  height: ${props => props.$variant === 'embedded' ? '100%' : 'auto'};

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: ${props => props.$height === '100%' ? '100%' : (props.$height || '120px')};
  flex: ${props => props.$height === '100%' ? '1' : 'none'};
  border: 1px solid #8B4513;
  border-radius: 4px;
  background: #FFFFFF;
  resize: ${props => props.$height === '100%' ? 'none' : 'vertical'};
  font-size: ${props => props.$compact ? '11px' : '12px'};
  font-family: ${props => props.theme.fonts.main};
  line-height: 1.4;
  padding: 8px;
  color: ${props => props.theme.colors.text.primary};
  background: #FFFFFF !important;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    background: #FFFFFF !important;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
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
  background: #F8F8F8;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const ToolbarButton = styled.button`
  padding: 4px 6px;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 3px;
  background: #FFFFFF;
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  color: ${props => props.theme.colors.text.primary};

  &:hover {
    background: ${props => props.theme.colors.secondary};
    border-color: ${props => props.theme.colors.primary};
  }

  &:active {
    transform: translateY(1px);
  }
`;