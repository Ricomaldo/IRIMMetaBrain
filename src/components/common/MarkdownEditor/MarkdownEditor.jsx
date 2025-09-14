// src/components/common/MarkdownEditor/MarkdownEditor.jsx

import React, { useState, useRef } from 'react';
import {
  EditorContainer,
  EditorHeader,
  EditorTitle,
  TabsContainer,
  Tab,
  EditorContent,
  Textarea,
  ToolbarContainer,
  ToolbarButton
} from './MarkdownEditor.styles';
import MarkdownPreview from './MarkdownPreview/MarkdownPreview';
import { icons } from '../../../utils/assetMapping';

const MarkdownEditor = ({
  value = '',
  onChange,
  placeholder = 'Écrivez vos notes...',
  height = '120px',
  compact = false,
  showPreview = true,
  toolbar = true,
  title = 'Notes',
  variant = 'standalone' // 'standalone' | 'embedded'
}) => {
  const [activeTab, setActiveTab] = useState('edit');
  const textareaRef = useRef(null);

  const insertMarkdown = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);

    const newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newValue);

    // Restaurer le focus et la sélection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + before.length,
        start + before.length + selectedText.length
      );
    }, 0);
  };

  const toolbarActions = [
    { label: 'B', action: () => insertMarkdown('**', '**'), title: 'Gras' },
    { label: 'I', action: () => insertMarkdown('*', '*'), title: 'Italique' },
    { label: 'H1', action: () => insertMarkdown('# '), title: 'Titre 1' },
    { label: 'H2', action: () => insertMarkdown('## '), title: 'Titre 2' },
    { label: '•', action: () => insertMarkdown('- '), title: 'Liste' },
    { label: '<>', action: () => insertMarkdown('`', '`'), title: 'Code' }
  ];

  return (
    <EditorContainer $variant={variant}>
      {variant === 'standalone' && (
        <EditorHeader>
        <EditorTitle>
          {icons.note} {title}
        </EditorTitle>
        {showPreview && (
          <TabsContainer>
            <Tab
              $active={activeTab === 'edit'}
              onClick={() => setActiveTab('edit')}
            >
              Éditer
            </Tab>
            <Tab
              $active={activeTab === 'preview'}
              onClick={() => setActiveTab('preview')}
            >
              Aperçu
            </Tab>
          </TabsContainer>
        )}
        </EditorHeader>
      )}

      <EditorContent $animate={true} $variant={variant}>
        {activeTab === 'edit' ? (
          <>
            {toolbar && (
              <ToolbarContainer>
                {toolbarActions.map((action, index) => (
                  <ToolbarButton
                    key={index}
                    onClick={action.action}
                    title={action.title}
                  >
                    {action.label}
                  </ToolbarButton>
                ))}
              </ToolbarContainer>
            )}
            <Textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              $height={height}
              $compact={compact}
            />
          </>
        ) : (
          <MarkdownPreview
            content={value}
            height={height}
            compact={compact}
          />
        )}
      </EditorContent>
    </EditorContainer>
  );
};

export default MarkdownEditor;