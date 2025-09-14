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
  const [localValue, setLocalValue] = useState(value);
  const cursorPositionRef = useRef(0);

  // Synchroniser activeTab avec readOnly
  React.useEffect(() => {
    setActiveTab(readOnly ? 'preview' : 'edit');
  }, [readOnly]);

  // Synchroniser localValue avec value (seulement quand value change de l'extérieur)
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Sauvegarder la position du curseur
  const saveCursorPosition = () => {
    if (textareaRef.current) {
      cursorPositionRef.current = textareaRef.current.selectionStart;
    }
  };

  // Restaurer la position du curseur
  const restoreCursorPosition = () => {
    if (textareaRef.current) {
      const position = cursorPositionRef.current;
      textareaRef.current.setSelectionRange(position, position);
    }
  };

  // Gestionnaire de changement optimisé
  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    saveCursorPosition();
    
    // Appeler onChange avec un léger délai pour éviter les conflits
    setTimeout(() => {
      onChange(newValue);
    }, 0);
  };

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
            value={localValue}
            onChange={handleChange}
            onBlur={saveCursorPosition}
            onFocus={restoreCursorPosition}
            placeholder={placeholder}
            $height={height}
            $compact={compact}
          />
        ) : (
          <MarkdownPreview
            content={localValue}
            height={height}
            compact={compact}
          />
        )}
      </EditorContent>
    </EditorContainer>
  );
};

export default MarkdownEditor;