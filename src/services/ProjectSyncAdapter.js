// src/services/ProjectSyncAdapter.js - Adaptateur pour synchroniser la nouvelle architecture multi-stores

import SyncManager from './SyncManager';
import useProjectMetaStore from '../stores/useProjectMetaStore';
import useNotesStore from '../stores/useNotesStore';
import { defaultProjectsData } from '../stores/defaultProjectsData';

/**
 * ProjectSyncAdapter - Adaptateur pour la synchronisation multi-stores
 *
 * Responsabilités:
 * - Collecter les données depuis tous les stores (Meta + ProjectData)
 * - Dispatcher les données importées vers les bons stores
 * - Gérer les conflits et versions
 * - Fallback sur données par défaut si nécessaire
 */
class ProjectSyncAdapter {
  constructor() {
    this.syncManager = SyncManager;
  }

  /**
   * Configure l'adaptateur avec les credentials GitHub
   */
  configure(githubToken, gistId = null) {
    this.syncManager.configure(githubToken, gistId);
  }

  /**
   * Définit le mot de passe de chiffrement
   */
  setPassword(password) {
    this.syncManager.setPassword(password);
  }

  /**
   * Collecte toutes les données depuis les stores actuels
   * @returns {Object} Données combinées de tous les stores
   */
  collectAllStoreData() {
    const data = {
      version: '2.0.0', // Version 2 pour la nouvelle architecture
      timestamp: new Date().toISOString(),
      architecture: 'multi-store', // Marqueur pour identifier le format
      stores: {
        // 1. Notes Store (infrastructure)
        notes: this.collectNotesData(),

        // 2. Project Meta Store
        projectMeta: this.collectProjectMetaData(),

        // 3. Project Data Stores (un par projet)
        projectData: this.collectAllProjectData()
      }
    };

    return data;
  }

  /**
   * Collecte les données du store Notes
   */
  collectNotesData() {
    try {
      const notesState = useNotesStore.getState();
      return {
        roomNotes: notesState.roomNotes || {},
        sideTowerNotes: notesState.sideTowerNotes || {}
      };
    } catch (error) {
      console.error('Error collecting notes data:', error);
      return { roomNotes: {}, sideTowerNotes: {} };
    }
  }

  /**
   * Collecte les métadonnées des projets
   */
  collectProjectMetaData() {
    try {
      const metaState = useProjectMetaStore.getState();
      return {
        selectedProject: metaState.selectedProject,
        visibleProjects: metaState.visibleProjects || [],
        categories: metaState.categories || {},
        projects: metaState.projects || {}
      };
    } catch (error) {
      console.error('Error collecting project meta data:', error);
      return defaultProjectsData.meta;
    }
  }

  /**
   * Collecte les données de tous les projets
   */
  collectAllProjectData() {
    const projectData = {};
    const metaState = useProjectMetaStore.getState();
    const projectIds = Object.keys(metaState.projects || {});

    projectIds.forEach(projectId => {
      try {
        // Récupérer les données depuis localStorage directement
        const storeKey = `project-data-${projectId}`;
        const storedData = localStorage.getItem(storeKey);

        if (storedData) {
          const parsed = JSON.parse(storedData);
          projectData[projectId] = parsed.state || {};
        }
      } catch (error) {
        console.error(`Error collecting data for project ${projectId}:`, error);
        // Utiliser les données par défaut si erreur
        if (defaultProjectsData.projectData[projectId]) {
          projectData[projectId] = defaultProjectsData.projectData[projectId];
        }
      }
    });

    return projectData;
  }

