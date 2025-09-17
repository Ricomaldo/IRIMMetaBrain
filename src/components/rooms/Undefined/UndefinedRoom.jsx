// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Test des composants avec grilles responsives

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import BaseRoom from '../../layout/BaseRoom';
import Panel from '../../common/Panel';
import PanelGrid from '../../layout/PanelGrid';
import {
  SandboxContainer,
  ControlBar,
  GridButton,
  TestArea,
  InfoBadge
} from './UndefinedRoom.styles';

const UndefinedRoom = () => {
  const theme = useTheme();
  const [gridSize, setGridSize] = useState(2); // Par défaut 2x2
  const [collapsed, setCollapsed] = useState(false);

  // Configuration des grilles
  const gridConfigs = [
    { size: 1, label: '1x1', columns: 1, rows: 1 },
    { size: 2, label: '2x2', columns: 2, rows: 2 },
    { size: 3, label: '3x3', columns: 3, rows: 3 },
    { size: 4, label: '4x4', columns: 4, rows: 4 },
  ];

  const currentConfig = gridConfigs.find(c => c.size === gridSize);

  // Calcul de la position centrale dans la grille
  const getCenterPosition = () => {
    if (gridSize === 1) {
      return { gridColumn: '1', gridRow: '1' };
    }
    // Pour les grilles paires (2x2, 4x4), on centre sur les cellules du milieu
    // Pour les grilles impaires (3x3), on prend la cellule centrale
    const mid = Math.ceil(gridSize / 2);
    return {
      gridColumn: `${mid} / ${mid + 1}`,
      gridRow: `${mid} / ${mid + 1}`
    };
  };

  const centerPos = getCenterPosition();

  return (
    <BaseRoom roomType="undefined" layoutType="flex">
      <SandboxContainer>
        {/* Barre de contrôle */}
        <ControlBar>
          <h2>🧪 Labo Sandbox</h2>
          <div style={{ display: 'flex', gap: theme.spacing.sm }}>
            {gridConfigs.map(config => (
              <GridButton
                key={config.size}
                $active={gridSize === config.size}
                onClick={() => setGridSize(config.size)}
              >
                {config.label}
              </GridButton>
            ))}
          </div>
          <InfoBadge>
            Grid: {currentConfig.label} | Panel: Stone | Collapsible: {collapsed ? 'OFF' : 'ON'}
          </InfoBadge>
        </ControlBar>

        {/* Zone de test avec grille */}
        <TestArea>
          <PanelGrid columns={currentConfig.columns} rows={currentConfig.rows}>
            <Panel
              gridColumn={centerPos.gridColumn}
              gridRow={centerPos.gridRow}
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
                  Grid: {currentConfig.label}<br/>
                  Position: Center<br/>
                  Texture: Stone
                </p>
              </div>
            </Panel>
          </PanelGrid>
        </TestArea>
      </SandboxContainer>
    </BaseRoom>
  );
};

export default UndefinedRoom;