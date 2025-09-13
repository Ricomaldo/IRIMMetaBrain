import React from 'react';
import {
  CanvasContainer,
  RoomsGrid,
  RoomSlot,
  NavigationZone
} from './RoomCanvas.styles';
import RoomNote from '../../rooms/RoomNote/RoomNote';
import { roomConfig } from '../../../utils/roomPositions';
import { wireframeColors } from '../../../utils/assetMapping';

const RoomCanvas = ({ roomNavHook, roomNotesHook }) => {
  const { currentRoom, navigateToRoom, getAvailableDirections } = roomNavHook;
  const availableDirections = getAvailableDirections();

  // Calcul pour centrer la pièce courante dans le viewport
  // Chaque pièce fait 25% de la largeur totale (100%/4) et 33.33% de la hauteur totale (100%/3)
  const translateX = -currentRoom.x * 25; // 100% / 4 colonnes = 25%
  const translateY = -currentRoom.y * 33.33; // 100% / 3 rangées = 33.33%

  const handleNavigationClick = (direction) => {
    navigateToRoom(direction);
  };

  return (
    <CanvasContainer>
      <RoomsGrid style={{ transform: `translate(${translateX}%, ${translateY}%)` }}>
        {roomConfig.map((room, index) => (
          <RoomSlot
            key={index}
            roomType={room.type}
            background={room.background}
            roomColors={wireframeColors}
          >
            {room.name}
            {room.type !== 'empty' && (
              <RoomNote
                roomType={room.type}
                roomNotesHook={roomNotesHook}
              />
            )}
          </RoomSlot>
        ))}
      </RoomsGrid>

      {availableDirections.up && (
        <NavigationZone
          className="zone-top"
          onClick={() => handleNavigationClick('up')}
        >
          ⬆️
        </NavigationZone>
      )}
      {availableDirections.down && (
        <NavigationZone
          className="zone-bottom"
          onClick={() => handleNavigationClick('down')}
        >
          ⬇️
        </NavigationZone>
      )}
      {availableDirections.left && (
        <NavigationZone
          className="zone-left"
          onClick={() => handleNavigationClick('left')}
        >
          ⬅️
        </NavigationZone>
      )}
      {availableDirections.right && (
        <NavigationZone
          className="zone-right"
          onClick={() => handleNavigationClick('right')}
        >
          ➡️
        </NavigationZone>
      )}
    </CanvasContainer>
  );
};

export default RoomCanvas;
