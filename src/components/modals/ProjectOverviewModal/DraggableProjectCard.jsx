// src/components/modals/ProjectOverviewModal/DraggableProjectCard.jsx

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { alpha } from '../../../styles/color';
import { ProjectCard, ProjectName, ProjectCategory } from './ProjectOverviewModal.styles';
import ProjectBadges from './ProjectBadges';
import Badge from '../../common/Badge';

const DragHandle = styled.div`
  width: 28px;
  height: 28px;
  cursor: grab;
  opacity: 0.6;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  border: 1px solid ${({ theme }) => alpha(theme.colors.primary, 0.3)};
  border-radius: 6px;
  flex-shrink: 0;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:active {
    cursor: grabbing;
    background: ${({ theme }) => alpha(theme.colors.primary, 0.3)};
  }

  &::before {
    content: '⋮⋮';
    font-size: 14px;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    letter-spacing: -3px;
  }
`;

const TopBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 40px;
  margin-bottom: ${({ theme, $collapsed }) => $collapsed ? '0' : theme.spacing.sm};
  cursor: grab;
  padding: ${({ theme }) => theme.spacing.sm};
  gap: ${({ theme }) => theme.spacing.sm};
  
  &:active {
    cursor: grabbing;
  }
`;

const CollapseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  line-height: 1;
  transition: color 0.2s ease;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TopBarProjectName = styled(ProjectName)`
  margin: 0;
  flex: 1;
`;

const CheckboxWrapper = styled.div`
  z-index: 3;

  input {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

const CardContent = styled.div`
  display: ${({ $collapsed }) => $collapsed ? 'none' : 'block'};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const DraggableCard = styled(ProjectCard)`
  cursor: ${({ $isDragging }) => $isDragging ? 'grabbing' : 'pointer'};
  opacity: ${({ $isDragging, $kanbanColumn }) => {
    if ($isDragging) return 0.5;
    if ($kanbanColumn === 'pause') return 0.6;
    return 1;
  }};
  transform: ${({ $transform }) => $transform || 'none'};
  transition: ${({ $transition, $isDragging }) =>
    $isDragging ? 'none' : $transition || 'all 0.2s ease'};
  box-shadow: ${({ theme, $isDragging, $kanbanColumn }) => {
    if ($isDragging) return `0 10px 30px ${theme.colors.black}30`;
    if ($kanbanColumn === 'entete') return `0 4px 12px ${alpha(theme.colors.warning, 0.3)}`;
    return `0 1px 3px ${theme.colors.black}10`;
  }};
  z-index: ${({ $isDragging }) => $isDragging ? 1000 : 'auto'};
  padding: ${({ theme }) => theme.spacing.md};

  ${({ theme, $kanbanColumn }) => {
    if ($kanbanColumn === 'entete') {
      return `
        background: linear-gradient(135deg,
          ${alpha(theme.colors.accents?.warm || '#B8860B', 0.08)},
          ${alpha(theme.colors.accents?.warm || '#B8860B', 0.02)}
        );
        border-color: ${alpha(theme.colors.accents?.warm || '#B8860B', 0.5)};
      `;
    }
    if ($kanbanColumn === 'pause') {
      return `
        filter: grayscale(0.3);
        background: ${alpha(theme.colors.stone || '#708090', 0.05)};
      `;
    }
    return '';
  }}

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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Timer pour distinguer simple clic et double clic
  const [clickTimeout, setClickTimeout] = React.useState(null);
  
  // État collapse (true par défaut)
  const [isCollapsed, setIsCollapsed] = React.useState(true);

  const handleCardClick = (e) => {
    // Ne pas déclencher le click si on clique sur le drag handle, checkbox ou collapse button
    if (e.target.closest('[data-drag-handle]') || e.target.type === 'checkbox' || e.target.closest('button')) {
      return;
    }

    // Utiliser un délai pour éviter le conflit avec le double-clic
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    } else {
      const timeout = setTimeout(() => {
        onClick();
        setClickTimeout(null);
      }, 200);
      setClickTimeout(timeout);
    }
  };

  const handleDoubleClick = (e) => {
    // Annuler le simple clic en cas de double-clic
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      setClickTimeout(null);
    }
    onDoubleClick(e);
  };

  const handleCheckboxClick = (e) => {
    e.stopPropagation();
    onToggleVisibility();
  };

  const handleCollapseToggle = (e) => {
    e.stopPropagation();
    setIsCollapsed(!isCollapsed);
  };

  return (
    <DraggableCard
      ref={setNodeRef}
      $selected={isSelected}
      $isDragging={isDragging}
      $kanbanColumn={project.kanbanColumn}
      $transform={style.transform}
      $transition={transition}
      onClick={handleCardClick}
      onDoubleClick={handleDoubleClick}
      title="Double-cliquez pour éditer • Glissez pour réorganiser"
    >
      <TopBar
        {...attributes}
        {...listeners}
        data-drag-handle
        $collapsed={isCollapsed}
      >
        <DragHandle />
        <CollapseButton onClick={handleCollapseToggle}>
          {isCollapsed ? '▶' : '▼'}
        </CollapseButton>
        <TopBarProjectName>{project.name}</TopBarProjectName>
        <CheckboxWrapper>
          <input
            type="checkbox"
            checked={visibleProjects.includes(project.id)}
            onChange={handleCheckboxClick}
            onClick={(e) => e.stopPropagation()}
          />
        </CheckboxWrapper>
      </TopBar>

      <CardContent $collapsed={isCollapsed}>
        <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', flexWrap: 'wrap' }}>
          <Badge
            color={project.status || 'dev_actif'}
            variant="subtle"
            size="sm"
            shape="rounded"
            icon={(() => {
              switch(project.status) {
                case 'dev_actif': return '⚡';
                case 'concept': return '💡';
                case 'vision': return '🔮';
                case 'maintenance': return '🔧';
                case 'pause': return '⏸️';
                case 'archive': return '📦';
                default: return '⚡';
              }
            })()}
          >
            {(() => {
              switch(project.status) {
                case 'dev_actif': return 'Dev Actif';
                case 'concept': return 'Concept';
                case 'vision': return 'Vision';
                case 'maintenance': return 'Maintenance';
                case 'pause': return 'En Pause';
                case 'archive': return 'Archivé';
                default: return 'Actif';
              }
            })()}
          </Badge>

          {project.type && (
            <Badge
              color={project.type}
              variant="subtle"
              size="sm"
              shape="rounded"
              icon={(() => {
                switch(project.type) {
                  case 'tool': return '🔨';
                  case 'app': return '📱';
                  case 'website': return '🌐';
                  case 'api': return '🔌';
                  case 'library': return '📚';
                  default: return '📦';
                }
              })()}
            >
              {(() => {
                switch(project.type) {
                  case 'tool': return 'Outil';
                  case 'app': return 'Application';
                  case 'website': return 'Site Web';
                  case 'api': return 'API';
                  case 'library': return 'Librairie';
                  default: return project.type;
                }
              })()}
            </Badge>
          )}

          {project.subcategory && (
            <Badge
              color="muted"
              variant="outline"
              size="sm"
            >
              {project.subcategory}
            </Badge>
          )}
        </div>

        <ProjectBadges project={project} showAll={false} />
      </CardContent>
    </DraggableCard>
  );
};

export default DraggableProjectCard;