// src/components/common/MarkdownEditor/MarkdownPreview/MarkdownPreview.styles.js

import styled from 'styled-components';

// Helper pour calculer la taille avec zoom
const getZoomedSize = (baseSize, zoomLevel) => {
  const zoomMultiplier = 1 + (zoomLevel * 0.15); // 15% par niveau
  return `calc(${baseSize} * ${zoomMultiplier})`;
};

export const PreviewContainer = styled.div`
  min-height: ${props => props.height === '100%' ? '200px' : (props.height || '120px')};
  max-height: ${props => props.height === '100%' ? 'none' : (props.height || '120px')};
  height: ${props => props.height === '100%' ? '100%' : 'auto'};
  flex: ${props => props.height === '100%' ? '1' : 'none'};
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  background: #FFFFFF;
  padding: 8px;
  font-size: ${({ theme, compact }) => compact ? theme.typography.sizes.xs : theme.typography.sizes.sm};
  font-family: ${({ theme }) => theme.typography.families.primary};
  line-height: 1.4;
  color: #000000;
  text-shadow: none;

  /* Zoom global avec transform au lieu de font-size */
  transform: ${({ zoomLevel = 0 }) => {
    const scale = 1 + (zoomLevel * 0.15); // 15% par niveau
    return `scale(${scale})`;
  }};
  transform-origin: top left;
  ${({ zoomLevel = 0 }) => zoomLevel !== 0 ? `
    width: ${100 / (1 + (zoomLevel * 0.15))}%;
  ` : ''}

  /* Styles Markdown */
  h1, h2, h3, h4, h5, h6 {
    margin: 8px 0 4px 0;
    font-weight: bold;
    color: ${props => props.accentColor || '#000000'};
    text-shadow: none;
  }

  h1 { font-size: ${({ theme }) => theme.typography.sizes.lg}; }
  h2 { font-size: ${({ theme }) => theme.typography.sizes.md}; }
  h3 { font-size: ${({ theme }) => theme.typography.sizes.base}; }
  h4, h5, h6 { font-size: ${({ theme }) => theme.typography.sizes.sm}; }

  p {
    margin: 4px 0;
  }

  strong {
    font-weight: bold;
    color: ${props => props.accentColor || '#000000'};
    text-shadow: none;
    font-size: inherit; /* Hérite du parent (p, li, etc.) */
  }

  em {
    font-style: italic;
    color: #333333;
    text-shadow: none;
  }

  ul, ol {
    margin: 4px 0;
    padding-left: 20px;
  }

  li {
    margin: 2px 0;
  }

  code {
    background: #F5F5DC;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 3px;
    padding: 1px 3px;
    font-family: 'Courier New', monospace;
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  pre {
    background: #F5F5DC;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 4px;
    padding: 8px;
    margin: 8px 0;
    overflow-x: auto;

    code {
      background: none;
      border: none;
      padding: 0;
    }
  }

  blockquote {
    border-left: 3px solid ${({ theme }) => theme.colors.primary};
    padding-left: 8px;
    margin: 8px 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  hr {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    margin: 12px 0;
  }
`;

export const EmptyPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.height || '120px'};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-style: italic;
  opacity: 0.6;
`;