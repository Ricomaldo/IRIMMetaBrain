// src/stores/useRoomsUIStore.js - Store pour l'état UI des rooms (hors Atelier)

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useRoomsUIStore = create(
  persist(
    (set, get) => ({
      // État UI par room et par panel
      roomStates: {
        chambre: {
          timer: { collapsed: false },
          totem: { collapsed: false },
          mindlog: { collapsed: false },
          mantra: { collapsed: false },
          notes: { collapsed: false },
          navigation: { collapsed: false },
        },
        forge: {
          mainPanel: { collapsed: false },
          notes: { collapsed: false },
        },
        cuisine: {},
        jardin: {},
        boutique: {},
        scriptorium: {},
        bibliotheque: {},
        cave: {},
        sanctuaire: {},
        comptoir: {},
        laboratoire: {},
      },

      // Récupérer l'état d'un panel
      getPanelState: (roomId, panelId) => {
        const roomStates = get().roomStates;

        // Initialiser la room si elle n'existe pas
        if (!roomStates[roomId]) {
          set((state) => ({
            roomStates: {
              ...state.roomStates,
              [roomId]: {},
            },
          }));
          return { collapsed: false }; // État par défaut
        }

        // Initialiser le panel si il n'existe pas
        if (!roomStates[roomId][panelId]) {
          return { collapsed: false }; // État par défaut
        }

        return roomStates[roomId][panelId];
      },

      // Mettre à jour l'état d'un panel
      updatePanelState: (roomId, panelId, stateUpdate) => {
        set((state) => {
          const currentRoomState = state.roomStates[roomId] || {};
          const currentPanelState = currentRoomState[panelId] || {};

          return {
            roomStates: {
              ...state.roomStates,
              [roomId]: {
                ...currentRoomState,
                [panelId]: {
                  ...currentPanelState,
                  ...stateUpdate,
                },
              },
            },
          };
        });
      },

      // Réinitialiser une room complète
      resetRoomState: (roomId) => {
        set((state) => ({
          roomStates: {
            ...state.roomStates,
            [roomId]: {},
          },
        }));
      },

      // Toggle collapse d'un panel (helper pratique)
      togglePanelCollapse: (roomId, panelId) => {
        const currentState = get().getPanelState(roomId, panelId);
        get().updatePanelState(roomId, panelId, {
          collapsed: !currentState.collapsed,
        });
      },
    }),
    {
      name: "irim-rooms-ui-store", // Clé localStorage
      version: 1,
    }
  )
);

export default useRoomsUIStore;