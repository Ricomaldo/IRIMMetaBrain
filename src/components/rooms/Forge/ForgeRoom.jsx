// src/components/rooms/Forge/ForgeRoom.jsx

import React, { useState } from "react";
import { useTheme } from "styled-components";
import BaseRoom from "../../layout/BaseRoom";
import Panel from "../../common/Panel";
import PanelGrid from "../../layout/PanelGrid";
import useNotesStore from "../../../stores/useNotesStore";
import MarkdownEditor from "../../common/MarkdownEditor";
import Button from "../../common/Button";
import ComponentCatalog from "../../dev/ComponentCatalog/ComponentCatalog";
import SystemOverview from "../../dev/SystemOverview/SystemOverview";
import { ForgeToolbar, ForgeTitle } from "./ForgeRoom.styles";

/**
 * Forge room component for development tools and component testing
 * @renders BaseRoom
 * @renders ForgeTitle
 * @renders ForgeToolbar
 * @renders Button
 * @renders PanelGrid
 * @renders Panel
 * @renders ComponentCatalog
 * @renders SystemOverview
 * @renders MarkdownEditor
 */
const ForgeRoom = () => {
  const theme = useTheme();
  const { roomNotes, updateRoomNote } = useNotesStore();
  const forgeNotes = roomNotes.forge || "";
  const [showCatalog, setShowCatalog] = useState(false);
  const [showTree, setShowTree] = useState(false);

  return (
    <BaseRoom roomType="forge" layoutType="grid">
      {/* Toolbar en haut, avant la grid */}
      <ForgeToolbar>
        <Button
          size="small"
          variant="secondary"
          onClick={() => {
            setShowCatalog(!showCatalog);
            setShowTree(false);
          }}
        >
          🔨 PROPS
        </Button>
        <Button
          size="small"
          variant="secondary"
          onClick={() => {
            setShowTree(!showTree);
            setShowCatalog(false);
          }}
        >
          🌳 TREE
        </Button>
        <Button size="small" variant="secondary">
          🔧 Action 3
        </Button>
        <Button size="small" variant="secondary">
          ⚡ Action 4
        </Button>
      </ForgeToolbar>

      <PanelGrid columns={5} rows={5}>
        {showCatalog ? (
          <Panel
            gridColumn="1/6"
            gridRow="1/6"
            title="Component Props Catalog"
            icon="🔨"
            texture="metal"
            borderType="blue"
            accentColor={theme.colors.cold}
            collapsible={true}
            collapsed={false}
            onToggleCollapse={() => setShowCatalog(false)}
          >
            <ComponentCatalog />
          </Panel>
        ) : showTree ? (
          <Panel
            gridColumn="1/6"
            gridRow="1/6"
            title="Architecture Tree"
            icon="🌳"
            texture="metal"
            borderType="blue"
            accentColor={theme.colors.cold}
            collapsible={true}
            collapsed={false}
            onToggleCollapse={() => setShowTree(false)}
          >
            <SystemOverview />
          </Panel>
        ) : (
          <>
            {/* Panel principal vide pour le moment */}
            <Panel
              gridColumn="1 / 4"
              gridRow="1 / 6"
              title="Zone de Forge"
              icon="🔨"
              texture="metal"
              accentColor={theme.colors.accents.warm}
              collapsible={false}
            >
              <div style={{ padding: theme.spacing.md, textAlign: 'center' }}>
                <p>Zone principale de la Forge</p>
              </div>
            </Panel>

            {/* Panel de notes */}
            <Panel
              gridColumn="4 / 6"
              gridRow="1 / 6"
              title="Notes"
              icon="📝"
              texture="parchment"
              accentColor={theme.colors.accents.cold}
              contentType="markdown"
              collapsible={true}
              defaultCollapsed={false}
            >
              <MarkdownEditor
                value={forgeNotes}
                onChange={(value) => updateRoomNote('forge', value)}
                placeholder="Notes de forge..."
                height="100%"
                compact={true}
                variant="embedded"
                accentColor={theme.colors.accents.cold}
              />
            </Panel>
          </>
        )}
      </PanelGrid>
    </BaseRoom>
  );
};

export default ForgeRoom;