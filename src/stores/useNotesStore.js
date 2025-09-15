// src/stores/useNotesStore.js - Store Notes/Dev (Infrastructure/méta-développement)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { debounce } from '../utils/debounce';

const useNotesStore = create(
  persist(
    (set, get) => ({
      // État des notes - Architecture 4x3 complète
      roomNotes: {
        // Ligne 0: [Sanctuaire] [Chambre] [Cuisine] [Comptoir]
        sanctuaire: '',
        chambre: '',
        cuisine: '',
        comptoir: '',

        // Ligne 1: [Jardin] [ATELIER] [Forge] [Boutique]
        jardin: '',
        atelier: '',
        forge: '',
        boutique: '',

        // Ligne 2: [Scriptorium] [Bibliothèque] [Cave]
        scriptorium: '',
        bibliotheque: '',
        cave: ''
        // 'undefined' volontairement omis - pas de notes pour "À définir"
      },
      sideTowerNotes: {
        general: ''
      },

      // Actions pour room notes
      updateRoomNote: (roomType, content) => {
        set((state) => ({
          roomNotes: {
            ...state.roomNotes,
            [roomType]: content
          }
        }));
      },

      // Actions pour side tower notes
      updateSideTowerNote: (content) => {
        set((state) => ({
          sideTowerNotes: {
            ...state.sideTowerNotes,
            general: content
          }
        }));
      },

      // Helper pour récupérer une note spécifique
      getRoomNote: (roomType) => {
        return get().roomNotes[roomType] || '';
      },

      getSideTowerNote: () => {
        return get().sideTowerNotes.general || '';
      },

      // Actions de maintenance
      clearAllNotes: () => {
        set({
          roomNotes: {
            sanctuaire: '', chambre: '', cuisine: '', comptoir: '',
            jardin: '', atelier: '', forge: '', boutique: '',
            scriptorium: '', bibliotheque: '', cave: ''
          },
          sideTowerNotes: { general: '' }
        });
      },

      // Export/Import pour migration
      exportNotes: () => {
        const state = get();
        return {
          roomNotes: state.roomNotes,
          sideTowerNotes: state.sideTowerNotes,
          exported_at: new Date().toISOString()
        };
      },

      importNotes: (data) => {
        if (data.roomNotes) {
          set((state) => ({
            roomNotes: { ...state.roomNotes, ...data.roomNotes }
          }));
        }
        if (data.sideTowerNotes) {
          set((state) => ({
            sideTowerNotes: { ...state.sideTowerNotes, ...data.sideTowerNotes }
          }));
        }
      }
    }),
    {
      name: 'irim-notes-store', // localStorage key
      version: 1,
      // Migration des anciennes données si nécessaire
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration depuis l'ancien format (4 pièces seulement)
          const oldRoomNotes = persistedState.roomNotes || {};

          return {
            ...persistedState,
            roomNotes: {
              // Préserver les anciennes notes
              chambre: oldRoomNotes.chambre || '',
              atelier: oldRoomNotes.atelier || '',
              forge: oldRoomNotes.forge || '',
              boutique: oldRoomNotes.boutique || '',

              // Ajouter les nouvelles pièces vides
              sanctuaire: '',
              cuisine: '',
              comptoir: '',
              jardin: '',
              scriptorium: '',
              bibliotheque: '',
              cave: ''
            }
          };
        }
        return persistedState;
      }
    }
  )
);

// Helper avec debounce pour les updates fréquentes
export const debouncedUpdateRoomNote = debounce((roomType, content) => {
  useNotesStore.getState().updateRoomNote(roomType, content);
}, 500);

export const debouncedUpdateSideTowerNote = debounce((content) => {
  useNotesStore.getState().updateSideTowerNote(content);
}, 500);

export default useNotesStore;