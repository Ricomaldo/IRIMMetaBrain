// src/components/rooms/Forge/ForgeRoom.jsx

import React, { useState, Suspense, lazy } from 'react';
import { useTheme } from 'styled-components';
import BaseRoom from '../../layout/BaseRoom';
import Panel from '../../common/Panel';
import PanelGrid from '../../layout/PanelGrid';
import useNotesStore from '../../../stores/useNotesStore';
import MarkdownEditor from '../../common/MarkdownEditor';
import {
  ForgeTitle,
  TabContainer,
  TabButton,
  DevToolContainer,
  LoadingMessage,
  IframeContainer
} from './ForgeRoom.styles';

// Lazy loading des outils de dev
const SystemOverview = lazy(() => import('../../dev/SystemOverview/SystemOverview'));
const ComponentCatalog = lazy(() => import('../../dev/ComponentCatalog/ComponentCatalog'));

const ForgeRoom = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const { roomNotes, updateRoomNote } = useNotesStore();
  const forgeNotes = roomNotes.forge || '';

  const renderDevTool = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <Suspense fallback={<LoadingMessage>Chargement de System Overview...</LoadingMessage>}>
            <SystemOverview />
          </Suspense>
        );
      case 'catalog':
        return (
          <Suspense fallback={<LoadingMessage>Chargement du Component Catalog...</LoadingMessage>}>
            <ComponentCatalog />
          </Suspense>
        );
      case 'captures':
        return (
          <IframeContainer>
            <iframe
              src="/captures/viewer.html"
              title="Capture Viewer"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: theme.radii.md
              }}
            />
          </IframeContainer>
        );
      default:
        return null;
    }
  };

  return (
    <BaseRoom roomType="forge" layoutType="grid">
      <ForgeTitle>⚒️ Forge - Outils de Développement</ForgeTitle>

      <PanelGrid columns={5} rows={5}>
        {/* Panel principal avec les outils de dev */}
        <Panel
          gridColumn="1 / 4"
          gridRow="1 / 6"
          title="Dev Tools"
          icon="🔧"
          texture="metal"
          accentColor={theme.colors.accents.warm}
          collapsible={false}
        >
          <TabContainer>
            <TabButton
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            >
              🗺️ System Overview
            </TabButton>
            <TabButton
              active={activeTab === 'catalog'}
              onClick={() => setActiveTab('catalog')}
            >
              📚 Component Catalog
            </TabButton>
            <TabButton
              active={activeTab === 'captures'}
              onClick={() => setActiveTab('captures')}
            >
              📸 Capture Viewer
            </TabButton>
          </TabContainer>

          <DevToolContainer>
            {renderDevTool()}
          </DevToolContainer>
        </Panel>

        {/* Panel de notes de la forge */}
        <Panel
          gridColumn="4 / 6"
          gridRow="1 / 3"
          title="Notes de Forge"
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
            placeholder="Notes techniques et observations..."
            height="100%"
            compact={true}
            variant="embedded"
            accentColor={theme.colors.accents.cold}
          />
        </Panel>

        {/* Panel de métriques */}
        <Panel
          gridColumn="4 / 6"
          gridRow="3 / 6"
          title="Métriques"
          icon="📊"
          texture="metal"
          accentColor={theme.colors.accents.success}
          collapsible={true}
          defaultCollapsed={false}
        >
          <div style={{ padding: theme.spacing.md }}>
            <h4>État du système</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>✅ System Overview: Actif</li>
              <li>✅ Component Catalog: Actif</li>
              <li>✅ Capture System: Actif</li>
              <li>📦 Stores Zustand: {window.__ZUSTAND_STORES__ ? Object.keys(window.__ZUSTAND_STORES__).length : 0}</li>
              <li>🎨 Composants chargés: {document.querySelectorAll('[data-component]').length || 'N/A'}</li>
            </ul>
          </div>
        </Panel>
      </PanelGrid>
    </BaseRoom>
  );
};

export default ForgeRoom;
