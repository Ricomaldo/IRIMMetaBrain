// src/components/rooms/Sanctuaire/SanctuaireRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { SanctuaireWrapper, SanctuaireGrid } from './SanctuaireRoom.styles';

const SanctuaireRoom = () => {
  return (
    <BaseRoom roomType="sanctuaire" layoutType="grid">
      <SanctuaireWrapper>
        <SanctuaireGrid>
          {/* Contenu du sanctuaire à développer */}
        </SanctuaireGrid>
      </SanctuaireWrapper>
    </BaseRoom>
  );
};

export default SanctuaireRoom;