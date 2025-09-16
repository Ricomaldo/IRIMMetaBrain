// src/hooks/usePanelContent.js - Hook simplifié pour contenu markdown

import { useCallback } from 'react';
import useProjectsStore from '../stores/useProjectsStore';
import { debounce } from '../utils/debounce';

// Debounced functions centralisées
const debouncedUpdateRoadmap = debounce((projectId, content, updateFn) => {
  updateFn(projectId, content);
}, 1000);

const debouncedUpdateTodo = debounce((projectId, content, updateFn) => {
  updateFn(projectId, content);
}, 1000);

export const usePanelContent = (projectId) => {
  const { 
    getCurrentProject, 
    updateRoadmapMarkdown, 
    updateTodoMarkdown 
  } = useProjectsStore();

  const project = getCurrentProject();

  // Contenu direct du store (plus d'état local)
  const roadmapContent = project?.roadmapMarkdown || `# Roadmap

## Phase 1 - Setup
- [ ] Initialiser le projet
- [ ] Configurer l'architecture

---

> *Commencez votre roadmap ici* 🚀`;

  const todoContent = project?.todoMarkdown || `# Todo

## 🔴 **Priorité Haute**
- [ ] Première tâche importante

## 🟡 **Priorité Moyenne**
- [ ] Tâche de priorité moyenne

---

**Next:** Définir les prochaines étapes`;

  // Handlers avec debounce
  const updateRoadmapContent = useCallback((content) => {
    if (projectId) {
      debouncedUpdateRoadmap(projectId, content, updateRoadmapMarkdown);
    }
  }, [projectId, updateRoadmapMarkdown]);

  const updateTodoContent = useCallback((content) => {
    if (projectId) {
      debouncedUpdateTodo(projectId, content, updateTodoMarkdown);
    }
  }, [projectId, updateTodoMarkdown]);

  return {
    roadmapContent,
    todoContent,
    updateRoadmapContent,
    updateTodoContent
  };
};