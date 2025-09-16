// src/components/rooms/Chambre/ChambreRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { ChambreGrid } from './ChambreRoom.styles';

const ChambreRoom = () => {
  return (
    <BaseRoom roomType="chambre" layoutType="grid">
      <ChambreGrid>
        {/* Contenu de la chambre à développer */}
      </ChambreGrid>
    </BaseRoom>
  );
};

export default ChambreRoom;
