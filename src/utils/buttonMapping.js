// src/utils/buttonMapping.js

// Store centralisé pour les handlers de modales
let modalHandlers = {};

// Fonction pour enregistrer les handlers
export const registerModalHandler = (id, handler) => {
  modalHandlers[id] = handler;
};

// Fonction pour déclencher une modale
export const openModal = (modalId) => {
  if (modalHandlers[modalId]) {
    modalHandlers[modalId]();
  } else {
    console.warn(`Modal handler not found for: ${modalId}`);
  }
};

// ---- ControlTower: ligne du haut (calendrier + infos + timer) + ligne du bas (actions rapides) ----
export const controlButtons = [
  { id: 'calendar', type: 'action', icon: '📅', label: 'Calendrier', action: () => {} },
  { id: 'stars', type: 'stat', icon: '⭐', label: 'Étoiles', value: '11/100' },
  { id: 'xp', type: 'stat', icon: '🔮', label: 'XP', value: 29 },
  { id: 'timer', type: 'action', icon: '⏱️', label: 'Timer', action: () => {} },
];

export const quickActions = [
  { id: 'projects', icon: '📊', label: 'Projets', onClick: () => openModal('projects') },
  { id: 'inventory', icon: '🎒', label: 'Inventaire', onClick: () => {} },
  { id: 'book', icon: '📖', label: 'Grimoire', onClick: () => {} },
  { id: 'help', icon: '❓', label: 'Aide', onClick: () => {} },
  { id: 'map', icon: '🗺️', label: 'Carte', onClick: () => {} },
  { id: 'camera', icon: '📷', label: 'Capture d\'état', onClick: () => openModal('capture-confirm') },
  { id: 'sync', icon: '🔄', label: 'Synchronisation', onClick: () => openModal('sync') },
  { id: 'config', icon: '⚙️', label: 'Paramètres', onClick: () => openModal('settings') },
];

// Deprecated - keeping for compatibility
export const workbenchButtons = [
  { id: 'github', icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com') },
  { id: 'vscode', icon: '💻', label: 'VS Code', action: () => {} },
  { id: 'arc', icon: '🌐', label: 'Arc', action: () => {} },
  { id: 'cursor', icon: '🎯', label: 'Cursor', action: () => {} }
];

// ---- WorkbenchDrawer: onglets, items, footer ----
export const drawerTabs = [
  { id: 'ingredients', icon: '🌿', label: 'Ingrédients' },
  { id: 'potions', icon: '🧪', label: 'Potions' },
  { id: 'recipes', icon: '📜', label: 'Recettes' },
  { id: 'tools', icon: '🔧', label: 'Outils' },
];

export const drawerItemsByTab = {
  ingredients: [
    { id: 'ing-1', icon: '🍃', label: 'Feuille' },
    { id: 'ing-2', icon: '🍄', label: 'Champignon' },
    { id: 'ing-3', icon: '🌰', label: 'Gland' },
    { id: 'ing-4', icon: '🌾', label: 'Herbe' },
  ],
  potions: [
    { id: 'potion-heal', icon: '💚', label: 'Soin', action: () => openModal('potion-heal') },
    { id: 'potion-sleep', icon: '💤', label: 'Sommeil', action: () => openModal('potion-sleep') },
    { id: 'potion-strength', icon: '💪', label: 'Force', action: () => openModal('potion-strength') },
  ],
  recipes: [
    { id: 'rec-1', icon: '📜', label: 'Élixir de vigueur' },
    { id: 'rec-2', icon: '📜', label: 'Tonique de focus' },
  ],
  tools: [
    { id: 'tool-1', icon: '🔧', label: 'Alambic' },
    { id: 'tool-2', icon: '⚗️', label: 'Creuset' },
  ],
};

export const drawerFooterActions = [
  { id: 'upgrade', label: 'Acheter une amélioration basique de machine alchimique' },
  { id: 'buy-salt', label: 'Acheter la recette du sel du néant' },
  { id: 'craft-salt', label: 'Créer : Sel du néant' },
];
