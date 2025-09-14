// src/components/rooms/RoomNote/RoomNote.jsx

import React, { useState } from 'react';
import { NoteContainer, NoteHeader, NoteContent } from './RoomNote.styles';
import MarkdownEditor from '../../common/MarkdownEditor';
import useNotesStore from '../../../stores/useNotesStore';
import { icons } from '../../../utils/assetMapping';

const RoomNote = ({ roomType }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getRoomNote, updateRoomNote } = useNotesStore();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <NoteContainer onClick={(e) => e.stopPropagation()}>
      <NoteHeader onClick={toggleExpanded}>
        {isExpanded ? (
          <>{icons.note} {icons.collapse}</>
        ) : (
          <>Notes Dev de {roomType} {icons.expand}</>
        )}
      </NoteHeader>
      {isExpanded && (
        <NoteContent>
          <MarkdownEditor
            value={getRoomNote(roomType)}
            onChange={(content) => updateRoomNote(roomType, content)}
            placeholder={`Notes ${roomType}...`}
            height="200px"
            compact={false}
            showPreview={true}
            toolbar={true}
            title={`Notes ${roomType}`}
          />
        </NoteContent>
      )}
    </NoteContainer>
  );
};

export default RoomNote;