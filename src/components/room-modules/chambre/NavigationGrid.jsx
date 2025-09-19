// src/components/room-modules/chambre/NavigationGrid.jsx

import React from 'react';
import styled from 'styled-components';
import { roomConfig } from '../../../utils/roomPositions';
import { roomColors } from '../../../utils/assetMapping';
import useSettingsStore from '../../../stores/useSettingsStore';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 2px;
  width: 100%;
  height: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.sm};
`;

const RoomCell = styled.div`
  background-color: ${props => props.color};
  border: 1px solid ${props => props.theme.colors.ui.border};
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: 500;
  text-align: center;
  transition: all 0.2s ease;
  opacity: ${props => props.isCurrent ? 1 : 0.7};
  box-shadow: ${props => props.isCurrent ? `0 0 4px ${props.color}` : 'none'};
  
  &:hover {
    opacity: 1;
    transform: scale(1.05);
    box-shadow: 0 0 6px ${props => props.color};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const RoomLabel = styled.span`
  color: ${props => props.theme.colors.text.primary};
  text-shadow: 0 0 2px rgba(0,0,0,0.5);
  line-height: 1;
`;

/**
 * Grille de navigation pour accéder rapidement aux différentes rooms
 * @renders GridContainer
 * @renders RoomCell
 * @renders RoomLabel
 */
const NavigationGrid = () => {
  const { defaultRoom, setDefaultRoom } = useSettingsStore();

  const handleRoomClick = (roomType) => {
    console.log(`Navigation vers: ${roomType}`);
    setDefaultRoom({ x: roomConfig.find(r => r.type === roomType)?.x || 1, y: roomConfig.find(r => r.type === roomType)?.y || 1 });
    // Ici on pourrait ajouter une logique de navigation réelle
    // Par exemple déclencher un changement de route ou d'état global
  };

  const getCurrentRoomType = () => {
    return roomConfig.find(room => 
      room.x === defaultRoom.x && room.y === defaultRoom.y
    )?.type || 'atelier';
  };

  const currentRoomType = getCurrentRoomType();

  return (
    <GridContainer>
      {roomConfig.map((room) => (
        <RoomCell
          key={`${room.x}-${room.y}`}
          color={roomColors[room.type]}
          isCurrent={room.type === currentRoomType}
          onClick={() => handleRoomClick(room.type)}
          title={`Aller vers ${room.name}`}
        >
          <RoomLabel>
            {room.name.substring(0, 3)}
          </RoomLabel>
        </RoomCell>
      ))}
    </GridContainer>
  );
};

export default NavigationGrid;
