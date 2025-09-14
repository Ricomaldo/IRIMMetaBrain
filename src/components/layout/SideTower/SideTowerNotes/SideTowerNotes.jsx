// src/components/layout/SideTower/SideTowerNotes/SideTowerNotes.jsx

import React, { useState } from 'react';
import { NoteContainer } from './SideTowerNotes.styles';
import MarkdownEditor from '../../../common/MarkdownEditor';

const SideTowerNotes = ({ sideTowerNotesHook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { notes, updateSingleNote } = sideTowerNotesHook;

  if (!isExpanded) {
    return (
      <NoteContainer onClick={() => setIsExpanded(true)}>
        📝 Notes SideTower ➡️
      </NoteContainer>
    );
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <MarkdownEditor
        value={notes.general || ''}
        onChange={updateSingleNote}
        placeholder="Notes de développement SideTower..."
        height="120px"
        compact={true}
        showPreview={true}
        toolbar={true}
        title="Notes SideTower"
      />
      <NoteContainer
        onClick={() => setIsExpanded(false)}
        style={{ marginTop: '4px', padding: '4px 8px', textAlign: 'center', cursor: 'pointer' }}
      >
        ⬇️ Fermer
      </NoteContainer>
    </div>
  );
};

export default SideTowerNotes;