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
  variant = 'embedded', // 'embedded' par défaut maintenant
  readOnly = false,
  zoomLevel = 0,
  accentColor = null
}) => {
  const [activeTab, setActiveTab] = useState(readOnly ? 'preview' : 'edit');
  const [internalZoomLevel, setInternalZoomLevel] = useState(0);
  const textareaRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);
  const cursorPositionRef = useRef(0);

  // Gestion du zoom pour mode standalone uniquement
  const currentZoomLevel = variant === 'standalone' ? internalZoomLevel : zoomLevel;

  const handleZoomIn = () => {
    if (variant === 'standalone') {
      setInternalZoomLevel(prev => Math.min(prev + 1, 2));
    }
  };

  const handleZoomOut = () => {
    if (variant === 'standalone') {
      setInternalZoomLevel(prev => Math.max(prev - 1, -2));
    }
  };

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

  // Plus de gestion de zoom interne - tout est externe

  return (
    <EditorContainer>
      {/* Header uniquement en mode standalone */}
      {variant === 'standalone' && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          background: `${accentColor}33`,
          borderBottom: '1px solid #ccc',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          <span>{icons.note} {title}</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={handleZoomOut}
              disabled={currentZoomLevel <= -2}
              style={{
                background: '#F0F0F0',
                border: '1px solid currentColor',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                cursor: currentZoomLevel <= -2 ? 'not-allowed' : 'pointer',
                minWidth: '32px',
                height: '24px',
                opacity: currentZoomLevel <= -2 ? 0.4 : 1
              }}
              title="Réduire la taille du texte"
            >
              −
            </button>
            <button
              onClick={handleZoomIn}
              disabled={currentZoomLevel >= 2}
              style={{
                background: '#F0F0F0',
                border: '1px solid currentColor',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '12px',
                cursor: currentZoomLevel >= 2 ? 'not-allowed' : 'pointer',
                minWidth: '32px',
                height: '24px',
                opacity: currentZoomLevel >= 2 ? 0.4 : 1
              }}
              title="Augmenter la taille du texte"
            >
              +
            </button>
            {showPreview && (
              <>
                <button
                  onClick={() => setActiveTab('edit')}
                  style={{
                    background: activeTab === 'edit' ? 'white' : '#F0F0F0',
                    border: '1px solid currentColor',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    minWidth: '32px',
                    height: '24px'
                  }}
                  title="Mode édition"
                >
                  ✏️
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  style={{
                    background: activeTab === 'preview' ? 'white' : '#F0F0F0',
                    border: '1px solid currentColor',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    minWidth: '32px',
                    height: '24px'
                  }}
                  title="Mode aperçu"
                >
                  👁️
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <EditorContent $animate={true}>
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
            $zoomLevel={currentZoomLevel}
          />
        ) : (
          <MarkdownPreview
            content={localValue}
            height={height}
            compact={compact}
            zoomLevel={currentZoomLevel}
            accentColor={accentColor}
          />
        )}
      </EditorContent>
    </EditorContainer>
  );
};

export default MarkdownEditor;