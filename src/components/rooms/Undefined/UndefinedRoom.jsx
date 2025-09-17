// src/components/rooms/Undefined/UndefinedRoom.jsx
// LABO SANDBOX - Structure identique à l'Atelier

import React, { useState } from "react";
import BaseRoom from "../../layout/BaseRoom";
import PanelGrid from "../../layout/PanelGrid";
import Panel from "../../common/Panel";
import { useTheme } from "styled-components";
import {
  SandboxControlBar,
  WelcomeContent,
  WelcomeEmoji,
  WelcomeTitle,
  WelcomeDescription,
  WelcomeHint,
  NoPanelContent,
  LargeEmoji,
  NoPanelSubtitle,
  LaboTitle,
  ControlHeader,
  NoPanelCenter,
} from "./UndefinedRoom.styles";

// ============================================
// 🧪 IMPORTER LE COMPOSANT À TESTER ICI
// ============================================
import Button from "../../common/Button";

const ComponentToTest = () => {
  const [activeVariant, setActiveVariant] = React.useState(null);

  const variants = {
    Basiques: [
      { name: "default", label: "Default" },
      { name: "secondary", label: "Secondary" },
      { name: "tab", label: "Tab" },
    ],
    Textures: [
      { name: "wood", label: "🪵 Wood" },
      { name: "stone", label: "🪨 Stone" },
      { name: "metal", label: "⚙️ Metal" },
      { name: "parchment", label: "📜 Parchment" },
    ],
    Niveaux: [
      { name: "primary-level", label: "Primary Level" },
      { name: "secondary-level", label: "Secondary Level" },
      { name: "tertiary-level", label: "Tertiary Level" },
    ],
    Couleurs: [
      { name: "cool", label: "Cool 💙" },
      { name: "warm", label: "Warm 🧡" },
      { name: "nature", label: "Nature 💚" },
      { name: "primary-colored", label: "Primary ⭐" },
    ],
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding: "20px",
        maxHeight: "400px",
        overflowY: "auto",
      }}
    >
      <h3 style={{ margin: 0, color: "#ffd700", textAlign: "center" }}>
        🎨 Arsenal de Boutons
      </h3>

      {Object.entries(variants).map(([category, buttons]) => (
        <div key={category}>
          <h4
            style={{
              margin: "10px 0 5px 0",
              color: "#DDA0DD",
              fontSize: "14px",
              borderBottom: "1px solid #DDA0DD",
              paddingBottom: "3px",
            }}
          >
            {category}
          </h4>
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
              marginBottom: "10px",
            }}
          >
            {buttons.map((btn) => (
              <Button
                key={btn.name}
                size="small"
                variant={btn.name}
                active={activeVariant === btn.name}
                onClick={() =>
                  setActiveVariant(activeVariant === btn.name ? null : btn.name)
                }
              >
                {btn.label}
              </Button>
            ))}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: "10px",
          padding: "10px",
          background: "rgba(255, 215, 0, 0.1)",
          borderRadius: "4px",
          fontSize: "12px",
        }}
      >
        <strong>Variant actif :</strong> {activeVariant || "Aucun"}
        <br />
        <em style={{ opacity: 0.7 }}>
          Clique sur les boutons pour voir l'état actif !
        </em>
      </div>
    </div>
  );
};

const UndefinedRoom = () => {
  const theme = useTheme();
  const [displayMode, setDisplayMode] = useState("panel-2x2");
  const [collapsed, setCollapsed] = useState(false);

  const configsLine1 = [
    { mode: "no-panel", label: "Sans Panel" },
    { mode: "panel-1x1", label: "1×1" },
    { mode: "panel-1x2", label: "1×2" },
    { mode: "panel-1x4", label: "1×4" },
    { mode: "panel-2x1", label: "2×1" },
    { mode: "panel-2x2", label: "2×2" },
  ];

  const configsLine2 = [
    { mode: "panel-2x3", label: "2×3" },
    { mode: "panel-2x4", label: "2×4" },
    { mode: "panel-3x2", label: "3×2" },
    { mode: "panel-3x3", label: "3×3" },
    { mode: "panel-3x4", label: "3×4" },
    { mode: "panel-4x4", label: "4×4" },
    { mode: "panel-4x5", label: "4×5" },
    { mode: "panel-5x5", label: "5×5" },
  ];

  // Fonction pour obtenir le variant selon la largeur du panel
  const getButtonVariant = (mode) => {
    if (mode === "no-panel") return "secondary";
    const width = parseInt(mode.split("-")[1].split("x")[0]);
    const variants = {
      1: "cool", // Bleu
      2: "warm", // Doré
      3: "nature", // Vert
      4: "primary-colored", // Principal (doré)
    };
    return variants[width] || "default";
  };

  const getPanelDimensions = () => {
    if (displayMode === "no-panel") return { width: 0, height: 0 };
    const parts = displayMode.replace("panel-", "").split("x");
    return {
      width: parseInt(parts[0]),
      height: parseInt(parts[1]),
    };
  };

  const panelDims = getPanelDimensions();
  const showPanel = displayMode !== "no-panel";

  // Calcul position - commence à la 1ère rangée, 1ère colonne
  const getGridPosition = (dims) => {
    if (dims.width === 0) return null;

    const startCol = 1;
    const endCol = startCol + dims.width;
    const startRow = 1;
    const endRow = startRow + dims.height; // Plus de limite Math.min

    return {
      gridColumn: `${startCol} / ${endCol}`,
      gridRow: `${startRow} / ${endRow}`,
    };
  };

  const gridPos = getGridPosition(panelDims);

  return (
    <BaseRoom roomType="laboratoire" layoutType="grid">
      {/* Header unifié avec titre et contrôles */}
      <ControlHeader>
        <LaboTitle>🧪 Test Rendu</LaboTitle>
        <SandboxControlBar>
          {[...configsLine1, ...configsLine2].map((config) => (
            <Button
              key={config.mode}
              size="small"
              variant={getButtonVariant(config.mode)}
              active={displayMode === config.mode}
              onClick={() => setDisplayMode(config.mode)}
            >
              {config.label}
            </Button>
          ))}
        </SandboxControlBar>
      </ControlHeader>

      {/* Grille 5x5 prenant toute la place */}
      <PanelGrid columns={5} rows={5} style={{ flex: 1 }}>
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
                  Panel {panelDims.width}×{panelDims.height}
                </WelcomeDescription>
                <WelcomeHint>💡 Importe un composant ligne 14</WelcomeHint>
              </WelcomeContent>
            )}
          </Panel>
        ) : (
          // Sans Panel - Contenu direct
          <NoPanelContent>
            {ComponentToTest ? (
              <ComponentToTest />
            ) : (
              <NoPanelCenter>
                <LargeEmoji>👋</LargeEmoji>
                <WelcomeTitle>Mode Sans Panel</WelcomeTitle>
                <NoPanelSubtitle>
                  Affichage direct dans la grille 5×5
                </NoPanelSubtitle>
              </NoPanelCenter>
            )}
          </NoPanelContent>
        )}
      </PanelGrid>
    </BaseRoom>
  );
};

export default UndefinedRoom;
