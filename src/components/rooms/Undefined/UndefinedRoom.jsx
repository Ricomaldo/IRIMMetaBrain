// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Structure identique à l'Atelier

import React, { useState } from 'react';
import BaseRoom from '../../layout/BaseRoom';
import PanelGrid from '../../layout/PanelGrid';
import Panel from '../../common/Panel';
import { useTheme } from 'styled-components';
import {
  ControlBar,
  ConfigButton,
  WelcomeContent,
  WelcomeEmoji,
  WelcomeTitle,
  WelcomeDescription,
  WelcomeHint,
  NoPanelContent,
  LargeEmoji,
  NoPanelSubtitle
} from './UndefinedRoom.styles';

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
      <ControlBar>
        {configs.map(config => (
          <ConfigButton
            key={config.mode}
            onClick={() => setDisplayMode(config.mode)}
            $active={displayMode === config.mode}
          >
            {config.label}
          </ConfigButton>
        ))}
      </ControlBar>

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
              <WelcomeContent>
                <WelcomeEmoji>👋</WelcomeEmoji>
                <WelcomeTitle>Labo Sandbox</WelcomeTitle>
                <WelcomeDescription>
                  Panel {panelSize}×{panelSize}
                </WelcomeDescription>
                <WelcomeHint>
                  💡 Importe un composant ligne 14
                </WelcomeHint>
              </WelcomeContent>
            )}
          </Panel>
        ) : (
          // Sans Panel - Contenu direct
          <NoPanelContent>
            {ComponentToTest ? (
              <ComponentToTest />
            ) : (
              <div style={{ textAlign: 'center' }}>
                <LargeEmoji>👋</LargeEmoji>
                <WelcomeTitle>Mode Sans Panel</WelcomeTitle>
                <NoPanelSubtitle>
                  Affichage direct dans la grille 5×5
                </NoPanelSubtitle>
              </div>
            )}
          </NoPanelContent>
        )}
      </PanelGrid>
    </BaseRoom>
  );
};

export default UndefinedRoom;