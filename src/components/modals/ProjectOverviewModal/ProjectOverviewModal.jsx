// src/components/modals/ProjectOverviewModal/ProjectOverviewModal.jsx

import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import useProjectsStore from '../../../stores/useProjectsStore';
import {
  OverviewContainer,
  CategorySection,
  CategoryTitle,
  ProjectGrid,
  ProjectCard,
  ProjectName,
  ProjectStatus,
  ProjectCategory,
  CheckboxWrapper,
  StatsBar,
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
    createProject
  } = useProjectsStore();

  const [showNewProjectForm, setShowNewProjectForm] = useState(false);

  // Définir les catégories pour chaque projet connu (fallback si pas défini)
  const projectCategoriesMap = {
    irimmetabrain: { category: "perso", subcategory: "speculatif" },
    moodcycle: { category: "perso", subcategory: "apprentissage" },
    pepetteszub: { category: "perso", subcategory: "demo" },
    echodesreves: { category: "formation", subcategory: "exercice" }
  };

  // Grouper les projets par catégorie avec fallback
  const projectsByCategory = Object.values(projects).reduce((acc, project) => {
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
    if (visibleProjects.length > 0 && !visibleProjects.includes(selectProject)) {
      selectProject(visibleProjects[0]);
    }
    onClose();
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
        <StatsBar>
          <span>Total : {Object.keys(projects).length} projets</span>
          <span>Visibles : {visibleProjects.length}</span>
          <span>Catégories : {Object.keys(categories).length}</span>
        </StatsBar>

        {/* Section pour les projets non catégorisés */}
        {projectsByCategory.uncategorized && (
          <CategorySection>
            <CategoryTitle>📁 Non catégorisé</CategoryTitle>
            <ProjectGrid>
              {projectsByCategory.uncategorized.map(project => (
                <ProjectCard
                  key={project.id}
                  $selected={visibleProjects.includes(project.id)}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={visibleProjects.includes(project.id)}
                      onChange={() => toggleProjectVisibility(project.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </CheckboxWrapper>
                  <ProjectName>{project.name}</ProjectName>
                  <ProjectStatus $status={project.status}>
                    {project.status || 'actif'}
                  </ProjectStatus>
                </ProjectCard>
              ))}
            </ProjectGrid>
          </CategorySection>
        )}

        {/* Sections par catégorie */}
        {Object.entries(categories).map(([catId, category]) => (
          <CategorySection key={catId}>
            <CategoryTitle>{category.label}</CategoryTitle>
            <ProjectGrid>
              {projectsByCategory[catId] && projectsByCategory[catId].length > 0 ? (
                projectsByCategory[catId].map(project => (
                <ProjectCard
                  key={project.id}
                  $selected={visibleProjects.includes(project.id)}
                  onClick={() => handleProjectClick(project.id)}
                >
                  <CheckboxWrapper>
                    <input
                      type="checkbox"
                      checked={visibleProjects.includes(project.id)}
                      onChange={() => toggleProjectVisibility(project.id)}
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
                </ProjectCard>
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
          </CategorySection>
        ))}

        <ActionButton $secondary onClick={() => setShowNewProjectForm(!showNewProjectForm)}>
          + Nouveau Projet
        </ActionButton>

        <ActionButton onClick={handleApply}>
          Appliquer la sélection
        </ActionButton>
      </OverviewContainer>
    </Modal>
  );
};

export default ProjectOverviewModal;