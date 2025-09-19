// src/components/rooms/Laboratoire/LaboratoireRoom.jsx
// LABO SANDBOX - Espace de test et expérimentation

import { useState } from "react";
import BaseRoom from "../../layout/BaseRoom";
import PanelGrid from "../../layout/PanelGrid";
import Panel from "../../common/Panel";
import { useTheme } from "styled-components";
import {
  ControlHeader,
  LaboTitle,
  WelcomeContent,
  WelcomeEmoji,
  WelcomeTitle,
  WelcomeDescription,
  WelcomeHint,
  NoPanelContent,
  LargeEmoji,
  NoPanelSubtitle,
  NoPanelCenter,
} from "./LaboratoireRoom.styles";
import Button from "../../common/Button";
import ComponentToTest from "../../room-modules/laboratoire/ComponentToTest";

/**
 * Laboratoire room component for testing and experimenting with components
 * @renders BaseRoom
 * @renders ControlHeader
 * @renders LaboTitle
 * @renders Button
 * @renders PanelGrid
 * @renders Panel
 * @renders WelcomeContent
 * @renders WelcomeEmoji
 * @renders WelcomeTitle
 * @renders WelcomeDescription
 * @renders WelcomeHint
 * @renders NoPanelContent
 * @renders NoPanelCenter
 * @renders LargeEmoji
 * @renders NoPanelSubtitle
 */
const LaboratoireRoom = () => {
  const theme = useTheme();
  const [panelWidth, setPanelWidth] = useState(4);
  const [panelHeight, setPanelHeight] = useState(3);
  const [showPanel, setShowPanel] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  // Fonction pour obtenir le variant selon la valeur
  const getButtonVariant = (value, currentValue) => {
    if (value === currentValue) return "primary";
    const variants = {
      1: "cool", // Bleu
      2: "warm", // Doré
      3: "nature", // Vert
      4: "primary-colored", // Principal
      5: "danger", // Rouge
    };
    return variants[value] || "default";
  };

  // Calcul position - commence à la 1ère rangée, 1ère colonne
  const getGridPosition = () => {
    if (!showPanel) return null;

    const startCol = 1;
    const endCol = startCol + panelWidth;
    const startRow = 1;
    const endRow = startRow + panelHeight;

    return {
      gridColumn: `${startCol} / ${endCol}`,
      gridRow: `${startRow} / ${endRow}`,
    };
  };

  const gridPos = getGridPosition();

  return (
    <BaseRoom roomType="laboratoire" layoutType="grid">
      {/* Barre de contrôles des dimensions */}
      <ControlHeader>
        <LaboTitle>🧪 Rendu </LaboTitle>
        <Button
          size="small"
          variant={showPanel ? "secondary" : "primary"}
          onClick={() => setShowPanel(!showPanel)}
          style={{ marginRight: "12px" }}
        >
          {showPanel ? "👁️" : "∅"}
        </Button>

        <span
          style={{ color: "#ffd700", marginRight: "8px", fontWeight: "bold" }}
        >
          W:
        </span>
        {[1, 2, 3, 4, 5].map((w) => (
          <Button
            key={`w-${w}`}
            size="small"
            variant={getButtonVariant(w, panelWidth)}
            active={panelWidth === w}
            onClick={() => setPanelWidth(w)}
          >
            {w}
          </Button>
        ))}

        <span style={{ color: "#ffd700", margin: "0 8px", fontWeight: "bold" }}>
          H:
        </span>
        {[1, 2, 3, 4, 5].map((h) => (
          <Button
            key={`h-${h}`}
            size="small"
            variant={getButtonVariant(h, panelHeight)}
            active={panelHeight === h}
            onClick={() => setPanelHeight(h)}
          >
            {h}
          </Button>
        ))}
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
            texture="wood"
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
                  Panel {panelWidth}×{panelHeight}
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

export default LaboratoireRoom;
