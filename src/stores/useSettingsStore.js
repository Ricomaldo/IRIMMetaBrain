// src/stores/useSettingsStore.js - Store des paramètres de l'application

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSettingsStore = create(
  persist(
    (set, get) => ({
      // Pièce de démarrage par défaut (Chambre)
      defaultRoom: { x: 1, y: 0 },

      // Mettre à jour la pièce de démarrage
      setDefaultRoom: (position) => {
        set({ defaultRoom: position });
      },

      // Récupérer la pièce de démarrage
      getDefaultRoom: () => {
        return get().defaultRoom;
      },
    }),
    {
      name: "irim-settings-store", // Clé localStorage
      version: 1,
    }
  )
);

export default useSettingsStore;
