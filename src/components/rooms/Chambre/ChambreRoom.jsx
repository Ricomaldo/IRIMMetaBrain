// src/components/rooms/Chambre/ChambreRoom.jsx

import React from 'react';
import { useTheme } from 'styled-components';
import BaseRoom from '../../layout/BaseRoom';
import PanelGrid from '../../layout/PanelGrid';
import Panel from '../../common/Panel';
import useNotesStore from '../../../stores/useNotesStore';
import MarkdownEditor from '../../common/MarkdownEditor';
import { ChambreTitle } from './ChambreRoom.styles';

/**
 * Chambre room component for personal space and timers
 * @renders BaseRoom
 * @renders ChambreTitle
 * @renders PanelGrid
 * @renders Panel
 * @renders div
 * @renders p
 * @renders small
 * @renders MarkdownEditor
 */
const ChambreRoom = () => {
  const theme = useTheme();
  const { roomNotes, updateRoomNote } = useNotesStore();
  const chambreNotes = roomNotes.chambre || '';

  return (
    <BaseRoom roomType="chambre" layoutType="grid">
      <ChambreTitle>🛏️ Chambre</ChambreTitle>

      <PanelGrid columns={4} rows={4}>
        {/* Timer Zone - 2x2 en haut à gauche */}
        <Panel
          gridColumn="1 / 3"
          gridRow="1 / 3"
          title="Timers"
          icon="⏰"
          texture="wood"
          accentColor={theme.colors.accents.warm}
          collapsible={true}
        >
          <div style={{
            padding: theme.spacing.lg,
            textAlign: 'center',
            opacity: 0.7
          }}>
            <p>Module Timers</p>
            <small>À implémenter - Gestion du temps</small>
          </div>
        </Panel>

        {/* Totem - 1x1 en haut à droite */}
        <Panel
          gridColumn="4 / 5"
          gridRow="1 / 2"
          title="Totem"
          icon="🗿"
          texture="stone"
          accentColor={theme.colors.accents.nature}
          collapsible={true}
        >
          <div style={{
            padding: theme.spacing.md,
            textAlign: 'center',
            opacity: 0.7
          }}>
            <p>Totem</p>
            <small>Spirituel</small>
          </div>
        </Panel>

        {/* MindLog - 2x1 ligne 3 */}
        <Panel
          gridColumn="1 / 3"
          gridRow="3 / 4"
          title="MindLog"
          icon="🧠"
          texture="leather"
          accentColor={theme.colors.accents.cold}
          collapsible={true}
        >
          <div style={{
            padding: theme.spacing.md,
            textAlign: 'center',
            opacity: 0.7
          }}>
            <p>Module MindLog</p>
            <small>À implémenter - État mental</small>
          </div>
        </Panel>

        {/* Mantra - 2x1 ligne 3 */}
        <Panel
          gridColumn="3 / 5"
          gridRow="3 / 4"
          title="Mantras"
          icon="🕉️"
          texture="fabric"
          accentColor={theme.colors.accents.warm}
          collapsible={true}
        >
          <div style={{
            padding: theme.spacing.md,
            textAlign: 'center',
            opacity: 0.7
          }}>
            <p>Module Mantras</p>
            <small>À implémenter - Méditation</small>
          </div>
        </Panel>

        {/* Notes - 2x1 ligne 4 */}
        <Panel
          gridColumn="1 / 3"
          gridRow="4 / 5"
          title="Notes"
          icon="📝"
          texture="parchment"
          accentColor={theme.colors.accents.cold}
          contentType="markdown"
          collapsible={true}
        >
          <MarkdownEditor
            value={chambreNotes}
            onChange={(value) => updateRoomNote('chambre', value)}
            placeholder="Notes personnelles..."
            height="100%"
            compact={true}
            variant="embedded"
            accentColor={theme.colors.accents.cold}
          />
        </Panel>

        {/* Navigation - 2x1 ligne 4 */}
        <Panel
          gridColumn="3 / 5"
          gridRow="4 / 5"
          title="Navigation"
          icon="🧭"
          texture="metal"
          accentColor={theme.colors.accents.neutral}
          collapsible={true}
        >
          <div style={{
            padding: theme.spacing.md,
            textAlign: 'center',
            opacity: 0.7
          }}>
            <p>Module Navigation</p>
            <small>À implémenter - Accès rapide</small>
          </div>
        </Panel>
      </PanelGrid>
    </BaseRoom>
  );
};

export default ChambreRoom;