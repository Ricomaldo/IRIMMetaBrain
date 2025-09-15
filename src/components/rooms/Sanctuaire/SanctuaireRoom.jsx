// src/components/rooms/Sanctuaire/SanctuaireRoom.jsx

import React from 'react';
import BaseRoom from '../shared/BaseRoom';
import { SanctuaireGrid } from './SanctuaireRoom.styles';

const SanctuaireRoom = () => {
  return (
    <BaseRoom roomType="sanctuaire" layoutType="grid">
      <SanctuaireGrid>
        {/* Contenu du sanctuaire à développer */}
      </SanctuaireGrid>
    </BaseRoom>
  );
};

export default SanctuaireRoom;