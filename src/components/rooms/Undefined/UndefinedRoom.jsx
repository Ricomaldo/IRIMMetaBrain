// src/components/rooms/Undefined/UndefinedRoom.jsx
// SANDBOX Room - Test des composants de manière isolée

import React from 'react';
import SystemOverview from '../../dev/SystemOverview/SystemOverview';

const UndefinedRoom = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1a2e',
      padding: '20px',
      overflow: 'auto'
    }}>
      <h1 style={{
        color: '#ffd700',
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px'
      }}>
        🧪 SANDBOX (Room Undefined)
      </h1>

      <div style={{
        background: 'rgba(0, 0, 0, 0.5)',
        borderRadius: '12px',
        padding: '20px',
        height: 'calc(100% - 80px)'
      }}>
        <SystemOverview />
      </div>
    </div>
  );
};

export default UndefinedRoom;