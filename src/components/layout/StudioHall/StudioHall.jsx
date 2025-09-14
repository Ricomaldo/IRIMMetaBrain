import React from 'react';
import { StudioContainer } from './StudioHall.styles';
import RoomCanvas from '../RoomCanvas/RoomCanvas';
import SideTower from '../SideTower/SideTower';
import { useRoomNavigation } from '../../../hooks/useRoomNavigation';

const StudioHall = () => {
  const roomNavHook = useRoomNavigation();

  return (
    <StudioContainer>
      <RoomCanvas
        roomNavHook={roomNavHook}
      />
      <SideTower />
    </StudioContainer>
  );
};

export default StudioHall;
