// src/stores/useProjectsStore.js - Store Projects/Business (Usage quotidien/données métier)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProjectsStore = create(
  persist(
    (set, get) => ({
      // Projet actuel sélectionné
      selectedProject: 'irimstudiohall',

      // Base de données des projets
      projects: {
        irimstudiohall: {
          id: "irimstudiohall",
          name: "IRIMStudioHall",
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

          // Atelier - 4 panneaux centraux (données structurées - legacy)
          roadmap: [
            {
              id: 1,
              milestone: 'Phase 1 - Atelier habité',
              status: 'en_cours',
              description: 'Migration Zustand + 4 panneaux métier',
              priority: 'high',
              created_at: new Date().toISOString()
            }
          ],

          todo: [
            {
              id: 1,
              task: 'Migration Zustand',
              priority: 'high',
              status: 'in_progress',
              category: 'architecture',
              created_at: new Date().toISOString()
            },
            {
              id: 2,
              task: 'Créer panneaux Atelier',
              priority: 'high',
              status: 'pending',
              category: 'feature',
              created_at: new Date().toISOString()
            }
          ],

          idees: [
            {
              id: 1,
              idea: 'Auto-référencement projet dans ses propres données',
              status: 'implemented',
              category: 'meta',
              created_at: new Date().toISOString()
            },
            {
              id: 2,
              idea: 'Navigation spatiale entre projets',
              status: 'future',
              category: 'ux',
              created_at: new Date().toISOString()
            }
          ],

          prochaineAction: {
            action: "Finaliser architecture 2 stores",
            priority: "immediate",
            context: "Atelier",
            updated_at: new Date().toISOString()
          },

          // Métadonnées projet
          links: {
            repo: "github.com/eric/irimstudiohall",
            local: "localhost:5173"
          },

          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
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
          ...projectData
        };

        set((state) => ({
          projects: {
            ...state.projects,
            [newProject.id]: newProject
          }
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
            created_at: new Date().toISOString()
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                roadmap: [...project.roadmap, newItem],
                updated_at: new Date().toISOString()
              }
            }
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
            status: 'pending',
            ...task,
            created_at: new Date().toISOString()
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                todo: [...project.todo, newTodo],
                updated_at: new Date().toISOString()
              }
            }
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
                todo: project.todo.map(item =>
                  item.id === todoId
                    ? { ...item, status, updated_at: new Date().toISOString() }
                    : item
                ),
                updated_at: new Date().toISOString()
              }
            }
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
            status: 'new',
            ...idea,
            created_at: new Date().toISOString()
          };

          return {
            projects: {
              ...state.projects,
              [projectId]: {
                ...project,
                idees: [...project.idees, newIdea],
                updated_at: new Date().toISOString()
              }
            }
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
                  updated_at: new Date().toISOString()
                },
                updated_at: new Date().toISOString()
              }
            }
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
                updated_at: new Date().toISOString()
              }
            }
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
                updated_at: new Date().toISOString()
              }
            }
          };
        });
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
          completedTodos: project.todo.filter(t => t.status === 'completed').length,
          totalIdeas: project.idees.length,
          roadmapItems: project.roadmap.length,
          hasNextAction: !!project.prochaineAction
        };
      }
    }),
    {
      name: 'irim-projects-store', // localStorage key séparé
      version: 1
    }
  )
);

export default useProjectsStore;