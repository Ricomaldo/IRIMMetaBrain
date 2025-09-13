// src/components/rooms/RoomNote/RoomNote.jsx

import React, { useState } from 'react';
import { NoteContainer, NoteHeader, NoteContent, NoteTextarea } from './RoomNote.styles';
import { icons } from '../../../utils/assetMapping';

const RoomNote = ({ roomType, roomNotesHook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { notes, updateNote } = roomNotesHook;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <NoteContainer onClick={(e) => e.stopPropagation()}>
      <NoteHeader onClick={toggleExpanded}>
        {icons.note} {isExpanded ? icons.collapse : icons.expand}
      </NoteHeader>
      {isExpanded && (
        <NoteContent>
          <NoteTextarea
            value={notes[roomType] || ''}
            onChange={(e) => updateNote(roomType, e.target.value)}
            placeholder={`Notes ${roomType}...`}
          />
        </NoteContent>
      )}
    </NoteContainer>
  );
};

export default RoomNote;