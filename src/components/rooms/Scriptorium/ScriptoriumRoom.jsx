// src/components/rooms/Scriptorium/ScriptoriumRoom.jsx

import React from 'react';
import BaseRoom from '../../layout/BaseRoom';
import { ScriptoriumGrid } from './ScriptoriumRoom.styles';

const ScriptoriumRoom = () => {
  return (
    <BaseRoom roomType="scriptorium" layoutType="grid">
      <ScriptoriumGrid>
        {/* Contenu du scriptorium à développer */}
      </ScriptoriumGrid>
    </BaseRoom>
  );
};

export default ScriptoriumRoom;
