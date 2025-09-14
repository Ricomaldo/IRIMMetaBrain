// src/components/rooms/Atelier/AtelierRoom.jsx

import React from 'react';
import useProjectsStore from '../../../stores/useProjectsStore';
import RoomNote from '../RoomNote/RoomNote';
import {
  AtelierGrid,
  RoadmapPanel,
  TodoPanel,
  TitreProjetPanel,
  RoomNotePanel,
  PanelTitle
} from './AtelierRoom.styles';

const AtelierRoom = () => {
  const { getCurrentProject } = useProjectsStore();
  const project = getCurrentProject();

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
      {/* Roadmap - Colonnes 1-2, Rows 2-4 */}
      <RoadmapPanel>
        <PanelTitle>Roadmap</PanelTitle>
        {project.roadmap?.slice(0, 5).map((item) => (
          <div key={item.id} style={{
            padding: '4px 0',
            borderBottom: '1px solid #eee',
            fontSize: '10px'
          }}>
            {item.milestone}
          </div>
        ))}
      </RoadmapPanel>

      {/* Todo - Colonne 4, Rows 2-4 */}
      <TodoPanel>
        <PanelTitle>Todo</PanelTitle>
        {project.todo?.filter(t => t.status !== 'completed').slice(0, 6).map((item) => (
          <div key={item.id} style={{
            padding: '4px 0',
            borderBottom: '1px solid #eee',
            fontSize: '10px'
          }}>
            {item.task}
          </div>
        ))}
      </TodoPanel>

      {/* Titre Projet - Colonnes 2.5-4.5, Row 4 */}
      <TitreProjetPanel>
        {project.name}
      </TitreProjetPanel>

      {/* RoomNote - Colonne 5, Row 4 */}
      <RoomNotePanel>
        <RoomNote roomType="atelier" />
      </RoomNotePanel>
    </AtelierGrid>
  );
};

export default AtelierRoom;