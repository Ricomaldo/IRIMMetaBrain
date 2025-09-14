// src/components/common/MarkdownEditor/MarkdownEditor.jsx

import React, { useState, useRef } from 'react';
import {
  EditorContainer,
  EditorHeader,
  EditorTitle,
  TabsContainer,
  Tab,
  EditorContent,
  Textarea
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
  title = 'Notes',
  variant = 'standalone', // 'standalone' | 'embedded'
  readOnly = false // Nouveau prop pour contrôler le mode depuis l'extérieur
}) => {
  const [activeTab, setActiveTab] = useState(readOnly ? 'preview' : 'edit');
  const textareaRef = useRef(null);

  // Synchroniser activeTab avec readOnly
  React.useEffect(() => {
    setActiveTab(readOnly ? 'preview' : 'edit');
  }, [readOnly]);

  // Toolbar supprimée complètement

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
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            $height={height}
            $compact={compact}
          />
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