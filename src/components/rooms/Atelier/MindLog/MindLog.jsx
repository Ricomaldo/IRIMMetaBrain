// src/components/rooms/Atelier/MindLog/MindLog.jsx

import React from 'react';
import { useTheme } from 'styled-components';

// Composant MindLog prêt pour Panel + PanelContext
const MindLogContent = ({
  mood = '😐',
  note = '',
  onMoodChange,
  onNoteChange
}) => {
  return (
    <div style={{ padding: '12px', textAlign: 'center', height: '100%' }}>
      <div style={{ fontSize: '24px', marginBottom: '8px' }}>
        {mood}
      </div>
      <select
        value={mood}
        onChange={(e) => onMoodChange && onMoodChange(e.target.value)}
        style={{ marginBottom: '8px', fontSize: '12px' }}
      >
        <option value="😐">😐 Neutre</option>
        <option value="😊">😊 Positif</option>
        <option value="😤">😤 Focus</option>
        <option value="😫">😫 Fatigué</option>
        <option value="🤔">🤔 Réflexion</option>
      </select>
      <br />
      <textarea
        value={note}
        onChange={(e) => onNoteChange && onNoteChange(e.target.value)}
        placeholder="Note rapide..."
        style={{
          width: '100%',
          height: '60px',
          fontSize: '11px',
          resize: 'none',
          maxHeight: '60px'
        }}
      />
    </div>
  );
};

// Usage avec Panel :
// <Panel
//   contentType="mindlog"
//   gridColumn="5/6" gridRow="4/6"
//   title="MindLog" icon="🧠"
//   texture="wood" accentColor={warm}
//   collapsed={state} onToggleCollapse={save}
// >
//   <MindLogContent mood={mood} note={note} onMoodChange={setMood} onNoteChange={setNote} />
// </Panel>

const MindLog = MindLogContent;

export default MindLog;