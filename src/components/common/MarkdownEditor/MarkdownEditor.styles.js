// src/components/common/MarkdownEditor/MarkdownEditor.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

// Helper pour calculer la taille avec zoom
const getZoomedSize = (baseSize, zoomLevel) => {
  const zoomMultiplier = 1 + (zoomLevel * 0.15); // 15% par niveau
  return `calc(${baseSize} * ${zoomMultiplier})`;
};

export const EditorContainer = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

export const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: ${props => `${props.theme.colors.primary}1A`};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
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
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: ${props => props.$active
    ? props.theme.colors.primary
    : '#FFFFFF'
  };
  color: ${props => props.$active
    ? '#fff'
    : props.theme.colors.text.primary
  };
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.$active
      ? props.theme.colors.primary
      : `${props.theme.colors.primary}33`
    };
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const EditorContent = styled.div`
  padding: 0;
  animation: ${props => props.$animate ? 'fadeIn 0.2s ease-out' : 'none'};
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: ${props => props.$height === '100%' ? '100%' : (props.$height || '120px')};
  min-height: ${props => props.$height === '100%' ? '200px' : 'auto'};
  max-height: ${props => props.$height === '100%' ? 'none' : 'none'};
  flex: ${props => props.$height === '100%' ? '1' : 'none'};
  border: 1px solid #8B4513;
  border-radius: 4px;
  background: #FFFFFF;
  resize: ${props => props.$height === '100%' ? 'none' : 'vertical'};
  font-size: ${({ theme, $compact, $zoomLevel = 0 }) => {
    const baseSize = $compact ? theme.typography.sizes.xs : theme.typography.sizes.sm;
    const scale = 1 + ($zoomLevel * 0.15); // 15% par niveau
    return `calc(${baseSize} * ${scale})`;
  }};
  font-family: ${({ theme }) => theme.typography.families.primary};
  line-height: 1.4;
  padding: 8px;
  color: #000000;
  background: #FFFFFF !important;
  text-shadow: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    background: #FFFFFF !important;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.secondary};
    opacity: 0.6;
    font-style: italic;
  }
`;

// Toolbar supprimée complètement