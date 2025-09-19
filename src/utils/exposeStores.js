// Helper pour exposer les stores Zustand en développement
// Cela permet aux outils de dev de capturer l'état

import useNotesStore from '../stores/useNotesStore';
import useProjectsStore from '../stores/useProjectsStore';
import useProjectMetaStore from '../stores/useProjectMetaStore';
import { getProjectData } from '../stores/useProjectDataStore';

// Fonction pour exposer les stores et helpers
export const exposeStoresToWindow = (navigationHook = null) => {
  if (typeof window !== 'undefined' && import.meta.env.DEV) {
    // Créer l'objet global si il n'existe pas
    window.__ZUSTAND_STORES__ = window.__ZUSTAND_STORES__ || {};

    // Exposer TOUS les stores
    window.__ZUSTAND_STORES__.notes = useNotesStore;
    window.__ZUSTAND_STORES__.projects = useProjectsStore; // Legacy store
    window.__ZUSTAND_STORES__.projectMeta = useProjectMetaStore;
    window.__ZUSTAND_STORES__.getProjectData = getProjectData;

    // Exposer la navigation si fournie
    if (navigationHook) {
      window.__NAVIGATION__ = navigationHook;
      window.__NAVIGATE_TO_ROOM__ = (x, y) => {
        if (window.__NAVIGATION__ && window.__NAVIGATION__.setCurrentRoom) {
          window.__NAVIGATION__.setCurrentRoom({ x, y });
          return true;
        }
        return false;
      };
    }

    // Helper pour récupérer tout l'état actuel
    window.__GET_ALL_STATE__ = () => {
      const state = {};
      Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
        const store = window.__ZUSTAND_STORES__[key];
        if (store && typeof store.getState === 'function') {
          state[key] = store.getState();
        }
      });
      return state;
    };

    // Helper pour debug
    window.__DEBUG_STORES__ = () => {
      console.log('🔍 Stores disponibles:');
      Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
        console.log(`  - ${key}:`, window.__ZUSTAND_STORES__[key].getState());
      });
      if (window.__NAVIGATION__) {
        console.log('  - Navigation:', window.__NAVIGATION__.currentRoom);
      }
    };

    // Alias plus simple pour accès rapide
    window.stores = {
      notes: useNotesStore.getState,
      projectMeta: useProjectMetaStore.getState,
      projectData: (projectId) => getProjectData(projectId),
      // Alias pour actions communes
      selectProject: (id) => useProjectMetaStore.getState().selectProject(id),
      getCurrentProject: () => useProjectMetaStore.getState().getCurrentProject(),
      getVisibleProjects: () => useProjectMetaStore.getState().getVisibleProjects()
    };

    console.log('✅ Stores exposés dans window.__ZUSTAND_STORES__');
    console.log('💡 Utilise window.__DEBUG_STORES__() pour voir l\'état');
    console.log('🚀 Accès rapide: window.stores.projectMeta() ou window.stores.projectData("irimmetabrain")');
  }
};

export default exposeStoresToWindow;