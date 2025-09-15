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
  readOnly = false, // Nouveau prop pour contrôler le mode depuis l'extérieur
  zoomLevel: externalZoomLevel = null, // Prop externe pour mode embedded
  accentColor = null // Couleur d'accent pour les titres/gras
}) => {
  const [activeTab, setActiveTab] = useState(readOnly ? 'preview' : 'edit');
  const textareaRef = useRef(null);
  const [localValue, setLocalValue] = useState(value);
  const cursorPositionRef = useRef(0);
  const [internalZoomLevel, setInternalZoomLevel] = useState(0); // -2, -1, 0, 1, 2

  // Utiliser le zoom externe si fourni (mode embedded), sinon interne (mode standalone)
  const zoomLevel = externalZoomLevel !== null ? externalZoomLevel : internalZoomLevel;
  const setZoomLevel = externalZoomLevel !== null ? (() => {}) : setInternalZoomLevel;

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

  // Gestion du zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, -2));
  };

  // Toolbar supprimée complètement

  return (
    <EditorContainer $variant={variant}>
      {variant === 'standalone' && (
        <EditorHeader>
        <EditorTitle>
          {icons.note} {title}
        </EditorTitle>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Boutons zoom */}
          <TabsContainer>
            <Tab
              onClick={handleZoomOut}
              disabled={zoomLevel <= -2}
              title="Réduire la taille du texte"
            >
              🔍︎-
            </Tab>
            <Tab
              onClick={handleZoomIn}
              disabled={zoomLevel >= 2}
              title="Augmenter la taille du texte"
            >
              🔍︎+
            </Tab>
          </TabsContainer>
          {/* Onglets edit/preview */}
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
        </div>
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
            $zoomLevel={zoomLevel}
          />
        ) : (
          <MarkdownPreview
            content={localValue}
            height={height}
            compact={compact}
            zoomLevel={zoomLevel}
            accentColor={accentColor}
          />
        )}
      </EditorContent>
    </EditorContainer>
  );
};

export default MarkdownEditor;