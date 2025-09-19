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
  border: 1px solid ${props => props.theme.colors.border};
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

  const handleRoomClick = async (roomType) => {
    const targetRoom = roomConfig.find(r => r.type === roomType);
    if (!targetRoom) return;

    const currentPos = defaultRoom;
    if (currentPos.x === targetRoom.x && currentPos.y === targetRoom.y) return;

    console.log(`🧭 Navigation vers: ${roomType} (${targetRoom.x}, ${targetRoom.y})`);

    // Fonction helper pour cliquer sur une flèche (comme dans capture-state.js)
    const clickArrow = async (direction) => {
      const selectors = [
        `button[aria-label="Navigate ${direction}"]`,
        `button[title="Navigate ${direction}"]`,
        `[aria-label="Navigate ${direction}"]`
      ];

      for (const selector of selectors) {
        const element = document.querySelector(selector);
        if (element) {
          element.click();
          return true;
        }
      }
      console.warn(`⚠️ Impossible de trouver la flèche ${direction}`);
      return false;
    };

    // Navigation pas-à-pas (comme dans capture-state.js)
    const navigateStepByStep = async () => {
      let current = { ...currentPos };

      while (current.x !== targetRoom.x || current.y !== targetRoom.y) {
        let direction = null;

        // Priorité: d'abord X puis Y (comme le viewer)
        if (current.x < targetRoom.x) direction = 'right';
        else if (current.x > targetRoom.x) direction = 'left';
        else if (current.y < targetRoom.y) direction = 'down';
        else if (current.y > targetRoom.y) direction = 'up';

        if (direction) {
          const success = await clickArrow(direction);
          if (!success) break; // Arrêter si on ne peut pas cliquer
          
          // Mettre à jour la position locale pour le calcul suivant
          switch(direction) {
            case 'right': current.x++; break;
            case 'left': current.x--; break;
            case 'down': current.y++; break;
            case 'up': current.y--; break;
          }
          // Attendre la transition (comme dans capture-state.js)
          await new Promise(resolve => setTimeout(resolve, 600));
        } else {
          break;
        }
      }
    };

    navigateStepByStep();
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
