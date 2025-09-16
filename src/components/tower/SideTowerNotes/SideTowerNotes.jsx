// src/components/tower/SideTowerNotes/SideTowerNotes.jsx

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { NoteContainer } from './SideTowerNotes.styles';
import MarkdownEditor from '../../common/MarkdownEditor';
import MarkdownToolbar from '../../common/MarkdownToolbar';
import useNotesStore from '../../../stores/useNotesStore';

const SideTowerNotes = () => {
  const theme = useTheme();
  const { getSideTowerNote, updateSideTowerNote } = useNotesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  // Couleur d'accent pour SideTowerNotes
  const accentColor = theme.colors.accents.neutral;

  // Gestion du zoom (même logique que MarkdownPanel)
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, -2));
  };

  if (!isExpanded) {
    return (
      <NoteContainer style={{
        padding: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }} onClick={() => setIsExpanded(true)}>
        📝 Notes SideTower ➡️
      </NoteContainer>
    );
  }

  return (
    <NoteContainer>
      {/* Header avec toolbar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '8px 12px',
        background: accentColor,
        color: 'white',
        borderRadius: '6px 6px 0 0',
        marginBottom: '8px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        <span>📝 Notes</span>
        <MarkdownToolbar
          zoomLevel={zoomLevel}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          isEditing={isEditing}
          onToggleEdit={() => setIsEditing(!isEditing)}
          showEditButton={true}
        />
      </div>

      {/* MarkdownEditor sans header */}
      <div style={{ 
        flex: 1, 
        overflow: 'hidden',
        minHeight: 0 /* Permet au flex child de rétrécir */
      }}>
        <MarkdownEditor
          value={getSideTowerNote()}
          onChange={updateSideTowerNote}
          placeholder="Notes de développement..."
          height="100%"
          compact={true}
          variant="embedded"
          readOnly={!isEditing}
          zoomLevel={zoomLevel}
          accentColor={accentColor}
        />
      </div>

      {/* Bouton fermer */}
      <div style={{
        padding: '8px',
        textAlign: 'center',
        borderTop: '1px solid #ccc',
        cursor: 'pointer',
        fontSize: '10px'
      }} onClick={() => setIsExpanded(false)}>
        ⬇️ Fermer
      </div>
    </NoteContainer>
  );
};

export default SideTowerNotes;