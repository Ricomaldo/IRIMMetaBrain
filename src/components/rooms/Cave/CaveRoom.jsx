// src/components/rooms/Cave/CaveRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { CaveGrid } from './CaveRoom.styles';

const CaveRoom = () => {
  return (
    <BaseRoom roomType="cave" layoutType="grid">
      <CaveGrid>
        {/* Contenu de la cave à développer */}
      </CaveGrid>
    </BaseRoom>
  );
};

export default CaveRoom;
