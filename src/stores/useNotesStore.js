// src/stores/useNotesStore.js - Store Notes/Dev (Infrastructure/méta-développement)

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { debounce } from '../utils/debounce';

const useNotesStore = create(
  persist(
    (set, get) => ({
      // État des notes
      roomNotes: {
        chambre: '',
        atelier: '',
        forge: '',
        boutique: ''
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
          roomNotes: { chambre: '', atelier: '', forge: '', boutique: '' },
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
        // Migration future si structure change
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