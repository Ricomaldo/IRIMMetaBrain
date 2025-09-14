import React from 'react';
import { StudioContainer } from './StudioHall.styles';
import RoomCanvas from '../RoomCanvas/RoomCanvas';
import SideTower from '../SideTower/SideTower';
import { useMarkdownNotes } from '../../../hooks/useMarkdownNotes';
import { useRoomNavigation } from '../../../hooks/useRoomNavigation';

const StudioHall = () => {
  const roomNotesHook = useMarkdownNotes('irim-room-notes', {
    chambre: '',
    atelier: '',
    forge: '',
    boutique: ''
  });
  const roomNavHook = useRoomNavigation();

  return (
    <StudioContainer>
      <RoomCanvas
        roomNavHook={roomNavHook}
        roomNotesHook={roomNotesHook}
      />
      <SideTower />
    </StudioContainer>
  );
};

export default StudioHall;
