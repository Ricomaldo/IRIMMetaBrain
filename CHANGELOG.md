# Changelog - IRIMMetaBrain

## [Unreleased]

### Added - 2025-09-19 (J6 - Architecture Multi-Stores v2 & Robustesse)

- **Architecture Multi-Stores v2** : Refonte complète de la gestion des données
  - Séparation métadonnées (`useProjectMetaStore`) / données (`useProjectDataStore`)
  - Stores dynamiques par projet avec lazy loading
  - Migration automatique et transparente v1 → v2
  - Backup automatique avant migration
  - Cache des instances pour performance optimale

- **Système d'Initialisation Robuste** :
  - Détection automatique localStorage vide → charge 4 projets démo
  - `defaultProjectsData.js` avec contenu riche (roadmaps, todos, modules)
  - Gestion des stores corrompus avec réinitialisation automatique
  - Loading state pendant l'initialisation dans App.jsx
  - Fallback intelligent sur données démo si problème

- **Synchronisation Cloud Améliorée** :
  - `ProjectSyncAdapter` compatible avec architecture multi-stores
  - Format v2.0 avec détection automatique de version
  - Compatibilité descendante (import v1 → migration → v2)
  - Export/Import chiffré AES-256 vers GitHub Gist
  - SyncModal mise à jour pour nouvelle architecture

- **Documentation Complète et Pédagogique** :
  - `data-flow-guide.md` : Guide utilisateur simple avec scénarios concrets
  - `sync-system.md` v2 : Documentation technique mise à jour
  - `CHANGELOG-stores.md` : Historique détaillé de l'évolution
  - Consolidation docs (suppression stores-architecture.md obsolète)
  - Commandes debug et test documentées

- **UI/UX ProjectOverviewModal** :
  - `DraggableProjectCard` : Cards réorganisables par drag & drop
  - `ProjectBadges` : Badges visuels pour statuts et catégories
  - `ProjectForm` : Formulaire création/édition avec champs enrichis
  - Support de propriétés enrichies (technologies, dates, client, etc.)

- **Outils de Test et Debug** :
  - `test-scenarios.js` : Script de validation complète
  - `window.stores` : Accès simplifié pour console
  - `exposeStores.js` amélioré avec alias pratiques
  - Commandes de réinitialisation et migration

### Added - 2025-09-19 (Session Gestion Projets & ProjectCarousel)

- **Système de Gestion de Projets Complet** : Infrastructure pour gérer multiples projets
  - ProjectOverviewModal : Interface fullscreen pour visualiser tous les projets
  - Projets organisés par catégories (Professionnel, Personnel, Formation)
  - Système de visibilité pour sélectionner les projets actifs
  - Bouton "📊 Projets" ajouté dans ControlTower
  - Cards blanches avec ombres pour meilleure lisibilité
  - Bouton "+ Nouveau Projet" (base posée pour création future)

- **ProjectCarousel dans Atelier** : Navigation entre projets visibles
  - Navigation circulaire infinie (retour au début après le dernier)
  - Style cohérent avec metalBg + secondaryLevel
  - Bordure text.light pour visibilité
  - Largeur 25% centrée horizontalement
  - Triangles (◀ ▶) pour navigation
  - Titre centré verticalement (après debug approfondi)
  - Déplacé dans `room-modules/atelier/` pour organisation

- **Store Enrichi** : Extensions useProjectsStore
  - `visibleProjects`: Liste des projets affichés dans le carousel
  - `categories`: Structure pour organiser les projets
  - `toggleProjectVisibility()`: Afficher/masquer des projets
  - `selectNextProject()` et `selectPreviousProject()`: Navigation
  - Fallback pour charger les projets même après premier run
  - 4 projets de démo avec catégories assignées

- **Fixes Techniques** :
  - Correction du chargement des projets vides après premier run
  - Alignement vertical du ProjectCarousel (refait de zéro)
  - Migration des styles inline vers styled-components

### Added - 2025-09-18 (Session SystemOverview & Architecture)

- **SystemOverview dans la Forge** : Nouveau bouton 🌳 TREE pour visualiser l'architecture
  - Intégration dans Panel fullscreen avec texture metal et bordure bleue
  - Harmonisation complète avec le thème bleu de ComponentCatalog
  - Suppression de la texture pierre au profit du gradient uiKitBlue
  - Palette de bleus ajoutée au theme (blues: 100-500)
  - Toutes les couleurs référencent maintenant le theme
  - Hauteur réduite à 450px pour visibilité de la légende

- **Laboratoire UI Refactoring** : Interface simplifiée et optimisée
  - Nouveaux sélecteurs Width/Height séparés (10 boutons au lieu de 26)
  - Bouton toggle pour afficher/masquer le panel
  - Titre "🧪 Rendu" restauré grâce à l'interface compacte
  - Fix alignement NoPanelContent (grid-row: 1/6)
  - Fix débordement scrollbar avec wrapper dédié
  - Simplification de ControlHeader

