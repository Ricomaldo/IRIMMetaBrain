import React from 'react';
import { StudioContainer } from './StudioHall.styles';
import RoomCanvas from '../RoomCanvas/RoomCanvas';
import SideTower from '../SideTower/SideTower';
import { useRoomNotes } from '../../../hooks/useRoomNotes';
import { useRoomNavigation } from '../../../hooks/useRoomNavigation';

const StudioHall = () => {
  const roomNotesHook = useRoomNotes();
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
