// src/components/rooms/Atelier/AtelierRoom.jsx

import React from 'react';
import { useTheme } from 'styled-components';
import useProjectsStore from '../../../stores/useProjectsStore';
import BaseRoom from '../../layout/BaseRoom';
import Panel from '../../common/Panel';
import MarkdownEditor from '../../common/MarkdownEditor';
import { usePanelContent } from '../../../hooks/usePanelContent';
import PanelGrid from '../../layout/PanelGrid';
import {
  PanelTitle
} from './AtelierRoom.styles';

/**
 * Atelier - Espace de travail sur les projets
 * @renders BaseRoom
 * @renders PanelGrid
 * @renders Panel
 * @renders MarkdownEditor
 */
const AtelierRoom = () => {
  const { getCurrentProject, updateModuleState, getModuleState } = useProjectsStore();
  const project = getCurrentProject();
  const theme = useTheme();



  const {
    roadmapContent,
    todoContent,
    updateRoadmapContent,
    updateTodoContent
  } = usePanelContent(project?.id || 'default');

  // États collapse des modules
  const roadmapState = getModuleState(project?.id, 'roadmap');
  const todoState = getModuleState(project?.id, 'todo');
  const screentvState = getModuleState(project?.id, 'screentv');

  if (!project) {
    return (
      <BaseRoom roomType="atelier" layoutType="grid">
        <PanelGrid columns={1} rows={1}>
          <Panel
            gridColumn="1"
            gridRow="1"
            title="Aucun projet"
            icon="⚠️"
            collapsible={false}
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              Aucun projet sélectionné
            </div>
          </Panel>
        </PanelGrid>
      </BaseRoom>
    );
  }

      return (
        <BaseRoom roomType="atelier" layoutType="grid">
            {/* Nom du projet - En haut */}
            <PanelTitle>
              Projet à l'affiche : {project.name}
            </PanelTitle>
          <PanelGrid columns={5} rows={5}>


            {/* Roadmap */}
            <Panel
              gridColumn="1 / 4"
              gridRow="3 / 6"
              title="Roadmap"
              icon="🗺️"
              texture="parchment"
              accentColor={theme.colors.accents.cold}
              contentType="markdown"
              collapsible={true}
              collapsed={roadmapState.collapsed ?? true}
              onToggleCollapse={(newCollapsed) => updateModuleState(project.id, 'roadmap', { collapsed: newCollapsed })}
            >
              <MarkdownEditor
                value={roadmapContent}
                onChange={updateRoadmapContent}
                placeholder="Définissez votre roadmap en markdown..."
                height="100%"
                compact={true}
                variant="embedded"
                accentColor={theme.colors.accents.cold}
              />
            </Panel>

            {/* Todo */}
            <Panel
              gridColumn="4 / 6"
              gridRow="1 / 4"
              title="Todo"
              icon="✅"
              texture="parchment"
              accentColor={theme.colors.accents.success}
              contentType="markdown"
              collapsible={true}
              collapsed={todoState.collapsed ?? true}
              onToggleCollapse={(newCollapsed) => updateModuleState(project.id, 'todo', { collapsed: newCollapsed })}
            >
              <MarkdownEditor
                value={todoContent}
                onChange={updateTodoContent}
                placeholder="Gérez vos tâches en markdown..."
                height="100%"
                compact={true}
                variant="embedded"
                accentColor={theme.colors.accents.success}
              />
            </Panel>

            {/* ScreenTV */}
            <Panel
              gridColumn="1 / 3"
              gridRow="1 / 3"
              title="ScreenTV"
              icon="📺"
              texture="metal"
              accentColor={theme.colors.accents.cold}
              collapsible={true}
              collapsed={screentvState.collapsed ?? true}
              onToggleCollapse={(newCollapsed) => updateModuleState(project.id, 'screentv', { collapsed: newCollapsed })}
            >
              <div style={{ padding: '8px', textAlign: 'center' }}>
                📺 Upload screenshots here
              </div>
            </Panel>

          </PanelGrid>
        </BaseRoom>
      );
};

export default AtelierRoom;