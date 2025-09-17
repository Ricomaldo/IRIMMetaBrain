// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Structure identique à l'Atelier

import React, { useState } from 'react';
import BaseRoom from '../../layout/BaseRoom';
import PanelGrid from '../../layout/PanelGrid';
import Panel from '../../common/Panel';
import { useTheme } from 'styled-components';

// ============================================
// 🧪 IMPORTER LE COMPOSANT À TESTER ICI
// ============================================
// Exemple : import SystemOverview from '../../dev/SystemOverview/SystemOverview';

const ComponentToTest = null; // Remplacer par le composant importé

const UndefinedRoom = () => {
  const theme = useTheme();
  const [displayMode, setDisplayMode] = useState('panel-2x2');
  const [collapsed, setCollapsed] = useState(false);

  const configs = [
    { mode: 'no-panel', label: 'Sans Panel' },
    { mode: 'panel-1x1', label: 'Panel 1×1' },
    { mode: 'panel-2x2', label: 'Panel 2×2' },
    { mode: 'panel-3x3', label: 'Panel 3×3' },
  ];

  const getPanelSize = () => {
    if (displayMode === 'panel-1x1') return 1;
    if (displayMode === 'panel-2x2') return 2;
    if (displayMode === 'panel-3x3') return 3;
    return 0;
  };

  const panelSize = getPanelSize();
  const showPanel = displayMode !== 'no-panel';

  // Calcul position centrée dans grille 5x5
  const getGridPosition = (size) => {
    if (size === 0) return null;
    const start = Math.floor((5 - size) / 2) + 1;
    const end = start + size;
    return {
      gridColumn: `${start} / ${end}`,
      gridRow: `${start} / ${end}`
    };
  };

  const gridPos = getGridPosition(panelSize);


  return (
    <BaseRoom roomType="undefined" layoutType="grid">
      {/* Barre de contrôle horizontale comme dans l'Atelier */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.8)',
        border: '2px solid #ffd700',
        borderRadius: '12px',
        marginBottom: '20px',
        width: 'fit-content',
        margin: '0 auto 20px'
      }}>
        {configs.map(config => (
          <button
            key={config.mode}
            onClick={() => setDisplayMode(config.mode)}
            style={{
              padding: '6px 12px',
              background: displayMode === config.mode ? '#ffd700' : 'transparent',
              color: displayMode === config.mode ? 'black' : '#ffd700',
              border: '1px solid #ffd700',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: displayMode === config.mode ? 'bold' : 'normal'
            }}
          >
            {config.label}
          </button>
        ))}
      </div>

      {/* Grille 5x5 */}
      <PanelGrid columns={5} rows={5}>
        {showPanel ? (
          // Avec Panel
          <Panel
            gridColumn={gridPos.gridColumn}
            gridRow={gridPos.gridRow}
            title="Test Component"
            icon="🔬"
            texture="stone"
            accentColor={theme.colors.accents.warm}
            collapsible={true}
            collapsed={collapsed}
            onToggleCollapse={setCollapsed}
          >
            {ComponentToTest ? (
              <ComponentToTest />
            ) : (
              <div style={{
                padding: theme.spacing.lg,
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '60px', marginBottom: theme.spacing.md }}>👋</div>
                <h3 style={{ color: theme.colors.primary, margin: 0 }}>
                  Labo Sandbox
                </h3>
                <p style={{ opacity: 0.7, margin: `${theme.spacing.sm} 0` }}>
                  Panel {panelSize}×{panelSize}
                </p>
                <div style={{
                  marginTop: theme.spacing.lg,
                  padding: theme.spacing.sm,
                  background: 'rgba(255, 215, 0, 0.1)',
                  borderRadius: theme.radii.sm,
                  fontSize: theme.typography.sizes.xs
                }}>
                  💡 Importe un composant ligne 14
                </div>
              </div>
            )}
          </Panel>
        ) : (
          // Sans Panel - Contenu direct
          <div style={{
            gridColumn: '1 / 6',
            gridRow: '1 / 6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 215, 0, 0.05)',
            border: '2px dashed rgba(255, 215, 0, 0.3)',
            borderRadius: theme.radii.lg,
            padding: theme.spacing.xl
          }}>
            {ComponentToTest ? (
              <ComponentToTest />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '80px', marginBottom: theme.spacing.md }}>👋</div>
                <h3 style={{ color: theme.colors.primary }}>Mode Sans Panel</h3>
                <p style={{ opacity: 0.7 }}>
                  Affichage direct dans la grille 5×5
                </p>
              </div>
            )}
          </div>
        )}
      </PanelGrid>
    </BaseRoom>
  );
};

export default UndefinedRoom;