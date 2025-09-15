// src/components/layout/SideTower/SideTowerNotes/SideTowerNotes.jsx

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { NoteContainer } from './SideTowerNotes.styles';
import MarkdownEditor from '../../../common/MarkdownEditor';
import MarkdownToolbar from '../../../common/MarkdownToolbar';
import useNotesStore from '../../../../stores/useNotesStore';

const SideTowerNotes = () => {
  const theme = useTheme();
  const { getSideTowerNote, updateSideTowerNote } = useNotesStore();
  const [isEditing, setIsEditing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(0);

  // Couleur d'accent pour SideTowerNotes
  const accentColor = theme.colors.accents.neutral;

  // Gestion du zoom (même logique que MarkdownPanel)
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, -2));
  };

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
      <div style={{ flex: 1 }}>
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
    </NoteContainer>
  );
};

export default SideTowerNotes;