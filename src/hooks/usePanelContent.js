// src/hooks/usePanelContent.js - Hook simplifié pour contenu markdown

import { useCallback } from 'react';
import { useProjectData } from '../stores/useProjectDataStore';
import { debounce } from '../utils/debounce';

// Debounced functions centralisées
const debouncedUpdateRoadmap = debounce((content, updateFn) => {
  updateFn(content);
}, 1000);

const debouncedUpdateTodo = debounce((content, updateFn) => {
  updateFn(content);
}, 1000);

export const usePanelContent = (projectId) => {
  const projectData = useProjectData(projectId);
  const {
    roadmapMarkdown,
    todoMarkdown,
    updateRoadmapMarkdown,
    updateTodoMarkdown
  } = projectData || {};

  // Contenu direct du store (plus d'état local)
  const roadmapContent = roadmapMarkdown || `# Roadmap

## Phase 1 - Setup
- [ ] Initialiser le projet
- [ ] Configurer l'architecture

---

> *Commencez votre roadmap ici* 🚀`;

  const todoContent = todoMarkdown || `# Todo

## 🔴 **Priorité Haute**
- [ ] Première tâche importante

## 🟡 **Priorité Moyenne**
- [ ] Tâche de priorité moyenne

---

**Next:** Définir les prochaines étapes`;

  // Handlers avec debounce
  const updateRoadmapContent = useCallback((content) => {
    if (projectId && updateRoadmapMarkdown) {
      debouncedUpdateRoadmap(content, updateRoadmapMarkdown);
    }
  }, [projectId, updateRoadmapMarkdown]);

  const updateTodoContent = useCallback((content) => {
    if (projectId && updateTodoMarkdown) {
      debouncedUpdateTodo(content, updateTodoMarkdown);
    }
  }, [projectId, updateTodoMarkdown]);

  return {
    roadmapContent,
    todoContent,
    updateRoadmapContent,
    updateTodoContent
  };
};