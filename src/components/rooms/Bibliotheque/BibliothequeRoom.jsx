// src/components/rooms/Bibliotheque/BibliothequeRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { BibliothequeGrid } from './BibliothequeRoom.styles';

const BibliothequeRoom = () => {
  return (
    <BaseRoom roomType="bibliotheque" layoutType="grid">
      <BibliothequeGrid>
        {/* Contenu de la bibliothèque à développer */}
      </BibliothequeGrid>
    </BaseRoom>
  );
};

export default BibliothequeRoom;
