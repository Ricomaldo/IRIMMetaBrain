// src/components/common/MarkdownEditor/MarkdownPreview/MarkdownPreview.styles.js

import styled from 'styled-components';

export const PreviewContainer = styled.div`
  min-height: ${props => props.height === '100%' ? '200px' : (props.height || '120px')};
  max-height: ${props => props.height === '100%' ? 'none' : (props.height || '120px')};
  height: ${props => props.height === '100%' ? '100%' : 'auto'};
  flex: ${props => props.height === '100%' ? '1' : 'none'};
  overflow-y: auto;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background: #FFFFFF;
  padding: 8px;
  font-size: ${props => props.compact ? '11px' : '12px'};
  font-family: ${props => props.theme.fonts.main};
  line-height: 1.4;
  color: #000000;
  text-shadow: none;

  /* Styles Markdown */
  h1, h2, h3, h4, h5, h6 {
    margin: 8px 0 4px 0;
    font-weight: bold;
    color: #000000;
    text-shadow: none;
  }

  h1 { font-size: 16px; }
  h2 { font-size: 14px; }
  h3 { font-size: 13px; }
  h4, h5, h6 { font-size: 12px; }

  p {
    margin: 4px 0;
  }

  strong {
    font-weight: bold;
    color: #000000;
    text-shadow: none;
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
    border: 1px solid ${props => props.theme.colors.border};
    border-radius: 3px;
    padding: 1px 3px;
    font-family: 'Courier New', monospace;
    font-size: 10px;
  }

  pre {
    background: #F5F5DC;
    border: 1px solid ${props => props.theme.colors.border};
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
    border-left: 3px solid ${props => props.theme.colors.primary};
    padding-left: 8px;
    margin: 8px 0;
    font-style: italic;
    color: ${props => props.theme.colors.text.secondary};
  }

  hr {
    border: none;
    border-top: 1px solid ${props => props.theme.colors.border};
    margin: 12px 0;
  }
`;

export const EmptyPreview = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: ${props => props.height || '120px'};
  color: ${props => props.theme.colors.text.secondary};
  font-style: italic;
  opacity: 0.6;
`;