- **Système @renders complet** : 41 composants annotés
  - Tous les composants principaux ont maintenant des annotations JSDoc
  - Parser script amélioré pour extraction complète
  - Architecture-map.json reflète toute la hiérarchie
  - Suppression de la limite de profondeur dans l'arbre

### Added - 2025-09-18 (Session précédente)

- **Layout Chambre Implémenté** : Structure complète avec panels placeholder
  - Grille 4x4 avec 6 zones distinctes
  - Timer Zone (2x2) : Gestion du temps, texture bois
  - Totem (1x1) : Élément spirituel, texture pierre
  - MindLog (2x1) : État mental, texture cuir
  - Mantras (2x1) : Méditation, texture tissu
  - Notes (2x1) : Fonctionnel avec MarkdownEditor
  - Navigation (2x1) : Accès rapide, texture métal
  - Textures variées pour différenciation visuelle
- **Laboratoire (UndefinedRoom) Amélioré** : Ajout boutons dimensions manquantes
  - Toutes les dimensions 1×1 à 5×5 disponibles (26 configurations)
  - Grid responsive avec auto-fit
  - Boutons compacts avec largeur réduite
- **Forge Simplifiée** : Reset et ajout toolbar
  - ForgeToolbar avec mixins secondaryLevel + metalBg
  - 4 boutons placeholder pour futures fonctionnalités
  - Structure minimale prête pour expansion
- **SystemOverview Refactoring** : Réécriture complète basée sur annotations JSDoc
  - Nouveau système d'annotations `@renders` dans les composants
  - Script `parse-component-tree.js` pour extraire l'architecture
  - Génération automatique de `architecture-map.json`
  - SystemOverview lit maintenant le JSON au lieu d'un arbre hardcodé
  - ADR-004 documentant la convention @renders
  - Script npm `doc:tree` pour générer l'arbre de composants

### Added - 2025-09-18 (précédent)

- **Paramètre Pièce de Démarrage** : Choix de la room initiale au lancement
  - Nouveau store `useSettingsStore` avec persistance localStorage
  - Modal Settings accessible via bouton ⚙️ dans ControlTower
  - Dropdown pour sélectionner parmi les 12 pièces disponibles
  - Application du paramètre au prochain refresh de l'app
- **Système Auto-Documentation** : Workflow capture → promote → index
  - `doc-capture.js` : Capture instantanée de pensées dans devlog avec timestamps
  - `doc-promote.js` : Migration et nettoyage devlog → docs structurés
  - `doc-index.js` : Génération automatique de l'index README.md
- **Fix Navigation Clavier** : Désactivation des flèches pendant l'édition markdown
- **Renommage Projet** : IRIMStudioHall → IRIMMetaBrain
- **ComponentCatalog** : Outil de test et documentation des composants
  - Auto-découverte des composants
  - Prévisualisation interactive avec props éditables
  - Génération de code d'utilisation
  - Intégré dans le Laboratoire (ex-UndefinedRoom)
  - Sidebar collapsible avec catégories dépliables
  - Détection automatique des types de props (dropdowns pour enums, checkbox pour booléens)
  - Common ouvert et Button sélectionné par défaut
- **Restructuration Architecture Composants** :
  - Nouveau dossier `widgets/` pour composants réutilisables (MindLog, ActionList, ImageCarousel)
  - Nouveau dossier `room-modules/` pour composants spécifiques aux rooms
  - RoomNote déplacé dans `dev/` (meta-système)
  - Renommage : UndefinedRoom → LaboratoireRoom
- **PropTypes** : Ajout de définitions PropTypes aux composants clés
  - ActionList, ImageCarousel, Panel, Button, IconButton, Modal, MarkdownEditor
  - Amélioration de la documentation automatique dans ComponentCatalog
- **Panel Amélioré** :
  - Nouvelle prop `borderType` avec options : 'default', 'blue', 'craft'
  - Utilisation des mixins `blueBorder` et `craftBorderHeavy`
  - Border blue appliqué au ComponentCatalog dans la Forge
- **Forge Integration** :
  - ComponentCatalog accessible via bouton "🔨 PROPS" dans la toolbar
  - Panel fullscreen avec texture metal et border blue
  - Fix du chevauchement grid/toolbar avec max-height approprié

### Added - Précédent

- Design System harmonization
- Centralized Modal System with React Portals
- Advanced Navigation with Golden Arrows
- AsyncStorage Sync Manager with GitHub Gist backend

### Changed

- Replaced hardcoded values with theme-based styling
- Centralized actions in `buttonMapping.js`

### Improved

- Performance optimizations
- UX enhancements in navigation and modal interactions
