// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Structure identique à l'Atelier

import React, { useState } from "react";
import BaseRoom from "../../layout/BaseRoom";
import PanelGrid from "../../layout/PanelGrid";
import Panel from "../../common/Panel";
import { useTheme } from "styled-components";
import {
  SandboxControlBar,
  SandboxConfigButton,
  WelcomeContent,
  WelcomeEmoji,
  WelcomeTitle,
  WelcomeDescription,
  WelcomeHint,
  NoPanelContent,
  LargeEmoji,
  NoPanelSubtitle,
  LaboTitle,
} from "./UndefinedRoom.styles";

// ============================================
// 🧪 IMPORTER LE COMPOSANT À TESTER ICI
// ============================================
// Exemple : import SystemOverview from '../../dev/SystemOverview/SystemOverview';

const ComponentToTest = null; // Remplacer par le composant importé

const UndefinedRoom = () => {
  const theme = useTheme();
  const [displayMode, setDisplayMode] = useState("panel-2x2");
  const [collapsed, setCollapsed] = useState(false);

  const configs = [
    { mode: "no-panel", label: "Sans Panel" },
    { mode: "panel-1x1", label: "Panel 1×1" },
    { mode: "panel-2x2", label: "Panel 2×2" },
    { mode: "panel-3x3", label: "Panel 3×3" },
  ];

  const getPanelSize = () => {
    if (displayMode === "panel-1x1") return 1;
    if (displayMode === "panel-2x2") return 2;
    if (displayMode === "panel-3x3") return 3;
    return 0;
  };

  const panelSize = getPanelSize();
  const showPanel = displayMode !== "no-panel";

  // Calcul position - commence à la 2e rangée, centré horizontalement
  const getGridPosition = (size) => {
    if (size === 0) return null;

    const startCol = Math.floor((5 - size) / 2) + 1;
    const endCol = startCol + size;

    return {
      gridColumn: `${startCol} / ${endCol}`,
      gridRow: `2 / ${2 + size}`,
    };
  };

  const gridPos = getGridPosition(panelSize);

  return (
    <BaseRoom roomType="undefined" layoutType="grid">
      {/* Titre du labo */}
      <LaboTitle>🧪 Labo ???</LaboTitle>

      {/* Grille 5x5 */}
      <PanelGrid columns={5} rows={5}>
        {/* Barre de contrôle dans la première rangée de la grille */}
        <div
          style={{
            gridColumn: "1 / 6",
            gridRow: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SandboxControlBar style={{ margin: 0 }}>
            {configs.map((config) => (
              <SandboxConfigButton
                key={config.mode}
                onClick={() => setDisplayMode(config.mode)}
                $active={displayMode === config.mode}
              >
                {config.label}
              </SandboxConfigButton>
            ))}
          </SandboxControlBar>
        </div>
        {showPanel ? (
          // Avec Panel
          panelSize === 2 ? (
            <div style={{
              gridColumn: gridPos.gridColumn,
              gridRow: gridPos.gridRow,
              transform: 'translateX(25%)'
            }}>
              <Panel
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
                    <WelcomeHint>💡 Importe un composant ligne 14</WelcomeHint>
                  </WelcomeContent>
                )}
              </Panel>
            </div>
          ) : (
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
                  <WelcomeHint>💡 Importe un composant ligne 14</WelcomeHint>
                </WelcomeContent>
              )}
            </Panel>
          )
        ) : (
          // Sans Panel - Contenu direct
          <NoPanelContent>
            {ComponentToTest ? (
              <ComponentToTest />
            ) : (
              <div style={{ textAlign: "center" }}>
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
