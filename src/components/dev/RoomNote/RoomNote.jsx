// src/components/dev/RoomNote/RoomNote.jsx

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { NoteContainer, NoteHeader, NoteContent, RoomTitle } from './RoomNote.styles';
import MarkdownEditor from '../../common/MarkdownEditor';
import useNotesStore from '../../../stores/useNotesStore';
import { icons } from '../../../utils/assetMapping';

/**
 * Room note component for development notes per room
 * @renders NoteContainer
 * @renders NoteHeader
 * @renders RoomTitle
 * @renders NoteContent
 * @renders MarkdownEditor
 */
const RoomNote = ({ roomType }) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const { getRoomNote, updateRoomNote } = useNotesStore();

  // Couleur d'accent pour RoomNote
  const accentColor = theme.colors.accents.warm;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Capitaliser le nom de la pièce
  const capitalizedRoomType = roomType.charAt(0).toUpperCase() + roomType.slice(1);

  return (
    <NoteContainer onClick={(e) => e.stopPropagation()}>
      <NoteHeader onClick={toggleExpanded}>
        <RoomTitle>{capitalizedRoomType}</RoomTitle>
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
              title={`Notes ${roomType}`}
              variant="standalone"
              readOnly={true}
              accentColor={accentColor}
            />
          </NoteContent>
        )}
    </NoteContainer>
  );
};

export default RoomNote;