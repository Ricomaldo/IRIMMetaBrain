// src/components/rooms/Atelier/Actions/Actions.jsx

import React from 'react';

// Composant Actions prêt pour Panel + PanelContext
const ActionsContent = ({
  actions = [],
  onToggleAction,
  onUpdateText
}) => {
  return (
    <div style={{ padding: '8px', height: '100%', overflow: 'auto' }}>
      {actions.map(action => (
        <div key={action.id} style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '8px',
          gap: '8px'
        }}>
          <input
            type="checkbox"
            checked={action.completed}
            onChange={() => onToggleAction && onToggleAction(action.id)}
          />
          <input
            type="text"
            value={action.text}
            onChange={(e) => onUpdateText && onUpdateText(action.id, e.target.value)}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '12px',
              textDecoration: action.completed ? 'line-through' : 'none',
              opacity: action.completed ? 0.6 : 1
            }}
          />
        </div>
      ))}
    </div>
  );
};

// Usage avec Panel :
// <Panel
//   contentType="actions"
//   gridColumn="5/6" gridRow="1/4"
//   title="Actions" icon="⚡"
//   texture="wood" accentColor={success}
//   collapsed={state} onToggleCollapse={save}
//   badge={incompletedCount}
// >
//   <ActionsContent
//     actions={actions}
//     onToggleAction={toggleAction}
//     onUpdateText={updateText}
//   />
// </Panel>

const Actions = ActionsContent;

export default Actions;