  /**
   * Export toutes les données vers GitHub Gist
   * @param {boolean} encrypted - Si true, chiffre les données
   * @returns {Promise<string>} URL du Gist créé/mis à jour
   */
  async exportToGist(encrypted = true) {
    try {
      const allData = this.collectAllStoreData();
      console.log('📤 Exporting data to GitHub Gist...');

      const gistUrl = await this.syncManager.uploadGist(allData, encrypted);

      // Extraire l'ID du Gist depuis l'URL pour le copier
      const gistId = gistUrl.split('/').pop();

      // Copier l'ID dans le presse-papier si possible
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(gistId);
        console.log(`📋 Gist ID copied to clipboard: ${gistId}`);
      }

      console.log('✅ Export successful:', gistUrl);
      return { success: true, url: gistUrl, id: gistId };
    } catch (error) {
      console.error('❌ Export failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Import les données depuis GitHub Gist
   * @param {string} gistId - ID du Gist
   * @param {boolean} encrypted - Si true, déchiffre les données
   * @returns {Promise<Object>} Résultat de l'import
   */
  async importFromGist(gistId, encrypted = true) {
    try {
      console.log('📥 Importing data from GitHub Gist...');

      const data = await this.syncManager.downloadGist(gistId, encrypted);

      // Vérifier la version et l'architecture
      if (data.version === '2.0.0' && data.architecture === 'multi-store') {
        return this.importMultiStoreData(data);
      } else if (data.version === '1.0.0') {
        // Format ancien, nécessite migration
        return this.importLegacyData(data);
      } else {
        throw new Error('Unknown data format version');
      }
    } catch (error) {
      console.error('❌ Import failed:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Import les données au format multi-store v2
   */
  async importMultiStoreData(data) {
    try {
      const { stores } = data;

      // 1. Importer les notes
      if (stores.notes) {
        const notesStore = useNotesStore.getState();
        notesStore.importNotes(stores.notes);
        console.log('✅ Notes imported');
      }

      // 2. Importer les métadonnées des projets
      if (stores.projectMeta) {
        // Nettoyer les stores existants
        this.clearAllProjectDataStores();

        // Recréer le meta store
        const metaStoreData = {
          state: stores.projectMeta,
          version: 2
        };
        localStorage.setItem('project-meta-store', JSON.stringify(metaStoreData));
        console.log('✅ Project metadata imported');
      }

      // 3. Importer les données de chaque projet
      if (stores.projectData) {
        Object.entries(stores.projectData).forEach(([projectId, projectData]) => {
          const storeKey = `project-data-${projectId}`;
          const storeData = {
            state: projectData,
            version: 1
          };
          localStorage.setItem(storeKey, JSON.stringify(storeData));
          console.log(`✅ Project data imported: ${projectId}`);
        });
      }

      // Marquer comme synchronisé
      localStorage.setItem('last-sync', new Date().toISOString());

      console.log('✅ All data imported successfully');
      return {
        success: true,
        message: 'Import successful',
        timestamp: data.timestamp
      };

    } catch (error) {
      console.error('Error importing multi-store data:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Import les données depuis l'ancien format v1
   */
  async importLegacyData(data) {
    try {
      const { stores } = data;

      // 1. Importer les notes (format inchangé)
      if (stores.notes) {
        const notesStore = useNotesStore.getState();
        notesStore.importNotes(stores.notes);
      }

      // 2. Importer les projets (nécessite conversion)
      if (stores.projects) {
        // Créer le format de l'ancien store pour la migration
        const oldStoreData = {
          state: stores.projects,
          version: 1
        };
        localStorage.setItem('irim-projects-store', JSON.stringify(oldStoreData));

        // Déclencher la migration
        const { migrateProjectStores } = await import('../stores/migrateProjectStores');
        const migrationSuccess = migrateProjectStores();

        if (!migrationSuccess) {
          throw new Error('Migration from legacy format failed');
        }
      }

      console.log('✅ Legacy data imported and migrated');
      return {
        success: true,
        message: 'Legacy data imported and migrated',
        migrated: true
      };

    } catch (error) {
      console.error('Error importing legacy data:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Nettoie tous les stores de données de projet
   */
  clearAllProjectDataStores() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('project-data-')) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * Vérifie si une synchronisation est nécessaire
   */
  needsSync() {
    const lastSync = localStorage.getItem('last-sync');
    if (!lastSync) return true;

    // Considérer qu'une sync est nécessaire après 24h
    const lastSyncDate = new Date(lastSync);
    const now = new Date();
    const hoursSinceSync = (now - lastSyncDate) / (1000 * 60 * 60);

    return hoursSinceSync > 24;
  }

  /**
   * Obtient les statistiques de synchronisation
   */
  getSyncStats() {
    const lastSync = localStorage.getItem('last-sync');
    const metaState = useProjectMetaStore.getState();
    const projectCount = Object.keys(metaState.projects || {}).length;

    return {
      lastSync: lastSync ? new Date(lastSync) : null,
      projectCount,
      needsSync: this.needsSync()
    };
  }

  /**
   * Test de connexion GitHub
   */
  async testConnection() {
    return this.syncManager.testConnection();
  }

  /**
   * Liste les Gists disponibles
   */
  async listGists() {
    return this.syncManager.listGists();
  }
}

// Export une instance singleton
const projectSyncAdapter = new ProjectSyncAdapter();
export default projectSyncAdapter;