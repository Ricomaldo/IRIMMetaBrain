/**
 * Fichier de mapping des rooms
 * Permet de maintenir la correspondance entre les positions et les noms
 * Indépendamment de l'évolution du projet
 */

// Mapping actuel (septembre 2025)
export const roomMapping = {
  // Ligne 0 (y=0)
  'room1': { position: '(0,0)', currentName: 'sanctuaire' },
  'room2': { position: '(1,0)', currentName: 'chambre' },
  'room3': { position: '(2,0)', currentName: 'cuisine' },
  'room4': { position: '(3,0)', currentName: 'comptoir' },

  // Ligne 1 (y=1)
  'room5': { position: '(0,1)', currentName: 'jardin' },
  'room6': { position: '(1,1)', currentName: 'atelier' },  // Position par défaut
  'room7': { position: '(2,1)', currentName: 'forge' },
  'room8': { position: '(3,1)', currentName: 'boutique' },

  // Ligne 2 (y=2)
  'room9': { position: '(0,2)', currentName: 'undefined' },  // À définir
  'room10': { position: '(1,2)', currentName: 'bibliotheque' },
  'room11': { position: '(2,2)', currentName: 'scriptorium' },
  'room12': { position: '(3,2)', currentName: 'cave' }
};

// Fonction helper pour récupérer le nom actuel d'une room
export const getRoomName = (roomId) => {
  return roomMapping[roomId]?.currentName || 'unknown';
};

// Fonction helper pour récupérer l'ID depuis une position
export const getRoomIdFromPosition = (x, y) => {
  const roomNumber = y * 4 + x + 1;
  return `room${roomNumber}`;
};

// Fonction pour mettre à jour le mapping (si besoin)
export const updateRoomName = (roomId, newName) => {
  if (roomMapping[roomId]) {
    roomMapping[roomId].currentName = newName;
    console.log(`✅ Room ${roomId} renommée: ${newName}`);
  }
};