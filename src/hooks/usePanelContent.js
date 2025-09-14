// src/hooks/usePanelContent.js - Hook pour gérer le contenu markdown des panneaux

import { useState, useCallback, useRef, useEffect } from 'react';
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
  
  // Refs pour éviter les boucles infinies
  const isUpdatingFromStoreRef = useRef(false);

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

  // État local pour éviter les re-rendus pendant la frappe
  const [localRoadmapContent, setLocalRoadmapContent] = useState(
    project?.roadmapMarkdown || defaultRoadmapContent
  );
  const [localTodoContent, setLocalTodoContent] = useState(
    project?.todoMarkdown || defaultTodoContent
  );

  // Synchroniser l'état local avec le store (uniquement au chargement initial)
  useEffect(() => {
    if (!isUpdatingFromStoreRef.current && project) {
      setLocalRoadmapContent(project.roadmapMarkdown || defaultRoadmapContent);
      setLocalTodoContent(project.todoMarkdown || defaultTodoContent);
    }
  }, [project, defaultRoadmapContent, defaultTodoContent]); // Seulement quand le projet change

  // Debounced save functions qui mettent à jour le store
  const updateRoadmapContent = useCallback((content) => {
    // Mettre à jour l'état local immédiatement (pas de re-rendu du store)
    setLocalRoadmapContent(content);
    
    // Annuler le timeout précédent
    if (roadmapTimeoutRef.current) {
      clearTimeout(roadmapTimeoutRef.current);
    }
    
    // Sauvegarder dans le store après un délai
    roadmapTimeoutRef.current = setTimeout(() => {
      if (projectId) {
        isUpdatingFromStoreRef.current = true;
        updateRoadmapMarkdown(projectId, content);
        // Reset le flag après un court délai
        setTimeout(() => {
          isUpdatingFromStoreRef.current = false;
        }, 100);
      }
    }, 1000); // Délai plus long pour éviter les sauvegardes excessives
  }, [projectId, updateRoadmapMarkdown]);

  const updateTodoContent = useCallback((content) => {
    // Mettre à jour l'état local immédiatement
    setLocalTodoContent(content);
    
    // Annuler le timeout précédent
    if (todoTimeoutRef.current) {
      clearTimeout(todoTimeoutRef.current);
    }
    
    // Sauvegarder dans le store après un délai
    todoTimeoutRef.current = setTimeout(() => {
      if (projectId) {
        isUpdatingFromStoreRef.current = true;
        updateTodoMarkdown(projectId, content);
        // Reset le flag après un court délai
        setTimeout(() => {
          isUpdatingFromStoreRef.current = false;
        }, 100);
      }
    }, 1000);
  }, [projectId, updateTodoMarkdown]);

  // Cleanup des timeouts
  useEffect(() => {
    return () => {
      if (roadmapTimeoutRef.current) {
        clearTimeout(roadmapTimeoutRef.current);
      }
      if (todoTimeoutRef.current) {
        clearTimeout(todoTimeoutRef.current);
      }
    };
  }, []);

  return {
    roadmapContent: localRoadmapContent,
    todoContent: localTodoContent,
    updateRoadmapContent,
    updateTodoContent
  };
};