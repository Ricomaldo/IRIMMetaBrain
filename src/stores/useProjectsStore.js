// src/stores/useProjectsStore.js - Store Projects/Business (Usage quotidien/données métier)

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultProjectsData } from "./defaultData";

// Vérifier si c'est la première utilisation (même flag que NotesStore)
const isFirstRun = () => {
  const initialized = localStorage.getItem("irim-initialized");
  return !initialized;
};

// Récupérer les données initiales
const getInitialProjectsData = () => {
  if (isFirstRun()) {
    // Première utilisation : données de démo riches
    return defaultProjectsData;
  }
  // Utilisations suivantes : structure minimale (les vraies données viendront du localStorage)
  return {
    selectedProject: "irimmetabrain",
    projects: {},
  };
};

const initialData = getInitialProjectsData();

const useProjectsStore = create(
  persist(
    (set, get) => ({
      // Projet actuel sélectionné
      selectedProject: initialData.selectedProject,

      // Base de données des projets
      projects: initialData.projects || {
        irimmetabrain: {
          id: "irimmetabrain",
          name: "IRIMMetaBrain",
          type: "tool",
          status: "dev_actif",

          // Contenu markdown des panneaux
          roadmapMarkdown: `# Roadmap

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

          todoMarkdown: `# Todo Atelier

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

**Next:** Finaliser l'interface Atelier 🚀`,

          // État des modules Atelier
          atelierModules: {
            roadmap: { collapsed: true },
            todo: { collapsed: true },
            mindlog: { collapsed: true, mood: "😐", note: "" },
            actions: {
              collapsed: true,
              items: [
                { id: 1, text: "Action prioritaire", completed: false },
                { id: 2, text: "Tâche en cours", completed: false },
                { id: 3, text: "À démarrer", completed: false },
              ],
            },
            screentv: { collapsed: true, screenshots: [] },
          },

          // Atelier - 4 panneaux centraux (données structurées - legacy)
          roadmap: [
            {
              id: 1,
              milestone: "Phase 1 - Atelier habité",
              status: "en_cours",
              description: "Migration Zustand + 4 panneaux métier",
              priority: "high",
              created_at: new Date().toISOString(),
            },
          ],

          todo: [
            {
              id: 1,
              task: "Migration Zustand",
              priority: "high",
              status: "in_progress",
              category: "architecture",
              created_at: new Date().toISOString(),
            },
            {
              id: 2,
              task: "Créer panneaux Atelier",
              priority: "high",
              status: "pending",
              category: "feature",
              created_at: new Date().toISOString(),
            },
          ],

          idees: [
            {
              id: 1,
              idea: "Auto-référencement projet dans ses propres données",
              status: "implemented",
              category: "meta",
              created_at: new Date().toISOString(),
            },
            {
              id: 2,
              idea: "Navigation spatiale entre projets",
              status: "future",
              category: "ux",
              created_at: new Date().toISOString(),
            },
          ],

          prochaineAction: {
            action: "Finaliser architecture 2 stores",
            priority: "immediate",
            context: "Atelier",
            updated_at: new Date().toISOString(),
          },

          // Métadonnées projet
          links: {
            repo: "github.com/eric/irimmetabrain",
            local: "localhost:5173",
          },

          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },

        moodcycle: {
          id: "moodcycle",
          name: "MoodCycle",
          type: "wellness",
          status: "dev_actif",
          roadmapMarkdown: `# MoodCycle - Cycle des Humeurs

## Phase 1 - Tracking
- [ ] Suivi quotidien des émotions
- [ ] Graphiques de tendances
- [ ] Notifications rappels

## Phase 2 - Analyse
- [ ] Patterns recognition
- [ ] Conseils personnalisés
- [ ] Export données wellness`,
          todoMarkdown: `# Todo MoodCycle

## 🔴 **Priorité Haute**
- [ ] Interface de saisie rapide
- [ ] Base de données émotions
- [ ] Système de notifications

## 🟡 **Priorité Moyenne**
- [ ] Analytics et graphiques
- [ ] Export CSV/JSON`,
          atelierModules: {
            roadmap: { collapsed: true },
            todo: { collapsed: true },
            mindlog: {
              collapsed: true,
              mood: "🌈",
              note: "Projet bien-être et suivi humeurs",
            },
            actions: {
              collapsed: true,
              items: [
                { id: 1, text: "Design mood picker", completed: false },
                { id: 2, text: "Créer DB schema", completed: false },
                { id: 3, text: "Interface analytics", completed: false },
              ],
            },
            screentv: { collapsed: true, screenshots: [] },
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },

        pepetteszub: {
          id: "pepetteszub",
          name: "PepettesZub",
          type: "finance",
          status: "concept",
          roadmapMarkdown: `# PepettesZub - Gestionnaire Finance

## Phase 1 - Base
- [ ] Comptes et catégories
- [ ] Transactions import
- [ ] Budgets mensuels

## Phase 2 - Smart
- [ ] Prédictions IA
- [ ] Alertes automatiques
- [ ] Optimisations conseils`,
          todoMarkdown: `# Todo PepettesZub

## 🔴 **Priorité Haute**
- [ ] Architecture compte/transaction
- [ ] Import bank statements
- [ ] Dashboard principal

## 🟡 **Priorité Moyenne**
- [ ] Mobile app companion
- [ ] Notifications push`,
          atelierModules: {
            roadmap: { collapsed: true },
            todo: { collapsed: true },
            mindlog: {
              collapsed: true,
              mood: "💰",
              note: "Focus économies et investissements",
            },
            actions: {
              collapsed: true,
              items: [
                { id: 1, text: "Setup base données", completed: false },
                { id: 2, text: "Interface transactions", completed: false },
                { id: 3, text: "Algorithme budgets", completed: false },
              ],
            },
            screentv: { collapsed: true, screenshots: [] },
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },

        echodesreves: {
          id: "echodesreves",
          name: "EchoDesReves",
          type: "creative",
          status: "vision",
          roadmapMarkdown: `# EchoDesReves - Journal Créatif

## Phase 1 - Capture
- [ ] Journal de rêves
- [ ] Tags et catégories
- [ ] Recherche full-text

## Phase 2 - Analyse
- [ ] Patterns récurrents
- [ ] Visualisations créatives
- [ ] Export artistique`,
          todoMarkdown: `# Todo EchoDesReves

## 🔴 **Priorité Haute**
- [ ] Interface journal simple
- [ ] Système de tags
- [ ] Recherche rapide

## 🟡 **Priorité Moyenne**
- [ ] Templates entries
- [ ] Backup automatique`,
          atelierModules: {
            roadmap: { collapsed: true },
            todo: { collapsed: true },
            mindlog: {
              collapsed: true,
              mood: "✨",
              note: "Inspiration et créativité nocturne",
            },
            actions: {
              collapsed: true,
              items: [
                { id: 1, text: "Design journal interface", completed: false },
                { id: 2, text: "Système tags", completed: false },
                { id: 3, text: "Moteur recherche", completed: false },
              ],
            },
            screentv: { collapsed: true, screenshots: [] },
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },

      // Actions - Gestion des projets
      createProject: (projectData) => {
        const newProject = {
          id: projectData.id || Date.now().toString(),
          roadmap: [],
          todo: [],
          idees: [],
          prochaineAction: null,
          // Contenu markdown par défaut
          roadmapMarkdown: `# Roadmap

## Phase 1 - Setup
- [ ] Initialiser le projet
- [ ] Configurer l'architecture

---

> *Commencez votre roadmap ici* 🚀`,
          todoMarkdown: `# Todo

## 🔴 **Priorité Haute**
- [ ] Première tâche importante

## 🟡 **Priorité Moyenne**
- [ ] Tâche de priorité moyenne

---

**Next:** Définir les prochaines étapes`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...projectData,
        };

        set((state) => ({
          projects: {
            ...state.projects,
            [newProject.id]: newProject,
          },
        }));

        return newProject.id;
      },

      selectProject: (projectId) => {
        set({ selectedProject: projectId });
      },

      // Actions - Roadmap
      addRoadmapItem: (projectId, milestone) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          const newItem = {
            id: Date.now(),
            ...milestone,
            created_at: new Date().toISOString(),
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                roadmap: [...project.roadmap, newItem],
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Actions - Todo
      addTodoItem: (projectId, task) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          const newTodo = {
            id: Date.now(),
            status: "pending",
            ...task,
            created_at: new Date().toISOString(),
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                todo: [...project.todo, newTodo],
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      updateTodoStatus: (projectId, todoId, status) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                todo: project.todo.map((item) =>
                  item.id === todoId
                    ? { ...item, status, updated_at: new Date().toISOString() }
                    : item
                ),
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Actions - Idées
      addIdea: (projectId, idea) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          const newIdea = {
            id: Date.now(),
            status: "new",
            ...idea,
            created_at: new Date().toISOString(),
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                idees: [...project.idees, newIdea],
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Actions - Prochaine Action
      updateNextAction: (projectId, action) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                prochaineAction: {
                  ...action,
                  updated_at: new Date().toISOString(),
                },
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Actions - Contenu Markdown des panneaux
      updateRoadmapMarkdown: (projectId, content) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                roadmapMarkdown: content,
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      updateTodoMarkdown: (projectId, content) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) return state;

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                todoMarkdown: content,
                updated_at: new Date().toISOString(),
              },
            },
          };
        });
      },

      // Actions - Modules Atelier
      updateModuleState: (projectId, moduleName, stateUpdate) => {
        set((state) => {
          const project = state.projects[projectId];
          if (!project) {
            return state;
          }

          const newState = {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                atelierModules: {
                  ...(project.atelierModules || {}),
                  [moduleName]: {
                    ...(project.atelierModules?.[moduleName] || {}),
                    ...stateUpdate,
                  },
                },
                updated_at: new Date().toISOString(),
              },
            },
          };
          return newState;
        });
      },

      getModuleState: (projectId, moduleName) => {
        const project = get().projects[projectId];
        if (!project?.atelierModules?.[moduleName]) {
          // Créer le module s'il n'existe pas
          const defaultModules = {
            roadmap: { collapsed: true },
            todo: { collapsed: true },
            mindlog: { collapsed: true, mood: "😐", note: "" },
            actions: { collapsed: true, items: [] },
            screentv: { collapsed: true, screenshots: [] },
          };
          return defaultModules[moduleName] || { collapsed: true };
        }
        return project.atelierModules[moduleName];
      },

      // Helpers
      getCurrentProject: () => {
        const state = get();
        return state.projects[state.selectedProject] || null;
      },

      getProjectStats: (projectId) => {
        const project = get().projects[projectId];
        if (!project) return null;

        return {
          totalTodos: project.todo.length,
          completedTodos: project.todo.filter((t) => t.status === "completed")
            .length,
          totalIdeas: project.idees.length,
          roadmapItems: project.roadmap.length,
          hasNextAction: !!project.prochaineAction,
        };
      },

      // Import complet pour synchronisation (remplace tout)
      importData: (data) => {
        set({
          projects: data.projects || {},
          selectedProject: data.currentProjectId || "irimmetabrain",
        });
      },
    }),
    {
      name: "irim-projects-store", // localStorage key séparé
      version: 1,
    }
  )
);

export default useProjectsStore;
