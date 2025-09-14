// src/components/rooms/Atelier/AtelierRoom.jsx

import React from 'react';
import useProjectsStore from '../../../stores/useProjectsStore';
import RoomNote from '../RoomNote/RoomNote';
import EditablePanel from './EditablePanel/EditablePanel';
import { usePanelContent } from '../../../hooks/usePanelContent';
import {
  AtelierGrid,
  TitreProjetPanel
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
      <AtelierGrid>
        <TitreProjetPanel>
          Aucun projet sélectionné
        </TitreProjetPanel>
      </AtelierGrid>
    );
  }

  return (
    <AtelierGrid>
      {/* Roadmap - Wrapper parchemin avec style précédent */}
      <EditablePanel
        title="Roadmap"
        value={roadmapContent}
        onChange={updateRoadmapContent}
        placeholder="Définissez votre roadmap en markdown..."
        gridColumn="1 / 3"
        gridRow="1 / 4"
        panelType="roadmap"
      />

      {/* Todo - Wrapper parchemin avec style précédent */}
      <EditablePanel
        title="Todo"
        value={todoContent}
        onChange={updateTodoContent}
        placeholder="Gérez vos tâches en markdown..."
        gridColumn="4 / 6"
        gridRow="1 / 4"
        panelType="todo"
      />

      {/* Titre Projet - Colonnes 2.5-4.5, Row 4 */}
      <TitreProjetPanel>
        {project.name}
      </TitreProjetPanel>

      {/* RoomNote - Positionnement absolu */}
      <RoomNote roomType="atelier" />
    </AtelierGrid>
  );
};

export default AtelierRoom;