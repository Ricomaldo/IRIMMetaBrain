// src/components/rooms/Atelier/AtelierRoom.jsx

import React from 'react';
import useProjectsStore from '../../../stores/useProjectsStore';
import BaseRoom from '../shared/BaseRoom';
import MarkdownPanel from '../../common/MarkdownPanel';
import { usePanelContent } from '../../../hooks/usePanelContent';
import {
  AtelierGrid,
  PanelTitle
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
          <PanelTitle>
            Aucun projet sélectionné
          </PanelTitle>
        </AtelierGrid>
      </BaseRoom>
    );
  }

      return (
        <BaseRoom roomType="atelier" layoutType="grid">
          <AtelierGrid>
            {/* Nom du projet - En haut */}
            <PanelTitle>
              Projet à l'affiche : {project.name}
            </PanelTitle>

            {/* Roadmap */}
            <MarkdownPanel
              title="Roadmap"
              icon="🗺️"
              variant="roadmap"
              value={roadmapContent}
              onChange={updateRoadmapContent}
              placeholder="Définissez votre roadmap en markdown..."
              gridColumn="1 / 4"
              gridRow="1 / 4"
              showMetrics={true}
              editable={true}
              showPreview={true}
              defaultCollapsed={true}
            />

            {/* Todo */}
            <MarkdownPanel
              title="Todo"
              icon="✅"
              variant="todo"
              value={todoContent}
              onChange={updateTodoContent}
              placeholder="Gérez vos tâches en markdown..."
              gridColumn="4 / 7"
              gridRow="1 / 4"
              showMetrics={true}
              editable={true}
              showPreview={true}
              defaultCollapsed={true}
            />
          </AtelierGrid>
        </BaseRoom>
      );
};

export default AtelierRoom;