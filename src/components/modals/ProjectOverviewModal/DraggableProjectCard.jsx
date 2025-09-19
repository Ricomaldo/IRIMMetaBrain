// src/components/modals/ProjectOverviewModal/DraggableProjectCard.jsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { ProjectCard, CheckboxWrapper, ProjectName, ProjectStatus, ProjectCategory } from './ProjectOverviewModal.styles';
import ProjectBadges from './ProjectBadges';

const DragHandle = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.xs};
  right: ${({ theme }) => theme.spacing.xs};
  width: 24px;
  height: 24px;
  cursor: grab;
  opacity: 0.3;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
    background: ${({ theme }) => theme.colors.background};
  }

  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '⋮⋮';
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSecondary};
    letter-spacing: -2px;
  }
`;

const DraggableCard = styled(ProjectCard)`
  cursor: ${({ $isDragging }) => $isDragging ? 'grabbing' : 'pointer'};
  opacity: ${({ $isDragging }) => $isDragging ? 0.5 : 1};
  transform: ${({ $transform }) => $transform || 'none'};
  transition: ${({ $transition, $isDragging }) =>
    $isDragging ? 'none' : $transition || 'all 0.2s ease'};
  box-shadow: ${({ theme, $isDragging }) =>
    $isDragging
      ? `0 10px 30px ${theme.colors.black}30`
      : `0 1px 3px ${theme.colors.black}10`};
  z-index: ${({ $isDragging }) => $isDragging ? 1000 : 'auto'};

  &:hover ${DragHandle} {
    opacity: 1;
  }
`;

const DraggableProjectCard = ({
  project,
  isSelected,
  onToggleVisibility,
  onClick,
  onDoubleClick,
  visibleProjects
}) => {
  console.log('🔧 RENDERING DraggableProjectCard:', project.id);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
    disabled: false,
  });

  console.log('🔧 Sortable hook result:', {
    hasListeners: !!listeners,
    hasAttributes: !!attributes,
    isDragging
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleCardClick = (e) => {
    // Ne pas déclencher le click si on clique sur le drag handle
    if (e.target.closest('[data-drag-handle]')) {
      return;
    }
    onClick();
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onToggleVisibility();
  };

  return (
    <DraggableCard
      ref={setNodeRef}
      $selected={isSelected}
      $isDragging={isDragging}
      $transform={style.transform}
      $transition={transition}
      onClick={handleCardClick}
      onDoubleClick={onDoubleClick}
      title="Double-cliquez pour éditer • Glissez pour réorganiser"
    >
      <DragHandle
        {...attributes}
        {...listeners}
        data-drag-handle
      />

      <CheckboxWrapper>
        <input
          type="checkbox"
          checked={visibleProjects.includes(project.id)}
          onChange={handleCheckboxClick}
          onClick={(e) => e.stopPropagation()}
        />
      </CheckboxWrapper>

      <ProjectName>{project.name}</ProjectName>

      <ProjectStatus $status={project.status}>
        {project.status || 'actif'}
      </ProjectStatus>

      {project.subcategory && (
        <ProjectCategory>{project.subcategory}</ProjectCategory>
      )}

      <ProjectBadges project={project} showAll={false} />
    </DraggableCard>
  );
};

export default DraggableProjectCard;