// src/components/modals/ProjectOverviewModal/ProjectOverviewModal.jsx

import React, { useState, useMemo } from 'react';
import Modal from '../../common/Modal/Modal';
import useProjectMetaStore from '../../../stores/useProjectMetaStore';
import ProjectForm from './ProjectForm';
import ProjectBadges from './ProjectBadges';
import DraggableProjectCard from './DraggableProjectCard';
import { useProjectData } from '../../../stores/useProjectDataStore';
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
import {
  OverviewContainer,
  CategorySection,
  CategoryHeader,
  CategoryTitle,
  CollapseIcon,
  CategoryContent,
  ProjectGrid,
  ProjectCard,
  ProjectName,
  ProjectStatus,
  ProjectCategory,
  CheckboxWrapper,
  StatsBar,
  FloatingButtons,
  ActionButton,
  NewProjectForm
} from './ProjectOverviewModal.styles';

/**
 * Modal for managing projects overview and visibility
 * @renders Modal
 * @renders OverviewContainer
 * @renders CategorySection
 * @renders ProjectGrid
 * @renders ProjectCard
 */
const ProjectOverviewModal = ({ isOpen, onClose }) => {
  const {
    projects,
    categories,
    visibleProjects,
    toggleProjectVisibility,
    selectProject,
    updateProjectCategory,
    createProject,
    updateProjectMeta,
    deleteProject,
    reorderProjects,
    getProjectsSortedByOrder
  } = useProjectMetaStore();

  const [showNewProjectForm, setShowNewProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [collapsedCategories, setCollapsedCategories] = useState({});
  const [activeId, setActiveId] = useState(null);

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

  // Définir les catégories pour chaque projet connu (fallback si pas défini)
  const projectCategoriesMap = {
    irimmetabrain: { category: "perso", subcategory: "speculatif" },
    moodcycle: { category: "perso", subcategory: "apprentissage" },
    pepetteszub: { category: "perso", subcategory: "demo" },
    echodesreves: { category: "formation", subcategory: "exercice" }
  };

  // Récupérer les projets triés par ordre
  const sortedProjects = useMemo(() => {
    return getProjectsSortedByOrder();
  }, [projects, getProjectsSortedByOrder]);

  // Grouper les projets par catégorie avec fallback
  const projectsByCategory = sortedProjects.reduce((acc, project) => {
    // Utiliser la catégorie du projet ou le fallback défini ci-dessus
    const category = project.category || projectCategoriesMap[project.id]?.category || 'uncategorized';
    const projectWithCategory = {
      ...project,
      category,
      subcategory: project.subcategory || projectCategoriesMap[project.id]?.subcategory
    };

    if (!acc[category]) acc[category] = [];
    acc[category].push(projectWithCategory);
    return acc;
  }, {});


  const handleProjectClick = (projectId) => {
    selectProject(projectId);
    toggleProjectVisibility(projectId);
  };

  const handleApply = () => {
    // Sélectionner le premier projet visible s'il y en a
    if (visibleProjects.length > 0) {
      const currentSelected = useProjectMetaStore.getState().selectedProject;
      if (!visibleProjects.includes(currentSelected)) {
        selectProject(visibleProjects[0]);
      }
    }
    onClose();
  };

  const toggleCategory = (categoryId) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  const handleCreateProject = (projectData) => {
    const projectId = createProject(projectData);
    setShowNewProjectForm(false);
  };

  const handleUpdateProject = (projectData) => {
    updateProjectMeta(projectData.id, projectData);
    setEditingProject(null);
  };

  const handleDeleteProject = (projectId) => {
    deleteProject(projectId);
    setEditingProject(null);
  };

  const handleEditClick = (project, e) => {
    e.stopPropagation();
    setEditingProject(project);
    setShowNewProjectForm(false);
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="📊 Vue d'ensemble des projets"
      size="fullscreen"
      variant="roomCanvas"
    >
      <OverviewContainer>
        {(showNewProjectForm || editingProject) ? (
          <ProjectForm
            project={editingProject}
            categories={categories}
            onSave={editingProject ? handleUpdateProject : handleCreateProject}
            onDelete={handleDeleteProject}
            onCancel={() => {
              setShowNewProjectForm(false);
              setEditingProject(null);
            }}
          />
        ) : (
          <>
            <StatsBar>
          <span>Total : {Object.keys(projects).length} projets</span>
          <span>Visibles : {visibleProjects.length}</span>
          <span>Catégories : {Object.keys(categories).length}</span>
        </StatsBar>

        {/* Section pour les projets non catégorisés */}
        {projectsByCategory.uncategorized && (
          <CategorySection>
            <CategoryHeader onClick={() => toggleCategory('uncategorized')}>
              <CollapseIcon $collapsed={collapsedCategories['uncategorized']}>▼</CollapseIcon>
              <CategoryTitle>📁 Non catégorisé</CategoryTitle>
              <span style={{ opacity: 0.6, fontSize: '14px' }}>
                ({projectsByCategory.uncategorized?.length || 0})
              </span>
            </CategoryHeader>
            <CategoryContent $collapsed={collapsedCategories['uncategorized']}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={projectsByCategory.uncategorized.map(p => p.id)}
                  strategy={rectSortingStrategy}
                >
                  <ProjectGrid>
                    {projectsByCategory.uncategorized.map(project => (
                      <DraggableProjectCard
                        key={project.id}
                        project={project}
                        isSelected={visibleProjects.includes(project.id)}
                        visibleProjects={visibleProjects}
                        onToggleVisibility={() => toggleProjectVisibility(project.id)}
                        onClick={() => handleProjectClick(project.id)}
                        onDoubleClick={(e) => handleEditClick(project, e)}
                      />
                    ))}
                  </ProjectGrid>
                  <DragOverlay>
                    {activeId ? (
                      <ProjectCard $selected>
                        <ProjectName>
                          {projects[activeId]?.name}
                        </ProjectName>
                      </ProjectCard>
                    ) : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            </CategoryContent>
          </CategorySection>
        )}

        {/* Sections par catégorie */}
        {Object.entries(categories).map(([catId, category]) => (
          <CategorySection key={catId}>
            <CategoryHeader onClick={() => toggleCategory(catId)}>
              <CollapseIcon $collapsed={collapsedCategories[catId]}>▼</CollapseIcon>
              <CategoryTitle>{category.label}</CategoryTitle>
              <span style={{ opacity: 0.6, fontSize: '14px' }}>
                ({projectsByCategory[catId]?.length || 0})
              </span>
            </CategoryHeader>
            <CategoryContent $collapsed={collapsedCategories[catId]}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={projectsByCategory[catId]?.map(p => p.id) || []}
                  strategy={rectSortingStrategy}
                >
                  <ProjectGrid>
                    {projectsByCategory[catId] && projectsByCategory[catId].length > 0 ? (
                  projectsByCategory[catId].map(project => (
                      <DraggableProjectCard
                        key={project.id}
                        project={project}
                        isSelected={visibleProjects.includes(project.id)}
                        visibleProjects={visibleProjects}
                        onToggleVisibility={() => toggleProjectVisibility(project.id)}
                        onClick={() => handleProjectClick(project.id)}
                        onDoubleClick={(e) => handleEditClick(project, e)}
                      />
                ))
              ) : (
                <div style={{
                  padding: '20px',
                  textAlign: 'center',
                  opacity: 0.5
                }}>
                  Aucun projet dans cette catégorie
                </div>
                  )}
                  </ProjectGrid>
                  <DragOverlay>
                    {activeId ? (
                      <ProjectCard $selected>
                        <ProjectName>
                          {projects[activeId]?.name}
                        </ProjectName>
                      </ProjectCard>
                    ) : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            </CategoryContent>
          </CategorySection>
        ))}

            <FloatingButtons>
          <ActionButton $variant="success" onClick={() => setShowNewProjectForm(!showNewProjectForm)}>
            + Nouveau Projet
          </ActionButton>

          <ActionButton onClick={handleApply}>
            Appliquer la sélection
          </ActionButton>
            </FloatingButtons>
          </>
        )}
      </OverviewContainer>
    </Modal>
  );
};

export default ProjectOverviewModal;