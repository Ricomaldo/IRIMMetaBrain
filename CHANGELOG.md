# Changelog - IRIMMetaBrain

## [Unreleased]

### Added - 2025-09-18

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
