// src/components/common/MarkdownToolbar/MarkdownToolbar.jsx

import React from 'react';

const MarkdownToolbar = ({
  zoomLevel,
  onZoomIn,
  onZoomOut,
  isEditing,
  onToggleEdit,
  showEditButton = true
}) => {
  return (
    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
      {/* Boutons zoom */}
      <button
        onClick={onZoomOut}
        disabled={zoomLevel <= -2}
        style={{
          background: '#F0F0F0',
          border: '1px solid currentColor',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: zoomLevel <= -2 ? 'not-allowed' : 'pointer',
          minWidth: '32px',
          height: '24px',
          opacity: zoomLevel <= -2 ? 0.4 : 1
        }}
        title="Réduire la taille du texte"
      >
        🔍︎-
      </button>
      <button
        onClick={onZoomIn}
        disabled={zoomLevel >= 2}
        style={{
          background: '#F0F0F0',
          border: '1px solid currentColor',
          borderRadius: '6px',
          padding: '4px 8px',
          fontSize: '12px',
          cursor: zoomLevel >= 2 ? 'not-allowed' : 'pointer',
          minWidth: '32px',
          height: '24px',
          opacity: zoomLevel >= 2 ? 0.4 : 1
        }}
        title="Augmenter la taille du texte"
      >
        🔍︎+
      </button>

      {/* Bouton d'édition */}
      {showEditButton && (
        <button
          onClick={onToggleEdit}
          style={{
            background: isEditing ? 'white' : '#F0F0F0',
            border: '1px solid currentColor',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: 'pointer',
            minWidth: '32px',
            height: '24px',
            marginLeft: '4px'
          }}
          title={isEditing ? 'Mode lecture' : 'Mode édition'}
        >
          {isEditing ? '👁️' : '✏️'}
        </button>
      )}
    </div>
  );
};

export default MarkdownToolbar;