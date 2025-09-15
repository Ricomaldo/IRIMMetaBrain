// src/components/rooms/Comptoir/ComptoirRoom.jsx

import React from 'react';
import BaseRoom from '../shared/BaseRoom';
import { ComptoirGrid } from './ComptoirRoom.styles';

const ComptoirRoom = () => {
  return (
    <BaseRoom roomType="comptoir" layoutType="grid">
      <ComptoirGrid>
        {/* Contenu du comptoir à développer */}
      </ComptoirGrid>
    </BaseRoom>
  );
};

export default ComptoirRoom;
