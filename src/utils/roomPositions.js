// src/utils/roomPositions.js

import { roomBackgrounds } from './assetMapping';

export const roomConfig = [
  { x: 0, y: 0, type: 'empty', name: '', background: null },
  { x: 1, y: 0, type: 'chambre', name: 'Chambre', background: roomBackgrounds.chambre },
  { x: 2, y: 0, type: 'empty', name: '', background: null },
  { x: 3, y: 0, type: 'empty', name: '', background: null },
  { x: 0, y: 1, type: 'boutique', name: 'Boutique', background: roomBackgrounds.boutique },
  { x: 1, y: 1, type: 'atelier', name: 'Atelier', background: roomBackgrounds.atelier },
  { x: 2, y: 1, type: 'empty', name: '', background: null },
  { x: 3, y: 1, type: 'empty', name: '', background: null },
  { x: 0, y: 2, type: 'empty', name: '', background: null },
  { x: 1, y: 2, type: 'forge', name: 'Forge', background: roomBackgrounds.forge },
  { x: 2, y: 2, type: 'empty', name: '', background: null },
  { x: 3, y: 2, type: 'empty', name: '', background: null }
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
