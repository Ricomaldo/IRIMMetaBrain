// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Test des composants avec grilles responsives

import React, { useState } from 'react';
import { useTheme } from 'styled-components';
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

// ============================================
// 🧪 IMPORTER LE COMPOSANT À TESTER ICI
// ============================================
// Exemple : import SystemOverview from '../../dev/SystemOverview/SystemOverview';
// Exemple : import ComponentCatalog from '../../dev/ComponentCatalog/ComponentCatalog';
// Exemple : import MonComposant from '../../../components/MonComposant';

// ============================================
// 🎯 DÉFINIR LE COMPOSANT À TESTER
// ============================================
const ComponentToTest = null; // Remplacer null par le nom du composant importé
// Exemple : const ComponentToTest = SystemOverview;

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

  // ============================================
  // 🎨 CONTENU À AFFICHER
  // ============================================
  const renderTestContent = () => {
    if (ComponentToTest) {
      // Si un composant est défini, on l'affiche
      return <ComponentToTest />;
    } else {
      // Sinon, on affiche le placeholder 👋
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: '200px',
          color: theme.colors.text,
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '80px', marginBottom: theme.spacing.md }}>👋</div>
          <h3 style={{ margin: 0, marginBottom: theme.spacing.sm, color: theme.colors.primary }}>
            Labo Sandbox
          </h3>
          <p style={{ margin: 0, opacity: 0.7, fontSize: theme.typography.sizes.sm }}>
            Panel: {currentConfig.hasPanel ? `${currentConfig.size}×${currentConfig.size}` : 'Aucun'}<br/>
            Position: Centré<br/>
            Texture: Stone
          </p>
          <div style={{
            marginTop: theme.spacing.lg,
            padding: theme.spacing.sm,
            background: 'rgba(255, 215, 0, 0.1)',
            borderRadius: theme.radii.md,
            fontSize: theme.typography.sizes.xs,
            fontFamily: theme.typography.families.mono
          }}>
            💡 Importe un composant pour le tester
          </div>
        </div>
      );
    }
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
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
                  height: '100%',
                  overflow: 'auto'
                }}>
                  {renderTestContent()}
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
                padding: theme.spacing.xl
              }}>
                {/* Mode sans panel - affichage direct */}
                {renderTestContent()}
              </div>
            )}
          </PanelGrid>
        </TestArea>
      </SandboxContainer>
    </div>
  );
};

export default UndefinedRoom;