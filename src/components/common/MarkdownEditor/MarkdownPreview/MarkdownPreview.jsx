// src/components/common/MarkdownEditor/MarkdownPreview/MarkdownPreview.jsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PreviewContainer, EmptyPreview } from './MarkdownPreview.styles';

const MarkdownPreview = ({ content, height, compact, zoomLevel = 0, accentColor }) => {
  if (!content || !content.trim()) {
    return (
      <EmptyPreview height={height}>
        Aperçu du rendu markdown...
      </EmptyPreview>
    );
  }

  return (
    <PreviewContainer height={height} compact={compact} zoomLevel={zoomLevel} accentColor={accentColor}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customisation des composants rendus
          h1: ({ children }) => <h1 style={{ fontSize: '16px', margin: '8px 0 4px 0' }}>{children}</h1>,
          h2: ({ children }) => <h2 style={{ fontSize: '14px', margin: '8px 0 4px 0' }}>{children}</h2>,
          h3: ({ children }) => <h3 style={{ fontSize: '13px', margin: '8px 0 4px 0' }}>{children}</h3>,
          p: ({ children }) => <p style={{ margin: '4px 0' }}>{children}</p>,
          li: ({ children }) => <li style={{ margin: '2px 0' }}>{children}</li>,
          code: ({ children }) => (
            <code style={{
              background: '#F5F5DC',
              border: '1px solid #A0522D',
              borderRadius: '3px',
              padding: '1px 3px',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px'
            }}>
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre style={{
              background: '#F5F5DC',
              border: '1px solid #A0522D',
              borderRadius: '4px',
              padding: '8px',
              margin: '8px 0',
              overflowX: 'auto'
            }}>
              {children}
            </pre>
          ),
          // Support des tasklists GitHub
          input: ({ checked, type }) => (
            type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={checked}
                readOnly
                style={{ marginRight: '6px' }}
              />
            ) : null
          )
        }}
      >
        {content}
      </ReactMarkdown>
    </PreviewContainer>
  );
};

export default MarkdownPreview;