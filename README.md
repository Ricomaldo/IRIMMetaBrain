# 🧠 IRIMMetaBrain

## Vue d'ensemble

IRIMMetaBrain est une application de gestion de projets et de connaissances avec une interface immersive basée sur une métaphore spatiale médiévale. L'application combine productivité et gamification pour créer une expérience unique de travail.

## 🎯 Fonctionnalités principales

### 🏰 Architecture Spatiale
- **RoomCanvas** : Zone de travail principale avec navigation entre "salles" thématiques
- **SideTower** : Tour latérale multi-étages pour outils et informations contextuelles
- **Navigation médiévale** : Flèches dorées et transitions fluides entre espaces

### 📊 Gestion de Projets Kanban
- **Système à 3 colonnes** : EN TÊTE (prioritaire), ACTIF, PAUSE
- **Catégories** : Professionnel, Personnel, Formation
- **Drag & Drop** : Réorganisation intuitive des projets
- **ProjectCarousel** : Navigation rapide entre projets visibles
- **Inbox/Réserve** : Zone pour projets non classés

### 🎨 Design System
- **Composants réutilisables** : Button, Modal, Badge, Card, etc.
- **Thème médiéval cohérent** : Couleurs chaudes, textures bois/pierre
- **Badges colorimétriques** : Status visuels avec icônes
- **Typography scalable** : Système typographique harmonieux

### 💾 Architecture de Données
- **Multi-stores Zustand** : Séparation métadonnées/données
- **Synchronisation Cloud** : Export/Import via GitHub Gist
- **Migration automatique** : Compatibilité versions antérieures
- **Cache optimisé** : Lazy loading des données projet

## 🚀 Installation

```bash
# Cloner le repository
git clone https://github.com/yourusername/IRIMMetaBrain.git
cd IRIMMetaBrain

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Structure du Projet

```
src/
├── components/
│   ├── common/          # Composants réutilisables (Button, Badge, Modal)
│   ├── layout/          # Structure principale (RoomCanvas, SideTower)
│   ├── navigation/      # Navigation (Arrows, ProjectCarousel)
│   ├── modals/          # Modales spécialisées
│   └── dev/             # Outils développement (ComponentCatalog)
├── stores/
│   ├── useProjectMetaStore.js  # Métadonnées projets
│   └── useProjectDataStore.js  # Données détaillées
├── styles/
│   ├── theme.js         # Configuration thème
│   └── GlobalStyles.js  # Styles globaux
└── utils/
    └── ProjectSyncAdapter.js  # Synchronisation cloud
```

## 🎮 Utilisation

### Navigation Principale
- **Flèches dorées** : Naviguer entre les salles
- **Shift + ←/→** : Navigation rapide clavier
- **Double-clic projet** : Édition rapide

### Gestion des Projets
1. Ouvrir la modale avec l'icône 📊
2. Naviguer entre les onglets Pro/Perso/Formation
3. Glisser-déposer les cartes entre colonnes
4. Cliquer sur une carte pour voir les détails
5. Double-cliquer pour éditer

### Raccourcis Clavier
- `Shift + ←/→` : Changer de salle
- `Ctrl/Cmd + S` : Synchroniser
- `Escape` : Fermer modales

## 🛠️ Technologies

- **React 18** : Framework UI
- **Vite** : Build tool ultra-rapide
- **Zustand** : State management
- **Styled-Components** : CSS-in-JS
- **@dnd-kit** : Drag and drop moderne
- **React-Markdown** : Rendu Markdown
- **Prism** : Coloration syntaxique

## 📚 Documentation

- [Architecture des Stores](docs/stores-architecture.md)
- [Guide de Synchronisation](docs/sync-system.md)
- [ADR-005 : Architecture Kanban](docs/decisions/ADR-005-architecture-kanban-projets.md)
- [Changelog](CHANGELOG.md)

## 🧪 Tests & Debug

```bash
# Lancer les tests (si configurés)
npm test

# Mode debug dans la console
window.stores.debug()

# Réinitialiser les données
window.stores.reset()
```

## 🎨 Personnalisation

Le thème peut être modifié dans `src/styles/theme.js` :
- Couleurs principales et accents
- Espacements et dimensions
- Typographie et polices
- Gradients et effets visuels

## 🤝 Contribution

Les contributions sont bienvenues ! Merci de :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

MIT License - voir [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Design inspiré par les interfaces de jeux RPG médiévaux
- Icônes et emojis pour l'accessibilité visuelle
- Communauté React et Vite pour les outils excellents

---

**IRIMMetaBrain** - *Transform your workspace into a medieval productivity fortress* 🏰