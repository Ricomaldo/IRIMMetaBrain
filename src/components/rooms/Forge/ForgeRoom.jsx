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
import { ForgeToolbar, ForgeTitle } from "./ForgeRoom.styles";

const ForgeRoom = () => {
  const theme = useTheme();
  const { roomNotes, updateRoomNote } = useNotesStore();
  const forgeNotes = roomNotes.forge || "";
  const [showCatalog, setShowCatalog] = useState(false);

  return (
    <BaseRoom roomType="forge" layoutType="grid">
      <PanelGrid columns={5} rows={5}>
        {showCatalog && (
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
        )}
      </PanelGrid>
      {/* Toolbar avec 4 boutons placeholder */}
      <ForgeToolbar>
        <Button
          size="small"
          variant="secondary"
          onClick={() => setShowCatalog(!showCatalog)}
        >
          🔨 PROPS
        </Button>
        <Button size="small" variant="secondary">
          ⚙️ Action 2
        </Button>
        <Button size="small" variant="secondary">
          🔧 Action 3
        </Button>
        <Button size="small" variant="secondary">
          ⚡ Action 4
        </Button>
      </ForgeToolbar>
    </BaseRoom>
  );
};

export default ForgeRoom;
