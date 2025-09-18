---
type: architecture
updated: 2025-09-18
---

# Architecture Stores - IRIM StudioLab

## Vue d'ensemble

**2 stores Zustand indépendants** avec responsabilités distinctes et clés localStorage séparées.

### Séparation des responsabilités

```
useNotesStore     → Infrastructure/Méta-développement
useProjectsStore  → Business/Données métier quotidiennes
```

---

## Store: useNotesStore

**Fichier:** `stores/useNotesStore.js`  
**Clé localStorage:** `irim-notes-store`  
**Version:** 1

### Responsabilité
Notes transversales par pièce (infrastructure de l'app elle-même)

### État
```js
{
  // Notes par pièce (architecture 4x3 complète)
  roomNotes: {
    // Ligne 0
    sanctuaire: string,
    chambre: string,
    cuisine: string,
    comptoir: string,
    // Ligne 1
    jardin: string,
    atelier: string,
    forge: string,
    boutique: string,
    // Ligne 2
    scriptorium: string,
    bibliotheque: string,
    cave: string
  },
  
  // Notes tour latérale
  sideTowerNotes: {
    general: string
  }
}
```

### Actions principales
```js
updateRoomNote(roomType, content)     // Mettre à jour note pièce
updateSideTowerNote(content)          // Mettre à jour note tour
getRoomNote(roomType)                 // Récupérer note pièce
getSideTowerNote()                    // Récupérer note tour
clearAllNotes()                       // Reset complet
exportNotes() / importNotes(data)     // Migration
```

### Debounce intégré
```js
debouncedUpdateRoomNote(roomType, content, 500ms)
debouncedUpdateSideTowerNote(content, 500ms)
```

### Migration
- **Version 0→1** : Extension 4 pièces → 11 pièces
- Préservation données existantes

---

## Store: useProjectsStore

**Fichier:** `stores/useProjectsStore.js`  
**Clé localStorage:** `irim-projects-store`  
**Version:** 1

### Responsabilité
Données métier des projets (usage quotidien)

### État principal
```js
{
  selectedProject: string,              // ID projet actuel
  projects: {
    [projectId]: {
      // Méta-données
      id: string,
      name: string,
      type: string,                     // 'tool'|'wellness'|'finance'|'creative'
      status: string,                   // 'dev_actif'|'concept'|'vision'
      
      // Contenu Markdown (utilisé activement)
      roadmapMarkdown: string,
      todoMarkdown: string,
      
      // État modules Atelier
      atelierModules: {
        roadmap: { collapsed: boolean },
        todo: { collapsed: boolean },
        mindlog: { collapsed: boolean, mood: string, note: string },
        actions: { collapsed: boolean, items: array },
        screentv: { collapsed: boolean, screenshots: array }
      },
      
      // Legacy : Données structurées (déprécié)
      roadmap: array,                   // ⚠️ À migrer vers roadmapMarkdown
      todo: array,                      // ⚠️ À migrer vers todoMarkdown
      idees: array,                     // ⚠️ Peu utilisé
      prochaineAction: object,          // ⚠️ Peu utilisé
      
      // Méta
      created_at: string,
      updated_at: string
    }
  }
}
```

### Actions de gestion projets
```js
createProject(projectData)             // Créer nouveau projet
selectProject(projectId)               // Changer projet actuel
getCurrentProject()                    // Récupérer projet actuel
getProjectStats(projectId)             // Statistiques projet
```

### Actions contenu Markdown
```js
updateRoadmapMarkdown(projectId, content)
updateTodoMarkdown(projectId, content)
```

### Actions modules Atelier
```js
updateModuleState(projectId, moduleName, stateUpdate)
getModuleState(projectId, moduleName)
```

### Actions legacy (déprécié)
```js
addRoadmapItem()                       // ⚠️ Utiliser roadmapMarkdown
addTodoItem()                          // ⚠️ Utiliser todoMarkdown
updateTodoStatus()                     // ⚠️ Utiliser todoMarkdown
addIdea()                              // ⚠️ Peu utilisé
updateNextAction()                     // ⚠️ Peu utilisé
```

---

## Hook: usePanelContent

Voir spécification complète dans [specs/components-and-hooks.md](../specs/components-and-hooks.md)

---

## Connexions entre stores

### Séparation stricte
```
useNotesStore    ←→ NO CROSS-TALK ←→  useProjectsStore
```

### Usage par composant
```js
// Notes infrastructure (RoomNote, SideTowerNotes)
useNotesStore → updateRoomNote(roomType, content)

// Projets business (AtelierRoom, usePanelContent)  
useProjectsStore → updateRoadmapMarkdown(projectId, content)
```

### Patterns d'usage
```js
// Pattern Notes (par pièce)
const note = getRoomNote('atelier');
updateRoomNote('atelier', newContent);

// Pattern Projets (par projet + module)
const project = getCurrentProject();
updateRoadmapMarkdown(project.id, newContent);
updateModuleState(project.id, 'roadmap', { collapsed: true });
```

---

## Migration technique recommandée

### ⚠️ Nettoyage legacy data

**Données obsolètes à supprimer :**
```js
// Dans useProjectsStore
roadmap: array,              // → roadmapMarkdown: string
todo: array,                 // → todoMarkdown: string  
idees: array,                // → Non utilisé
prochaineAction: object,     // → Non utilisé
```

**Actions obsolètes à supprimer :**
- `addRoadmapItem()`, `addTodoItem()`, `updateTodoStatus()`
- `addIdea()`, `updateNextAction()`

### ✅ Architecture finale cible
```js
projects: {
  [projectId]: {
    // Core
    id, name, type, status,
    
    // Contenu actuel (gardé)
    roadmapMarkdown: string,
    todoMarkdown: string,
    
    // États UI (gardé)  
    atelierModules: object,
    
    // Méta (gardé)
    created_at, updated_at
  }
}
```

---

## Performance et bonnes pratiques

### Debounce patterns
- **Notes courtes** : 500ms (`useNotesStore`)
- **Contenu long** : 1000ms (`usePanelContent`)

### Persistence
- **Automatique** : Zustand persist middleware
- **Clés séparées** : Évite conflicts lors migrations

### État local vs Store
- **❌ Éviter** : État local dupliqué (sync complexe)
- **✅ Préférer** : Lecture directe store + debounce write

### Extensibilité
- **useNotesStore** : Ajout pièces → Modifier `roomNotes` object
- **useProjectsStore** : Nouveaux projets → Utiliser `createProject()`
- **Nouveaux modules** : Étendre `atelierModules` structure

---

## Métriques et diagnostics

### Taille stores (localStorage)
```js
// useNotesStore : ~2-5KB (notes texte)
// useProjectsStore : ~15-50KB (projets + markdown)
```

### Performance hooks
- `usePanelContent` : O(1) - lecture directe
- `useNotesStore` : O(1) - accès par clé
- Re-renders minimaux grâce à Zustand selectors

### Debugging
```js
// Console inspection
useNotesStore.getState()
useProjectsStore.getState()

// Export pour backup
const notesBackup = useNotesStore.getState().exportNotes()
```

---

## Conclusion

**Architecture validée** pour production avec séparation responsabilités claire.

**Actions immédiates :**
1. ✅ Hook `usePanelContent` optimisé
2. ⚠️ Migration legacy data recommandée (non-breaking)
3. 📚 Documentation créée

**Stabilité :** Prêt pour développement continu sans refactoring majeur.
