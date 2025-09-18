// src/components/rooms/Comptoir/ComptoirRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { ComptoirGrid } from './ComptoirRoom.styles';

/**
 * Comptoir room component for reception and counter services
 * @renders BaseRoom
 * @renders ComptoirGrid
 */
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
