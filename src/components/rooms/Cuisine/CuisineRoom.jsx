// src/components/rooms/Cuisine/CuisineRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { CuisineGrid } from './CuisineRoom.styles';

/**
 * Cuisine room component for cooking and recipes
 * @renders BaseRoom
 * @renders CuisineGrid
 */
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