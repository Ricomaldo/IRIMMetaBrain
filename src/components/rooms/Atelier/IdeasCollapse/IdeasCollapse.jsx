// src/components/rooms/Atelier/IdeasCollapse/IdeasCollapse.jsx

import React, { useState } from 'react';
import { styled } from 'styled-components';
import useProjectsStore from '../../../../stores/useProjectsStore';
import { icons } from '../../../../utils/assetMapping';

const CollapseContainer = styled.div`
  width: 100%;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;

const CollapseHeader = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  border-bottom: ${props => props.expanded ? `2px solid ${props.theme.colors.border}` : 'none'};
  user-select: none;
  background: ${props => `${props.theme.colors.accents.cold}1A`}; /* 10% opacity */
  transition: background 0.2s ease;
  color: ${props => props.theme.colors.primary};

  &:hover {
    background: ${props => `${props.theme.colors.accents.cold}33`}; /* 20% opacity */
  }
`;

const CollapseContent = styled.div`
  padding: 8px;
  max-height: 150px;
  overflow-y: auto;
  animation: slideDown 0.3s ease-out;

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IdeaItem = styled.div`
  padding: 4px 6px;
  margin-bottom: 4px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(74, 85, 104, 0.2);
  border-radius: 4px;
  font-size: 10px;
  line-height: 1.3;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: ${props => props.theme.colors.accents.cold};
  }
`;

const IdeaText = styled.div`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: 2px;
`;

const IdeaMeta = styled.div`
  font-size: 8px;
  color: ${props => props.theme.colors.text.secondary};
  opacity: 0.7;
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 1px 4px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: bold;
  margin-left: 4px;

  &.new { background: #f3e5f5; color: #7b1fa2; }
  &.implemented { background: #e8f5e8; color: #388e3c; }
  &.future { background: #e3f2fd; color: #1976d2; }
  &.rejected { background: #ffebee; color: #d32f2f; }
`;

const AddButton = styled.button`
  width: 100%;
  padding: 4px;
  margin-top: 4px;
  border: 1px dashed ${props => props.theme.colors.accents.cold};
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.5);
  color: ${props => props.theme.colors.text.secondary};
  font-size: 9px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    color: ${props => props.theme.colors.text.primary};
  }
`;

const IdeasCollapse = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { getCurrentProject, addIdea } = useProjectsStore();

  const project = getCurrentProject();
  const ideasCount = project?.idees?.length || 0;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleAddIdea = () => {
    const idea = prompt('Nouvelle idée :');
    if (idea && project) {
      addIdea(project.id, {
        idea,
        category: 'atelier'
      });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <CollapseContainer onClick={(e) => e.stopPropagation()}>
      <CollapseHeader onClick={toggleExpanded} expanded={isExpanded ? "true" : undefined}>
        Idées {isExpanded ? icons.collapse : icons.expand}
      </CollapseHeader>

      {isExpanded && (
        <CollapseContent>
          {project?.idees?.map((idea) => (
            <IdeaItem key={idea.id}>
              <IdeaText>
                {idea.idea}
                <StatusBadge className={idea.status}>{idea.status}</StatusBadge>
              </IdeaText>
              <IdeaMeta>
                {idea.category} • {formatDate(idea.created_at)}
              </IdeaMeta>
            </IdeaItem>
          ))}

          <AddButton onClick={handleAddIdea}>
            + Ajouter idée
          </AddButton>
        </CollapseContent>
      )}
    </CollapseContainer>
  );
};

export default IdeasCollapse;