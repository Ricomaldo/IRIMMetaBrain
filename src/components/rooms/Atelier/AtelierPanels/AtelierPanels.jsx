// src/components/rooms/Atelier/AtelierPanels/AtelierPanels.jsx

import React, { useState } from 'react';
import {
  PanelsContainer,
  Panel,
  PanelHeader,
  PanelTitle,
  PanelBadge,
  PanelContent,
  ItemList,
  Item,
  ItemContent,
  ItemText,
  ItemMeta,
  ItemStatus,
  AddButton,
  NextActionPanel,
  NextActionContent,
  ActionText,
  ActionMeta,
  CloseButton
} from './AtelierPanels.styles';
import useProjectsStore from '../../../../stores/useProjectsStore';

const AtelierPanels = ({ onClose }) => {
  const {
    getCurrentProject,
    updateTodoStatus,
    addTodoItem,
    addRoadmapItem,
    addIdea,
    updateNextAction
  } = useProjectsStore();

  const [newItems, setNewItems] = useState({
    roadmap: '',
    todo: '',
    idea: ''
  });

  const project = getCurrentProject();
  if (!project) return null;

  const handleAddItem = (type) => {
    const content = newItems[type].trim();
    if (!content) return;

    const projectId = project.id;

    switch (type) {
      case 'roadmap':
        addRoadmapItem(projectId, {
          milestone: content,
          status: 'planned',
          priority: 'medium'
        });
        break;
      case 'todo':
        addTodoItem(projectId, {
          task: content,
          priority: 'medium',
          category: 'general'
        });
        break;
      case 'idea':
        addIdea(projectId, {
          idea: content,
          category: 'general'
        });
        break;
    }

    setNewItems({ ...newItems, [type]: '' });
  };

  const handleStatusToggle = (todoId, currentStatus) => {
    const newStatus = currentStatus === 'completed' ? 'pending' : 'completed';
    updateTodoStatus(project.id, todoId, newStatus);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  return (
    <PanelsContainer onClick={(e) => e.stopPropagation()}>
      <CloseButton onClick={onClose}>✕</CloseButton>

      {/* Panel Roadmap */}
      <Panel>
        <PanelHeader>
          <PanelTitle>
            🗺️ Roadmap
            <PanelBadge>{project.roadmap?.length || 0}</PanelBadge>
          </PanelTitle>
        </PanelHeader>
        <PanelContent>
          <ItemList>
            {project.roadmap?.map((item) => (
              <Item key={item.id}>
                <ItemContent>
                  <ItemText bold>{item.milestone}</ItemText>
                  <ItemMeta>
                    {item.description} • {formatDate(item.created_at)}
                  </ItemMeta>
                </ItemContent>
                <ItemStatus className={item.status}>{item.status}</ItemStatus>
              </Item>
            ))}
          </ItemList>
          <AddButton
            onClick={() => {
              const milestone = prompt('Nouveau milestone :');
              if (milestone) {
                addRoadmapItem(project.id, {
                  milestone,
                  status: 'planned',
                  priority: 'medium'
                });
              }
            }}
          >
            + Ajouter milestone
          </AddButton>
        </PanelContent>
      </Panel>

      {/* Panel Todo */}
      <Panel>
        <PanelHeader>
          <PanelTitle>
            ✅ Todo
            <PanelBadge>
              {project.todo?.filter(t => t.status !== 'completed').length || 0}
            </PanelBadge>
          </PanelTitle>
        </PanelHeader>
        <PanelContent>
          <ItemList>
            {project.todo?.map((item) => (
              <Item
                key={item.id}
                onClick={() => handleStatusToggle(item.id, item.status)}
                style={{ cursor: 'pointer' }}
              >
                <ItemContent>
                  <ItemText
                    style={{
                      textDecoration: item.status === 'completed' ? 'line-through' : 'none',
                      opacity: item.status === 'completed' ? 0.6 : 1
                    }}
                  >
                    {item.task}
                  </ItemText>
                  <ItemMeta>
                    {item.category} • {formatDate(item.created_at)}
                  </ItemMeta>
                </ItemContent>
                <ItemStatus className={item.priority}>{item.priority}</ItemStatus>
              </Item>
            ))}
          </ItemList>
          <AddButton
            onClick={() => {
              const task = prompt('Nouvelle tâche :');
              if (task) {
                addTodoItem(project.id, {
                  task,
                  priority: 'medium',
                  category: 'general'
                });
              }
            }}
          >
            + Ajouter tâche
          </AddButton>
        </PanelContent>
      </Panel>

      {/* Panel Idées */}
      <Panel>
        <PanelHeader>
          <PanelTitle>
            💡 Idées
            <PanelBadge>{project.idees?.length || 0}</PanelBadge>
          </PanelTitle>
        </PanelHeader>
        <PanelContent>
          <ItemList>
            {project.idees?.map((item) => (
              <Item key={item.id}>
                <ItemContent>
                  <ItemText>{item.idea}</ItemText>
                  <ItemMeta>
                    {item.category} • {formatDate(item.created_at)}
                  </ItemMeta>
                </ItemContent>
                <ItemStatus className={item.status}>{item.status}</ItemStatus>
              </Item>
            ))}
          </ItemList>
          <AddButton
            onClick={() => {
              const idea = prompt('Nouvelle idée :');
              if (idea) {
                addIdea(project.id, {
                  idea,
                  category: 'general'
                });
              }
            }}
          >
            + Ajouter idée
          </AddButton>
        </PanelContent>
      </Panel>

      {/* Panel Prochaine Action */}
      <NextActionPanel>
        <PanelHeader>
          <PanelTitle>⚡ Prochaine Action</PanelTitle>
        </PanelHeader>
        <PanelContent>
          {project.prochaineAction ? (
            <NextActionContent>
              <ActionText>{project.prochaineAction.action}</ActionText>
              <ActionMeta>
                {project.prochaineAction.context}<br />
                Priority: {project.prochaineAction.priority}<br />
                {formatDate(project.prochaineAction.updated_at)}
              </ActionMeta>
            </NextActionContent>
          ) : (
            <AddButton
              onClick={() => {
                const action = prompt('Prochaine action :');
                if (action) {
                  updateNextAction(project.id, {
                    action,
                    priority: 'immediate',
                    context: 'Atelier'
                  });
                }
              }}
            >
              + Définir prochaine action
            </AddButton>
          )}
        </PanelContent>
      </NextActionPanel>
    </PanelsContainer>
  );
};

export default AtelierPanels;