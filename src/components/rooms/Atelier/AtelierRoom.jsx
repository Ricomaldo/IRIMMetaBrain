// src/components/rooms/Atelier/AtelierRoom.jsx

import React from 'react';
import useProjectsStore from '../../../stores/useProjectsStore';
import BaseRoom from '../shared/BaseRoom';
import MarkdownPanel from '../../common/MarkdownPanel';
import { usePanelContent } from '../../../hooks/usePanelContent';
import {
  AtelierGrid,
  ProjetNameBar
} from './AtelierRoom.styles';

const AtelierRoom = () => {
  const { getCurrentProject } = useProjectsStore();
  const project = getCurrentProject();

  const {
    roadmapContent,
    todoContent,
    updateRoadmapContent,
    updateTodoContent
  } = usePanelContent(project?.id || 'default');

  if (!project) {
    return (
      <BaseRoom roomType="atelier" layoutType="grid">
        <AtelierGrid>
          <ProjetNameBar>
            Aucun projet sélectionné
          </ProjetNameBar>
        </AtelierGrid>
      </BaseRoom>
    );
  }

  return (
    <BaseRoom roomType="atelier" layoutType="grid">
      <AtelierGrid>
        {/* Roadmap */}
        <MarkdownPanel
          title="Roadmap"
          icon="🗺️"
          variant="roadmap"
          value={roadmapContent}
          onChange={updateRoadmapContent}
          placeholder="Définissez votre roadmap en markdown..."
          gridColumn="1 / 3"
          gridRow="2 / 5"
          showMetrics={true}
          editable={true}
          showPreview={true}
        />

        {/* Todo */}
        <MarkdownPanel
          title="Todo"
          icon="✅"
          variant="todo"
          value={todoContent}
          onChange={updateTodoContent}
          placeholder="Gérez vos tâches en markdown..."
          gridColumn="4 / 6"
          gridRow="2 / 5"
          showMetrics={true}
          editable={true}
          showPreview={true}
        />

        {/* Nom du projet - Discret en haut */}
        <ProjetNameBar>
          {project.name}
        </ProjetNameBar>
      </AtelierGrid>
    </BaseRoom>
  );
};

export default AtelierRoom;