// src/components/rooms/Forge/ForgeRoom.jsx

import React from 'react';
import BaseRoom from '../shared/BaseRoom';
import { ForgeGrid } from './ForgeRoom.styles';

const ForgeRoom = () => {
  return (
    <BaseRoom roomType="forge" layoutType="grid">
      <ForgeGrid>
        {/* Contenu de la forge à développer */}
      </ForgeGrid>
    </BaseRoom>
  );
};

export default ForgeRoom;
