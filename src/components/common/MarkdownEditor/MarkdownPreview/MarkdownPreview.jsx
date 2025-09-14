// src/components/common/MarkdownEditor/MarkdownPreview/MarkdownPreview.jsx

import React from 'react';
import { PreviewContainer, EmptyPreview } from './MarkdownPreview.styles';

// Simple markdown parser pour éviter une dépendance externe pour le moment
const parseMarkdown = (text) => {
  if (!text.trim()) return '';

  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    // Code inline
    .replace(/`([^`]*)`/gim, '<code>$1</code>')
    // Lists
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    .replace(/^- (.*$)/gim, '<li>$1</li>')
    // Line breaks
    .replace(/\n/gim, '<br>');
};

const MarkdownPreview = ({ content, height, compact }) => {
  if (!content || !content.trim()) {
    return (
      <EmptyPreview height={height}>
        Aperçu du rendu markdown...
      </EmptyPreview>
    );
  }

  const htmlContent = parseMarkdown(content);

  return (
    <PreviewContainer
      height={height}
      compact={compact}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default MarkdownPreview;