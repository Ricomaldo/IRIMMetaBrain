// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Version complète avec styles inline

import React, { useState } from 'react';

// ============================================
// 🧪 IMPORTER LE COMPOSANT À TESTER ICI
// ============================================
// Exemple : import SystemOverview from '../../dev/SystemOverview/SystemOverview';
// Exemple : import ComponentCatalog from '../../dev/ComponentCatalog/ComponentCatalog';

// ============================================
// 🎯 DÉFINIR LE COMPOSANT À TESTER
// ============================================
const ComponentToTest = null; // Remplacer null par le nom du composant importé

const UndefinedRoom = () => {
  const [displayMode, setDisplayMode] = useState('panel-2x2');
  const [collapsed, setCollapsed] = useState(false);

  // Configuration des modes
  const displayConfigs = [
    { mode: 'no-panel', label: 'Sans Panel', hasPanel: false },
    { mode: 'panel-1x1', label: 'Panel 1×1', hasPanel: true, size: 1 },
    { mode: 'panel-2x2', label: 'Panel 2×2', hasPanel: true, size: 2 },
    { mode: 'panel-3x3', label: 'Panel 3×3', hasPanel: true, size: 3 },
  ];

  const currentConfig = displayConfigs.find(c => c.mode === displayMode);

  // Styles inline
  const styles = {
    container: {
      width: '100%',
      height: '100%',
      background: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
      gap: '20px',
      boxSizing: 'border-box'
    },
    controlBar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '15px 20px',
      background: 'rgba(0, 0, 0, 0.5)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)'
    },
    title: {
      margin: 0,
      color: '#ffd700',
      fontSize: '20px',
      fontFamily: 'system-ui, sans-serif'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px'
    },
    button: (active) => ({
      padding: '8px 16px',
      background: active ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)',
      color: active ? '#ffd700' : '#ffffff',
      border: active ? '2px solid #ffd700' : '1px solid rgba(255, 255, 255, 0.3)',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: active ? 'bold' : 'normal',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }),
    infoBadge: {
      padding: '6px 12px',
      background: 'rgba(255, 215, 0, 0.1)',
      border: '1px solid rgba(255, 215, 0, 0.3)',
      borderRadius: '8px',
      color: '#ffd700',
      fontSize: '12px',
      fontFamily: 'monospace',
      whiteSpace: 'nowrap'
    },
    testArea: {
      flex: 1,
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px dashed rgba(255, 215, 0, 0.2)',
      borderRadius: '12px',
      padding: '20px',
      overflow: 'auto',
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: 'repeat(5, 1fr)',
      gridTemplateRows: 'repeat(5, 1fr)',
      gap: '10px'
    },
    panel: (size) => {
      const start = Math.floor((5 - size) / 2) + 1;
      const end = start + size;
      return {
        gridColumn: `${start} / ${end}`,
        gridRow: `${start} / ${end}`,
        background: 'rgba(139, 69, 19, 0.3)', // Stone texture color
        border: '2px solid rgba(139, 69, 19, 0.6)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      };
    },
    panelHeader: {
      padding: '12px',
      background: 'rgba(0, 0, 0, 0.5)',
      borderBottom: '1px solid rgba(255, 215, 0, 0.3)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    panelTitle: {
      margin: 0,
      color: '#ffd700',
      fontSize: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    collapseButton: {
      padding: '4px 8px',
      background: 'rgba(255, 215, 0, 0.2)',
      border: '1px solid rgba(255, 215, 0, 0.4)',
      borderRadius: '4px',
      color: '#ffd700',
      fontSize: '12px',
      cursor: 'pointer'
    },
    panelContent: {
      flex: 1,
      padding: '20px',
      overflow: 'auto',
      display: collapsed ? 'none' : 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    noPanel: {
      gridColumn: '1 / 6',
      gridRow: '1 / 6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(255, 215, 0, 0.05)',
      border: '2px dashed rgba(255, 215, 0, 0.3)',
      borderRadius: '12px',
      padding: '40px'
    }
  };

  // Contenu à afficher
  const renderTestContent = () => {
    if (ComponentToTest) {
      return <ComponentToTest />;
    }
    return (
      <div style={{ textAlign: 'center', color: 'white' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>👋</div>
        <h3 style={{ margin: '0 0 8px 0', color: '#ffd700' }}>Labo Sandbox</h3>
        <p style={{ margin: '0 0 16px 0', opacity: 0.7, fontSize: '14px' }}>
          {currentConfig.hasPanel ? `Panel ${currentConfig.size}×${currentConfig.size}` : 'Sans Panel'}<br/>
          Position: Centré | Texture: Stone
        </p>
        <div style={{
          padding: '8px 16px',
          background: 'rgba(255, 215, 0, 0.1)',
          borderRadius: '8px',
          fontSize: '12px',
          fontFamily: 'monospace',
          color: '#ffd700'
        }}>
          💡 Importe un composant pour le tester
        </div>
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Barre de contrôle */}
      <div style={styles.controlBar}>
        <h2 style={styles.title}>🧪 Labo Sandbox</h2>
        <div style={styles.buttonGroup}>
          {displayConfigs.map(config => (
            <button
              key={config.mode}
              style={styles.button(displayMode === config.mode)}
              onClick={() => setDisplayMode(config.mode)}
            >
              {config.label}
            </button>
          ))}
        </div>
        <div style={styles.infoBadge}>
          Mode: {currentConfig.label} | Grid: 5×5 | {currentConfig.hasPanel && `Collapse: ${collapsed ? 'OFF' : 'ON'}`}
        </div>
      </div>

      {/* Zone de test */}
      <div style={styles.testArea}>
        {currentConfig.hasPanel ? (
          <div style={styles.panel(currentConfig.size)}>
            <div style={styles.panelHeader}>
              <h3 style={styles.panelTitle}>
                <span>🔬</span>
                Component Test
              </h3>
              <button
                style={styles.collapseButton}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? 'Expand ▼' : 'Collapse ▲'}
              </button>
            </div>
            <div style={styles.panelContent}>
              {renderTestContent()}
            </div>
          </div>
        ) : (
          <div style={styles.noPanel}>
            {renderTestContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default UndefinedRoom;