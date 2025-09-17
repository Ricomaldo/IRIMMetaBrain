// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Test des composants avec grilles responsives

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import BaseRoom from '../../layout/BaseRoom';
import Panel from '../../common/Panel';
import PanelGrid from '../../layout/PanelGrid';
import { alpha } from '../../../styles/color';
import {
  SandboxContainer,
  ControlBar,
  GridButton,
  TestArea,
  InfoBadge
} from './UndefinedRoom.styles';

const UndefinedRoom = () => {
  const theme = useTheme();
  const [displayMode, setDisplayMode] = useState('panel-2x2'); // Par défaut panel 2x2
  const [collapsed, setCollapsed] = useState(false);

  // Configuration des modes d'affichage
  const displayConfigs = [
    { mode: 'no-panel', label: 'Sans Panel', hasPanel: false },
    { mode: 'panel-1x1', label: 'Panel 1×1', hasPanel: true, size: 1 },
    { mode: 'panel-2x2', label: 'Panel 2×2', hasPanel: true, size: 2 },
    { mode: 'panel-3x3', label: 'Panel 3×3', hasPanel: true, size: 3 },
  ];

  const currentConfig = displayConfigs.find(c => c.mode === displayMode);

  // Grille toujours 5x5
  const GRID_SIZE = 5;

  // Calcul de la position du panel dans la grille 5x5
  const getPanelPosition = () => {
    if (!currentConfig.hasPanel) return null;

    const panelSize = currentConfig.size;
    // Centrer le panel dans la grille 5x5
    const start = Math.floor((GRID_SIZE - panelSize) / 2) + 1;
    const end = start + panelSize;

    return {
      gridColumn: `${start} / ${end}`,
      gridRow: `${start} / ${end}`
    };
  };

  const panelPosition = getPanelPosition();

  return (
    <BaseRoom roomType="undefined" layoutType="flex">
      <SandboxContainer>
        {/* Barre de contrôle */}
        <ControlBar>
          <h2>🧪 Labo Sandbox</h2>
          <div style={{ display: 'flex', gap: theme.spacing.sm }}>
            {displayConfigs.map(config => (
              <GridButton
                key={config.mode}
                $active={displayMode === config.mode}
                onClick={() => setDisplayMode(config.mode)}
              >
                {config.label}
              </GridButton>
            ))}
          </div>
          <InfoBadge>
            Mode: {currentConfig.label} | Grid: 5×5 | {currentConfig.hasPanel && `Collapse: ${collapsed ? 'OFF' : 'ON'}`}
          </InfoBadge>
        </ControlBar>

        {/* Zone de test avec grille 5x5 */}
        <TestArea>
          <PanelGrid columns={5} rows={5}>
            {currentConfig.hasPanel ? (
              <Panel
                gridColumn={panelPosition.gridColumn}
                gridRow={panelPosition.gridRow}
                title="Component Test"
                icon="🔬"
                texture="stone"
                accentColor={theme.colors.accents.warm}
                collapsible={true}
                collapsed={collapsed}
                onToggleCollapse={setCollapsed}
              >
                <div style={{
                  padding: theme.spacing.lg,
                  minHeight: '200px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: theme.colors.text,
                  fontFamily: theme.typography.families.mono,
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: theme.spacing.md }}>🧪</div>
                  <h3 style={{ margin: 0, marginBottom: theme.spacing.sm }}>Test Zone</h3>
                  <p style={{ margin: 0, opacity: 0.7, fontSize: theme.typography.sizes.sm }}>
                    Panel: {currentConfig.size}×{currentConfig.size}<br/>
                    Position: Centré<br/>
                    Texture: Stone
                  </p>
                </div>
              </Panel>
            ) : (
              <div style={{
                gridColumn: '1 / 6',
                gridRow: '1 / 6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 215, 0, 0.05)',
                border: `2px dashed ${alpha(theme.colors.primary, 0.3)}`,
                borderRadius: theme.radii.lg,
                padding: theme.spacing.xl,
                color: theme.colors.text
              }}>
                <div style={{ fontSize: '3rem', marginBottom: theme.spacing.lg }}>📐</div>
                <h2 style={{ margin: 0, marginBottom: theme.spacing.md, color: theme.colors.primary }}>Sans Panel</h2>
                <p style={{ margin: 0, opacity: 0.7, textAlign: 'center', maxWidth: '400px' }}>
                  Mode affichage direct dans la grille 5×5<br/>
                  Parfait pour tester les composants sans conteneur
                </p>
                <div style={{
                  marginTop: theme.spacing.xl,
                  padding: theme.spacing.lg,
                  background: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: theme.radii.md,
                  minWidth: '300px',
                  textAlign: 'center'
                }}>
                  {/* Ici on pourrait mettre le composant à tester */}
                  <code style={{ color: theme.colors.primary }}>{'<ComponentToTest />'}</code>
                </div>
              </div>
            )}
          </PanelGrid>
        </TestArea>
      </SandboxContainer>
    </BaseRoom>
  );
};

export default UndefinedRoom;