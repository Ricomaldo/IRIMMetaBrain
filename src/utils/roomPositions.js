// src/utils/roomPositions.js

import { roomBackgrounds } from './assetMapping';

export const roomConfig = [
  // Ligne 0: [Sanctuaire] [Chambre] [Cuisine] [Comptoir]
  { x: 0, y: 0, type: 'sanctuaire', name: 'Sanctuaire', background: roomBackgrounds.sanctuaire },
  { x: 1, y: 0, type: 'chambre', name: 'Chambre', background: roomBackgrounds.chambre },
  { x: 2, y: 0, type: 'cuisine', name: 'Cuisine', background: roomBackgrounds.cuisine },
  { x: 3, y: 0, type: 'comptoir', name: 'Comptoir', background: roomBackgrounds.comptoir },

  // Ligne 1: [Jardin] [ATELIER] [Forge] [Boutique]
  { x: 0, y: 1, type: 'jardin', name: 'Jardin', background: roomBackgrounds.jardin },
  { x: 1, y: 1, type: 'atelier', name: 'Atelier', background: roomBackgrounds.atelier },
  { x: 2, y: 1, type: 'forge', name: 'Forge', background: roomBackgrounds.forge },
  { x: 3, y: 1, type: 'boutique', name: 'Boutique', background: roomBackgrounds.boutique },

  // Ligne 2: [Scriptorium] [Bibliothèque] [???] [Cave]
  { x: 0, y: 2, type: 'undefined', name: 'À définir', background: null },
  { x: 1, y: 2, type: 'bibliotheque', name: 'Bibliothèque', background: roomBackgrounds.bibliotheque },
  { x: 2, y: 2, type: 'scriptorium', name: 'Scriptorium', background: roomBackgrounds.scriptorium },
  { x: 3, y: 2, type: 'cave', name: 'Cave', background: roomBackgrounds.cave }
];

export const getAdjacentRooms = (currentPos) => {
  return {
    up: currentPos.y > 0 ? { x: currentPos.x, y: currentPos.y - 1 } : null,
    down: currentPos.y < 2 ? { x: currentPos.x, y: currentPos.y + 1 } : null,
    left: currentPos.x > 0 ? { x: currentPos.x - 1, y: currentPos.y } : null,
    right: currentPos.x < 3 ? { x: currentPos.x + 1, y: currentPos.y } : null
  };
};

export const isValidPosition = (pos) => {
  return pos && pos.x >= 0 && pos.x <= 3 && pos.y >= 0 && pos.y <= 2;
};
