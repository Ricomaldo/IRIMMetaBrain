// src/components/rooms/RoomNote/RoomNote.jsx

import React, { useState } from 'react';
import { NoteContainer } from './RoomNote.styles';
import MarkdownEditor from '../../common/MarkdownEditor';

const RoomNote = ({ roomType, roomNotesHook }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { notes, updateNote } = roomNotesHook;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <NoteContainer onClick={(e) => e.stopPropagation()}>
      {!isExpanded ? (
        <div
          onClick={toggleExpanded}
          style={{
            padding: '12px',
            textAlign: 'center',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          📝 Notes {roomType} ➡️
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <div
            onClick={toggleExpanded}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              cursor: 'pointer',
              zIndex: 10,
              background: 'rgba(255,255,255,0.8)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontSize: '12px'
            }}
          >
            ❌
          </div>
          <MarkdownEditor
            value={notes[roomType] || ''}
            onChange={(content) => updateNote(roomType, content)}
            placeholder={`Notes ${roomType}...`}
            height="200px"
            compact={false}
            showPreview={true}
            toolbar={true}
            title={`Notes ${roomType}`}
          />
        </div>
      )}
    </NoteContainer>
  );
};

export default RoomNote;