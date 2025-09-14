// src/hooks/usePanelContent.js - Hook pour gérer le contenu markdown des panneaux

import { useState, useCallback, useRef } from 'react';
import { debounce } from '../utils/debounce';

export const usePanelContent = (projectId) => {
  const storageKey = `irim-panel-content-${projectId}`;

  const initialStructure = {
    roadmap: `# Roadmap

## Phase 1 - Atelier habité ✓
- [x] Migration **Zustand** + stores
- [x] Panneaux éditables avec **markdown**
- [x] Design system avec accents froids

## Phase 2 - Expansion
- [ ] Autres pièces (Forge, Boutique, Chambre)
- [ ] **Navigation** entre projets
- [ ] Import/Export projets

## Phase 3 - Pro Features
- [ ] **Sync cloud** optionnelle
- [ ] **Templates** de projets
- [ ] **Analytics** et métriques

---

> *"Medieval workspace meets modern productivity"* 🏰`,
    todo: `# Todo Atelier

## 🔴 **Priorité Haute**
- [x] Architecture **Zustand** (2 stores)
- [x] **MarkdownEditor** avec GitHub Flavored
- [ ] **Performance** et optimisations
- [ ] **Tests** unitaires composants

## 🟡 **Priorité Moyenne**
- [ ] **Documentation** technique
- [ ] **Accessibilité** (WCAG)
- [ ] **Mobile** responsive design

## 🔵 **Backlog**
- [ ] **Animations** transitions
- [ ] **Shortcuts** clavier
- [ ] **Themes** multiples

---

### Progression
| Feature | Status | Notes |
|---------|--------|-------|
| Store Notes | ✓ Done | Zustand + persist |
| Store Projects | ✓ Done | Auto-référencement |
| UI Atelier | 🚧 WIP | Panneaux markdown |

**Next:** Finaliser l'interface Atelier 🚀`
  };

  const loadNotesFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialStructure;
    } catch (error) {
      console.warn(`Erreur de chargement des notes (${storageKey}):`, error);
      return initialStructure;
    }
  }, [storageKey]);

  const saveNotesToStorage = useCallback((notes) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (error) {
      console.warn(`Erreur de sauvegarde des notes (${storageKey}):`, error);
    }
  }, [storageKey]);

  const [notes, setNotes] = useState(loadNotesFromStorage);
  const notesRef = useRef(notes);

  notesRef.current = notes;

  const debouncedSave = useCallback(
    debounce((newNotes) => {
      saveNotesToStorage(newNotes);
    }, 500),
    [saveNotesToStorage]
  );

  const updateNote = useCallback((key, content) => {
    const newNotes = { ...notesRef.current, [key]: content };
    setNotes(newNotes);
    debouncedSave(newNotes);
  }, [debouncedSave]);

  return {
    roadmapContent: notes.roadmap || initialStructure.roadmap,
    todoContent: notes.todo || initialStructure.todo,

    updateRoadmapContent: (content) => updateNote('roadmap', content),
    updateTodoContent: (content) => updateNote('todo', content)
  };
};