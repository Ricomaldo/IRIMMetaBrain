/**
 * Données par défaut pour le premier lancement
 * Données de démo riches pour IRIMMetaBrain auto-référencé
 */

export const defaultNotesData = {
  roomNotes: {
    sanctuaire: `# 🕊️ Sanctuaire - Espace de méditation

## Vision
Centre spirituel du projet, lieu de recul et de contemplation sur l'architecture globale.

## Notes
- Architecture 4x3 validée
- Métaphore médiévale/fantasy comme fil conducteur
- Chaque pièce = un aspect du workflow dev`,

    chambre: `# 🛏️ Chambre - Espace personnel

## État d'esprit
Lieu de repos et de réflexion personnelle. Journal intime du développeur.

## Mood actuel
Focus intense sur l'architecture des stores 🎯`,

    cuisine: `# 🍳 Cuisine - Préparation des idées

## Recettes en cours
- Mix Zustand + Persist
- Sauce Redux trop lourde, abandonée
- Marinade localStorage en cours

## Ingrédients
- React 18
- Vite
- Styled-components`,

    comptoir: `# 🍺 Comptoir - Discussions et échanges

## Conversations
- Discussion avec Claude sur l'architecture
- Feedback utilisateurs à intégrer
- Idées de la communauté`,

    jardin: `# 🌿 Jardin - Croissance des idées

## Plantations
- Graine : Système de capture d'état
- Pousse : Component Catalog
- Fleur : Navigation spatiale

## À arroser
- Tests unitaires
- Documentation`,

    atelier: `# 🔨 Atelier - Centre de production

## Workspace principal
C'est ici que tout se construit ! Les panneaux Roadmap et Todo sont synchronisés avec le store Projects.

## Outils disponibles
- Éditeur Markdown intégré
- Roadmap visuelle
- Todo avec priorités
- Export/Import Gist

## Session actuelle
Focus sur l'harmonisation des stores et le système de capture`,

    forge: `# ⚒️ Forge - Hardcoding intensif

## Fonderie de composants
- NavigationArrows ✅
- MarkdownEditor ✅
- RoomCanvas ✅
- ModalManager ✅

## En cours de forge
- SystemOverview component
- ComponentCatalog
- Capture system with Puppeteer`,

    boutique: `# 🏪 Boutique - Présentation et démo

## Vitrine
Espace pour présenter les features terminées et les démos interactives.

## Catalogue
- Dark theme médiéval
- Navigation immersive
- Panneaux éditables
- Persistance complète`,

    scriptorium: `# 📜 Scriptorium - Documentation

## Manuscrits
- Architecture.md
- ComponentGuide.md
- StorePattern.md

## À documenter
- Système de navigation
- Pattern des stores
- Workflow de capture`,

    bibliotheque: `# 📚 Bibliothèque - Références et ressources

## Livres consultés
- React Patterns
- Zustand Deep Dive
- Medieval UI Design (inspiration)

## Références
- [Zustand Docs](https://zustand.docs.pmnd.rs/)
- [Styled Components](https://styled-components.com/)
- [Vite Guide](https://vitejs.dev/)`,

    cave: `# 🕯️ Cave - Secrets et debug

## Zones sombres
- Performance de rendu dans RoomCanvas
- Memory leak potentiel dans les listeners
- Race condition sur le localStorage

## Outils de debug
- React DevTools ✅
- Zustand DevTools ✅
- Console logs stratégiques`
  },

  sideTowerNotes: {
    general: `# 🏰 Tour de contrôle

## Vue d'ensemble
IRIMMetaBrain progresse bien ! L'architecture 4x3 rooms fonctionne parfaitement.

## Métriques
- 12 rooms complètes
- 2 stores Zustand
- 100% persistance
- Navigation fluide

## Prochaines étapes
1. Finaliser la capture d'état
2. Implémenter ComponentCatalog
3. Ajouter SystemOverview
4. Tests et optimisations`
  }
};

// Les données projects restent telles quelles car elles sont déjà riches
export const defaultProjectsData = {
  selectedProject: 'irimstudiohall',
  projects: {
    irimstudiohall: {
      id: "irimstudiohall",
      name: "IRIMStudioHall",
      type: "tool",
      status: "dev_actif",
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

      atelierModules: {
        roadmap: { collapsed: false },
        todo: { collapsed: false },
        mindlog: {
          collapsed: true,
          mood: "🔥",
          note: "Architecture stores harmonisée !"
        },
        actions: {
          collapsed: true,
          items: [
            { id: 1, text: "Implémenter isFirstRun", completed: true },
            { id: 2, text: "Harmoniser les stores", completed: false },
            { id: 3, text: "Finaliser capture", completed: false }
          ]
        },
        screentv: { collapsed: true, screenshots: [] }
      }
    }
  }
};