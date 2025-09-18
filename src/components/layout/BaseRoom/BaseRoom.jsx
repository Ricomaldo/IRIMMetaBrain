// src/components/layout/BaseRoom/BaseRoom.jsx

import React from 'react';
import RoomNote from '../../dev/RoomNote/RoomNote';
import { BaseRoomContainer } from './BaseRoom.styles';

/**
 * Conteneur de base pour toutes les pièces
 * @renders BaseRoomContainer
 * @renders RoomNote
 */
const BaseRoom = ({ 
  roomType, 
  children, 
  layoutType = 'flex', // 'flex' ou 'grid'
  className 
}) => {
  return (
    <BaseRoomContainer layoutType={layoutType} className={className}>
      {children}
      <RoomNote roomType={roomType} />
    </BaseRoomContainer>
  );
};

export default BaseRoom;
