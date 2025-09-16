// src/components/common/Panel/PanelContext.jsx

import React, { createContext, useContext, useState } from 'react';

const PanelContext = createContext();

export const PanelProvider = ({ children, contentType = "default" }) => {
  // États selon le type de contenu
  const [zoom, setZoom] = useState(0);
  const [editing, setEditing] = useState(false);

  // Fonctions zoom
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 1, -2));
  };

  // Fonction edit toggle
  const handleToggleEdit = () => {
    setEditing(!editing);
  };

  const value = {
    // États
    zoom,
    editing,
    contentType,

    // Actions
    setZoom,
    setEditing,
    handleZoomIn,
    handleZoomOut,
    handleToggleEdit
  };

  return (
    <PanelContext.Provider value={value}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanelContext = () => {
  const context = useContext(PanelContext);
  if (!context) {
    throw new Error('usePanelContext must be used within PanelProvider');
  }
  return context;
};

export default PanelContext;