// src/components/rooms/Jardin/JardinRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { JardinGrid } from './JardinRoom.styles';

/**
 * Jardin room component for nature and growth
 * @renders BaseRoom
 * @renders JardinGrid
 */
const JardinRoom = () => {
  return (
    <BaseRoom roomType="jardin" layoutType="grid">
      <JardinGrid>
        {/* Contenu du jardin à développer */}
      </JardinGrid>
    </BaseRoom>
  );
};

export default JardinRoom;