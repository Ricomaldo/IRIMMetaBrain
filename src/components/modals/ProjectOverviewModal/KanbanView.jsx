// src/components/modals/ProjectOverviewModal/KanbanView.jsx

import React, { useState } from 'react';
import styled from 'styled-components';
import { alpha } from '../../../styles/color';
import DraggableProjectCard from './DraggableProjectCard';
import ProjectDetailsModal from './ProjectDetailsModal';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { ProjectCard, ProjectName } from './ProjectOverviewModal.styles';

const KanbanContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ColumnsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.lg};
  min-height: 400px;
`;

const InboxSection = styled.div`
  background: ${({ theme }) => alpha(theme.colors.backgroundLight, 0.5)};
  border: 2px dashed ${({ theme }) => alpha(theme.colors.border, 0.3)};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
`;

const InboxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => alpha(theme.colors.border, 0.2)};
`;

const InboxTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};

  span {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const InboxGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.sm};
`;

const KanbanColumn = styled.div`
  background: ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return alpha(theme.colors.warning, 0.05);
      case 'pause': return alpha(theme.colors.textSecondary, 0.02);
      default: return 'white';
    }
  }};
  border: 2px solid ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return alpha(theme.colors.warning, 0.3);
      case 'pause': return alpha(theme.colors.textSecondary, 0.2);
      default: return alpha(theme.colors.border, 0.2);
    }
  }};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md};
  min-height: 300px;
  height: 100%;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return alpha(theme.colors.warning, 0.2);
      case 'pause': return alpha(theme.colors.textSecondary, 0.1);
      default: return alpha(theme.colors.primary, 0.1);
    }
  }};
`;

const ColumnTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: 600;
  color: ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return theme.colors.warning;
      case 'pause': return theme.colors.textSecondary;
      default: return theme.colors.primary;
    }
  }};

  span {
    margin-right: ${({ theme }) => theme.spacing.xs};
  }
`;

const ColumnCount = styled.span`
  padding: 2px 8px;
  background: ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return alpha(theme.colors.warning, 0.2);
      case 'pause': return alpha(theme.colors.textSecondary, 0.1);
      default: return alpha(theme.colors.primary, 0.1);
    }
  }};
  color: ${({ theme, $variant }) => {
    switch($variant) {
      case 'entete': return theme.colors.warning;
      case 'pause': return theme.colors.textSecondary;
      default: return theme.colors.primary;
    }
  }};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
`;

const ColumnContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  opacity: ${({ $variant }) => $variant === 'pause' ? 0.7 : 1};
`;

const LimitWarning = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => alpha(theme.colors.danger, 0.1)};
  color: ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.6;
`;

const KanbanView = ({
  projects,
  visibleProjects,
  toggleProjectVisibility,
  selectProject,
  moveToColumn,
  onEditProject,
  activeId,
  setActiveId
}) => {
  const [selectedProject, setSelectedProject] = useState(null);
  // Configuration des capteurs DnD
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Grouper les projets par colonne Kanban
  const columns = {
    entete: projects.filter(p => p.kanbanColumn === 'entete'),
    actif: projects.filter(p => p.kanbanColumn === 'actif'),
    pause: projects.filter(p => p.kanbanColumn === 'pause'),
    inbox: projects.filter(p => !p.kanbanColumn || p.kanbanColumn === 'inbox')
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const activeProject = projects.find(p => p.id === active.id);
    if (!activeProject) return;

    // Si l'over.id commence par 'column-', c'est une colonne
    if (over.id.toString().startsWith('column-')) {
      const targetColumn = over.id.toString().replace('column-', '');
      if (activeProject.kanbanColumn !== targetColumn) {
        moveToColumn(active.id, targetColumn);
      }
    } else {
      // Sinon, c'est un projet
      const overProject = projects.find(p => p.id === over.id);
      if (overProject && activeProject.kanbanColumn !== overProject.kanbanColumn) {
        moveToColumn(active.id, overProject.kanbanColumn || 'inbox');
      }
    }
  };

  const handleProjectClick = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const DroppableColumn = ({ columnId, children }) => {
    const { isOver, setNodeRef } = useDroppable({
      id: `column-${columnId}`
    });

    return (
      <div ref={setNodeRef} style={{ height: '100%' }}>
        {children}
      </div>
    );
  };

  const renderColumn = (columnId, title, icon, projects) => {
    const isEntete = columnId === 'entete';
    const isPause = columnId === 'pause';
    const hasLimit = isEntete && projects.length >= 5;

    return (
      <DroppableColumn columnId={columnId}>
        <KanbanColumn $variant={columnId}>
          <ColumnHeader $variant={columnId}>
            <ColumnTitle $variant={columnId}>
              <span>{icon}</span>
              {title}
            </ColumnTitle>
            <ColumnCount $variant={columnId}>
              {projects.length}
              {isEntete && ' / 5'}
            </ColumnCount>
          </ColumnHeader>

          {hasLimit && (
            <LimitWarning>
              ⚠️ Maximum atteint (5 projets)
            </LimitWarning>
          )}

          <SortableContext
            items={projects.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <ColumnContent $variant={columnId}>
              {projects.length > 0 ? (
                projects.map(project => (
                  <DraggableProjectCard
                    key={project.id}
                    project={project}
                    isSelected={visibleProjects.includes(project.id)}
                    visibleProjects={visibleProjects}
                    onToggleVisibility={() => toggleProjectVisibility(project.id)}
                    onClick={() => handleProjectClick(project.id)}
                    onDoubleClick={(e) => onEditProject(project, e)}
                  />
                ))
              ) : (
                <EmptyState>
                  {isPause ? 'Aucun projet en pause' : 'Glissez des projets ici'}
                </EmptyState>
              )}
            </ColumnContent>
          </SortableContext>
        </KanbanColumn>
      </DroppableColumn>
    );
  };

  return (
    <>
      <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <KanbanContainer>
        <ColumnsContainer>
          {renderColumn('entete', 'EN TÊTE', '🎯', columns.entete)}
          {renderColumn('actif', 'ACTIF', '⚡', columns.actif)}
          {renderColumn('pause', 'PAUSE', '⏸️', columns.pause)}
        </ColumnsContainer>

        {columns.inbox.length > 0 && (
          <DroppableColumn columnId="inbox">
            <InboxSection>
              <InboxHeader>
                <InboxTitle>
                  <span>📥</span>
                  Réserve de projets
                </InboxTitle>
                <ColumnCount>
                  {columns.inbox.length} projet{columns.inbox.length > 1 ? 's' : ''}
                </ColumnCount>
              </InboxHeader>
              <InboxGrid>
                <SortableContext
                  items={columns.inbox.map(p => p.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {columns.inbox.map(project => (
                    <DraggableProjectCard
                      key={project.id}
                      project={project}
                      isSelected={visibleProjects.includes(project.id)}
                      visibleProjects={visibleProjects}
                      onToggleVisibility={() => toggleProjectVisibility(project.id)}
                      onClick={() => handleProjectClick(project.id)}
                      onDoubleClick={(e) => onEditProject(project, e)}
                    />
                  ))}
                </SortableContext>
              </InboxGrid>
            </InboxSection>
          </DroppableColumn>
        )}
      </KanbanContainer>

      <DragOverlay>
        {activeId ? (
          <ProjectCard $selected>
            <ProjectName>
              {projects.find(p => p.id === activeId)?.name}
            </ProjectName>
          </ProjectCard>
        ) : null}
      </DragOverlay>
      </DndContext>

      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
};

export default KanbanView;