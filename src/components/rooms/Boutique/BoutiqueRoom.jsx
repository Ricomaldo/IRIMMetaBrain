// src/components/rooms/Boutique/BoutiqueRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { BoutiqueGrid } from './BoutiqueRoom.styles';

const BoutiqueRoom = () => {
  return (
    <BaseRoom roomType="boutique" layoutType="grid">
      <BoutiqueGrid>
        {/* Contenu de la boutique à développer */}
      </BoutiqueGrid>
    </BaseRoom>
  );
};

export default BoutiqueRoom;
