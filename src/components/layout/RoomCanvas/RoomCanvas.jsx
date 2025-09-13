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

  const translateX = -currentRoom.x * 100;
  const translateY = -currentRoom.y * 100;

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
        />
      )}
      {availableDirections.down && (
        <NavigationZone
          className="zone-bottom"
          onClick={() => handleNavigationClick('down')}
        />
      )}
      {availableDirections.left && (
        <NavigationZone
          className="zone-left"
          onClick={() => handleNavigationClick('left')}
        />
      )}
      {availableDirections.right && (
        <NavigationZone
          className="zone-right"
          onClick={() => handleNavigationClick('right')}
        />
      )}
    </CanvasContainer>
  );
};

export default RoomCanvas;
