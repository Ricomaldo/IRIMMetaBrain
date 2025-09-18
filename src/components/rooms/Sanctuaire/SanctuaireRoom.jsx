// src/components/rooms/Sanctuaire/SanctuaireRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { SanctuaireWrapper, SanctuaireGrid } from './SanctuaireRoom.styles';

/**
 * Sanctuaire room component for spiritual and meditation activities
 * @renders BaseRoom
 * @renders SanctuaireWrapper
 * @renders SanctuaireGrid
 */
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