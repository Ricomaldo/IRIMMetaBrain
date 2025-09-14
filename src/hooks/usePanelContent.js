// src/hooks/usePanelContent.js - Hook pour gérer le contenu markdown des panneaux

import { useCallback, useRef } from 'react';
import useProjectsStore from '../stores/useProjectsStore';

export const usePanelContent = (projectId) => {
  const { 
    getCurrentProject, 
    updateRoadmapMarkdown, 
    updateTodoMarkdown 
  } = useProjectsStore();

  const project = getCurrentProject();
  
  // Refs pour le debounce
  const roadmapTimeoutRef = useRef(null);
  const todoTimeoutRef = useRef(null);

  // Fallback content si le projet n'existe pas
  const defaultRoadmapContent = `# Roadmap

## Phase 1 - Setup
- [ ] Initialiser le projet
- [ ] Configurer l'architecture

---

> *Commencez votre roadmap ici* 🚀`;

  const defaultTodoContent = `# Todo

## 🔴 **Priorité Haute**
- [ ] Première tâche importante

## 🟡 **Priorité Moyenne**
- [ ] Tâche de priorité moyenne

---

**Next:** Définir les prochaines étapes`;

  // Debounced save functions
  const updateRoadmapContent = useCallback((content) => {
    if (roadmapTimeoutRef.current) {
      clearTimeout(roadmapTimeoutRef.current);
    }
    
    roadmapTimeoutRef.current = setTimeout(() => {
      if (projectId) {
        updateRoadmapMarkdown(projectId, content);
      }
    }, 500);
  }, [projectId, updateRoadmapMarkdown]);

  const updateTodoContent = useCallback((content) => {
    if (todoTimeoutRef.current) {
      clearTimeout(todoTimeoutRef.current);
    }
    
    todoTimeoutRef.current = setTimeout(() => {
      if (projectId) {
        updateTodoMarkdown(projectId, content);
      }
    }, 500);
  }, [projectId, updateTodoMarkdown]);

  return {
    roadmapContent: project?.roadmapMarkdown || defaultRoadmapContent,
    todoContent: project?.todoMarkdown || defaultTodoContent,
    updateRoadmapContent,
    updateTodoContent
  };
};