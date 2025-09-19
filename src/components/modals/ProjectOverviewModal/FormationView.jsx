// src/components/modals/ProjectOverviewModal/FormationView.jsx

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
  DragOverlay
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from '@dnd-kit/sortable';
import { ProjectCard, ProjectName } from './ProjectOverviewModal.styles';

const ViewContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const SortControls = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  align-items: center;
`;

const SortLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

const SortButton = styled.button`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : 'transparent'
  };
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.text
  };
  border: 1px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : alpha(theme.colors.border, 0.3)
  };
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : alpha(theme.colors.primary, 0.1)
    };
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ComplexitySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => alpha(theme.colors.primary, 0.05)};
  border-left: 4px solid ${({ theme, $level }) => {
    switch($level) {
      case 1: return theme.colors.success;
      case 2: return theme.colors.warning;
      case 3: return theme.colors.danger;
      default: return theme.colors.primary;
    }
  }};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  }
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionCount = styled.span`
  padding: 2px 8px;
  background: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  color: ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: 600;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  display: ${({ $collapsed }) => $collapsed ? 'none' : 'grid'};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  opacity: 0.6;
`;

const FormationView = ({
  projects,
  visibleProjects,
  toggleProjectVisibility,
  selectProject,
  onEditProject,
  reorderProjects
}) => {
  const [sortBy, setSortBy] = useState('complexity'); // 'complexity' or 'date'
  const [collapsedSections, setCollapsedSections] = useState({});
  const [activeId, setActiveId] = useState(null);
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

  // Grouper les projets par complexité
  const projectsByComplexity = {
    beginner: projects.filter(p => {
      // Logique pour déterminer la complexité (basée sur subcategory ou autre critère)
      return p.subcategory === 'exercice' || p.projectNature === 'demo';
    }),
    intermediate: projects.filter(p => {
      return p.subcategory === 'cours' || p.projectNature === 'apprentissage';
    }),
    advanced: projects.filter(p => {
      return p.subcategory === 'certification' || (!p.subcategory && !p.projectNature);
    })
  };

  // Trier les projets selon le critère sélectionné
  const sortProjects = (projectList) => {
    if (sortBy === 'date') {
      return [...projectList].sort((a, b) =>
        new Date(b.created_at) - new Date(a.created_at)
      );
    }
    // Par défaut, garder l'ordre existant (complexité)
    return projectList;
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      reorderProjects(active.id, over.id);
    }

    setActiveId(null);
  };

  const handleProjectClick = (projectId) => {
    const project = projects.find(p => p.id === projectId);
    setSelectedProject(project);
  };

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const renderSection = (level, title, icon, projects) => {
    const sectionId = `level-${level}`;
    const isCollapsed = collapsedSections[sectionId];
    const sortedProjects = sortProjects(projects);

    return (
      <ComplexitySection key={sectionId}>
        <SectionHeader
          $level={level}
          onClick={() => toggleSection(sectionId)}
        >
          <SectionTitle>
            <span>{icon}</span>
            {title}
            <span style={{ fontSize: '12px', opacity: 0.7 }}>
              {isCollapsed ? '▶' : '▼'}
            </span>
          </SectionTitle>
          <SectionCount>{projects.length}</SectionCount>
        </SectionHeader>

        <ProjectsGrid $collapsed={isCollapsed}>
          {sortedProjects.length > 0 ? (
            <SortableContext
              items={sortedProjects.map(p => p.id)}
              strategy={rectSortingStrategy}
            >
              {sortedProjects.map(project => (
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
          ) : (
            <EmptyState>Aucun projet dans cette catégorie</EmptyState>
          )}
        </ProjectsGrid>
      </ComplexitySection>
    );
  };

  return (
    <>
      <ViewContainer>
      <SortControls>
        <SortLabel>Trier par :</SortLabel>
        <SortButton
          $active={sortBy === 'complexity'}
          onClick={() => setSortBy('complexity')}
        >
          Complexité
        </SortButton>
        <SortButton
          $active={sortBy === 'date'}
          onClick={() => setSortBy('date')}
        >
          Date
        </SortButton>
      </SortControls>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {renderSection(1, 'Débutant', '⭐', projectsByComplexity.beginner)}
        {renderSection(2, 'Intermédiaire', '⭐⭐', projectsByComplexity.intermediate)}
        {renderSection(3, 'Avancé', '⭐⭐⭐', projectsByComplexity.advanced)}

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
      </ViewContainer>

      <ProjectDetailsModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </>
  );
};

export default FormationView;