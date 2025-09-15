// src/components/rooms/Jardin/JardinRoom.jsx

import React from 'react';
import BaseRoom from '../shared/BaseRoom';
import { JardinGrid } from './JardinRoom.styles';

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