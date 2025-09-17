// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Test des composants avec grilles responsives

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import BaseRoom from '../../layout/BaseRoom';
import Panel from '../../common/Panel';
import PanelGrid from '../../layout/PanelGrid';
import SystemOverview from '../../dev/SystemOverview/SystemOverview';
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
    const mid = Math.ceil(gridSize / 2);
    return {
      gridColumn: gridSize === 1 ? '1' : `${mid} / ${mid + 1}`,
      gridRow: gridSize === 1 ? '1' : `${mid} / ${mid + 1}`
    };
  };

  const centerPos = getCenterPosition();

  return (
    <BaseRoom roomType="undefined" layoutType="grid">
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
            Grid: {currentConfig.label} | Panel: Stone | Collapsible: ON
          </InfoBadge>
        </ControlBar>

        {/* Zone de test avec grille */}
        <TestArea>
          <PanelGrid columns={currentConfig.columns} rows={currentConfig.rows}>
            <Panel
              gridColumn={centerPos.gridColumn}
              gridRow={centerPos.gridRow}
              title="SystemOverview Test"
              icon="🔬"
              texture="stone"
              accentColor={theme.colors.accents.warm}
              collapsible={true}
              collapsed={collapsed}
              onToggleCollapse={setCollapsed}
            >
              <div style={{
                padding: theme.spacing.md,
                height: '100%',
                overflow: 'auto'
              }}>
                <SystemOverview />
              </div>
            </Panel>
          </PanelGrid>
        </TestArea>
      </SandboxContainer>
    </BaseRoom>
  );
};

export default UndefinedRoom;