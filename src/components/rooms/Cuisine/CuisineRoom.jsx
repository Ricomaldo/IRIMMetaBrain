// src/components/rooms/Cuisine/CuisineRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { CuisineGrid } from './CuisineRoom.styles';

const CuisineRoom = () => {
  return (
    <BaseRoom roomType="cuisine" layoutType="grid">
      <CuisineGrid>
        {/* Contenu de la cuisine à développer */}
      </CuisineGrid>
    </BaseRoom>
  );
};

export default CuisineRoom;