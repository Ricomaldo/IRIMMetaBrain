// src/components/rooms/shared/BaseRoom/BaseRoom.jsx

import React from 'react';
import RoomNote from '../RoomNote/RoomNote';
import { BaseRoomContainer } from './BaseRoom.styles';

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
