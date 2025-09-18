import React from 'react';
import { StudioContainer } from './StudioHall.styles';
import RoomCanvas from '../RoomCanvas/RoomCanvas';
import SideTower from '../SideTower/SideTower';
import { useRoomNavigation } from '../../../hooks/useRoomNavigation';

/**
 * Composant principal de l'application - Conteneur studio
 * @renders StudioContainer
 * @renders RoomCanvas
 * @renders SideTower
 */
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
