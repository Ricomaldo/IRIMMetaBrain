// src/stores/migrateProjectStores.js - Migration sécurisée vers la nouvelle architecture

import useProjectMetaStore from './useProjectMetaStore';
import { getProjectData } from './useProjectDataStore';
import { defaultProjectsData, initializeWithDefaultData } from './defaultProjectsData';

// Fonction de migration principale
export const migrateProjectStores = () => {
  // Vérifier si la migration a déjà été effectuée
  const migrationFlag = localStorage.getItem('store-migrated-v2');
  if (migrationFlag === 'true') {
    console.log('Migration already completed');
    return false;
  }

  console.log('Starting migration to multi-store architecture...');

  try {
    // 1. Lire l'ancien store
    const oldStoreKey = 'irim-projects-store';
    const oldStoreData = localStorage.getItem(oldStoreKey);

    if (!oldStoreData) {
      console.log('No old store data found, skipping migration');
      localStorage.setItem('store-migrated-v2', 'true');
      return false;
    }

    const parsedOldStore = JSON.parse(oldStoreData);
    const oldState = parsedOldStore.state;

    // 2. Backup de l'ancien store
    localStorage.setItem('projects-backup-v1', oldStoreData);
    console.log('Backup created: projects-backup-v1');

    // 3. Extraire et migrer les métadonnées vers ProjectMetaStore
    const metaData = {
      selectedProject: oldState.selectedProject || 'irimmetabrain',
      visibleProjects: oldState.visibleProjects || [],
      categories: oldState.categories || {
        pro: {
          label: "Professionnel",
          subcategories: ["contrat", "maintenance", "consultation"]
        },
        perso: {
          label: "Personnel",
          subcategories: ["demo", "speculatif", "apprentissage", "outil"]
        },
        formation: {
          label: "Formation",
          subcategories: ["cours", "exercice", "certification"]
        }
      },
      projects: {}
    };

    // 4. Migrer chaque projet
    if (oldState.projects) {
      let orderIndex = 0;
      Object.entries(oldState.projects).forEach(([projectId, projectData]) => {
        // Extraire les métadonnées
        metaData.projects[projectId] = {
          id: projectData.id,
          name: projectData.name,
          type: projectData.type,
          status: projectData.status,
          category: projectData.category,
          subcategory: projectData.subcategory,
          created_at: projectData.created_at,
          updated_at: projectData.updated_at,
          // Nouvelles propriétés (avec valeurs par défaut)
          contractType: projectData.contractType || null,
          deploymentStatus: projectData.deploymentStatus || 'local',
          projectNature: projectData.projectNature || projectData.subcategory,
          technologies: projectData.technologies || [],
          client: projectData.client || null,
          startDate: projectData.startDate || null,
          endDate: projectData.endDate || null,
          order: projectData.order !== undefined ? projectData.order : orderIndex++
        };

        // Créer un store de données pour ce projet
        const projectDataStore = {
          state: {
            roadmapMarkdown: projectData.roadmapMarkdown || '',
            todoMarkdown: projectData.todoMarkdown || '',
            atelierModules: projectData.atelierModules || {
              roadmap: { collapsed: true },
              todo: { collapsed: true },
              mindlog: { collapsed: true, mood: "😐", note: "" },
              actions: { collapsed: true, items: [] },
              screentv: { collapsed: true, screenshots: [] }
            },
            roadmap: projectData.roadmap || [],
            todo: projectData.todo || [],
            idees: projectData.idees || [],
            prochaineAction: projectData.prochaineAction || null
          },
          version: 1
        };

        // Sauvegarder dans localStorage avec la clé spécifique au projet
        localStorage.setItem(
          `project-data-${projectId}`,
          JSON.stringify(projectDataStore)
        );
        console.log(`Migrated data for project: ${projectId}`);
      });
    }

    // 5. Sauvegarder les métadonnées dans le nouveau store
    const metaStoreData = {
      state: metaData,
      version: 2
    };
    localStorage.setItem('project-meta-store', JSON.stringify(metaStoreData));
    console.log('Meta store created successfully');

    // 6. Marquer la migration comme complète
    localStorage.setItem('store-migrated-v2', 'true');

    // 7. Optionnel : Supprimer l'ancien store (commenté pour sécurité)
    // localStorage.removeItem(oldStoreKey);

    console.log('Migration completed successfully!');
    return true;

  } catch (error) {
    console.error('Migration failed:', error);

    // En cas d'erreur, essayer de restaurer depuis le backup
    const backup = localStorage.getItem('projects-backup-v1');
    if (backup) {
      localStorage.setItem('irim-projects-store', backup);
      console.log('Restored from backup due to migration error');
    }

    return false;
  }
};

// Fonction pour vérifier l'intégrité après migration
export const verifyMigration = () => {
  try {
    // Vérifier le meta store
    const metaStore = localStorage.getItem('project-meta-store');
    if (!metaStore) {
      console.error('Meta store not found');
      return false;
    }

    const metaData = JSON.parse(metaStore);
    const projectIds = Object.keys(metaData.state.projects || {});

    // Vérifier que chaque projet a ses données
    let allDataPresent = true;
    projectIds.forEach(projectId => {
      const projectData = localStorage.getItem(`project-data-${projectId}`);
      if (!projectData) {
        console.error(`Missing data for project: ${projectId}`);
        allDataPresent = false;
      }
    });

    if (allDataPresent) {
      console.log('Migration verification passed ✓');
      return true;
    } else {
      console.error('Migration verification failed');
      return false;
    }
  } catch (error) {
    console.error('Verification error:', error);
    return false;
  }
};

// Fonction pour rollback en cas de problème
export const rollbackMigration = () => {
  const backup = localStorage.getItem('projects-backup-v1');
  if (!backup) {
    console.error('No backup found for rollback');
    return false;
  }

  try {
    // Restaurer l'ancien store
    localStorage.setItem('irim-projects-store', backup);

    // Nettoyer les nouveaux stores
    localStorage.removeItem('project-meta-store');
    localStorage.removeItem('store-migrated-v2');

    // Nettoyer les stores de données individuels
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('project-data-')) {
        localStorage.removeItem(key);
      }
    });

    console.log('Rollback completed successfully');
    return true;
  } catch (error) {
    console.error('Rollback failed:', error);
    return false;
  }
};

// Auto-migration au chargement (à appeler dans App.jsx)
export const autoMigrate = () => {
  const needsMigration = !localStorage.getItem('store-migrated-v2');

  if (needsMigration) {
    const success = migrateProjectStores();
    if (success) {
      verifyMigration();
    }
  }
};

// Fonction d'initialisation complète (migration + données par défaut)
export const initializeStores = async () => {
  console.log('🚀 Initializing stores...');

  // 1. Vérifier si c'est une première utilisation
  const metaStoreExists = localStorage.getItem('project-meta-store');
  const oldStoreExists = localStorage.getItem('irim-projects-store');
  const migrationDone = localStorage.getItem('store-migrated-v2') === 'true';

  // 2. Si ancien store existe et pas encore migré
  if (oldStoreExists && !migrationDone) {
    console.log('📦 Old store detected, starting migration...');
    const migrationSuccess = migrateProjectStores();
    if (migrationSuccess) {
      verifyMigration();
      console.log('✅ Migration completed successfully');
      return 'migrated';
    } else {
      console.error('❌ Migration failed');
      // Continuer avec initialisation par défaut
    }
  }

  // 3. Si aucun store n'existe (première utilisation ou localStorage vide)
  if (!metaStoreExists && !oldStoreExists) {
    console.log('🆕 First time usage detected, initializing with default data...');
    await initializeWithDefaultData();
    localStorage.setItem('store-migrated-v2', 'true');
    localStorage.setItem('stores-initialized', 'true');
    console.log('✅ Default data initialized');
    return 'initialized';
  }

  // 4. Si meta store existe mais semble vide ou corrompu
  if (metaStoreExists) {
    try {
      const metaData = JSON.parse(metaStoreExists);
      const hasProjects = metaData.state &&
                         metaData.state.projects &&
                         Object.keys(metaData.state.projects).length > 0;

      if (!hasProjects) {
        console.log('🔄 Empty meta store detected, reinitializing...');
        await initializeWithDefaultData();
        localStorage.setItem('stores-initialized', 'true');
        console.log('✅ Reinitialized with default data');
        return 'reinitialized';
      }
    } catch (error) {
      console.error('❌ Error parsing meta store:', error);
      // Store corrompu, réinitialiser
      console.log('🔧 Corrupted store detected, reinitializing...');
      await initializeWithDefaultData();
      localStorage.setItem('stores-initialized', 'true');
      return 'recovered';
    }
  }

  console.log('✅ Stores already initialized and valid');
  return 'existing';
};

// Fonction pour vérifier si les stores ont besoin d'initialisation
export const needsInitialization = () => {
  const metaStore = localStorage.getItem('project-meta-store');

  if (!metaStore) return true;

  try {
    const parsed = JSON.parse(metaStore);
    const hasProjects = parsed.state?.projects &&
                       Object.keys(parsed.state.projects).length > 0;
    return !hasProjects;
  } catch {
    return true;
  }
};

// Fonction pour réinitialiser complètement (utile pour debug/reset)
export const resetToDefaultData = async () => {
  if (!confirm('⚠️ Ceci va remplacer TOUTES vos données par les données par défaut. Continuer?')) {
    return false;
  }

  console.log('🔄 Resetting all stores to default data...');

  // Nettoyer tous les stores
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('project-') ||
        key === 'irim-projects-store' ||
        key === 'irim-notes-store') {
      localStorage.removeItem(key);
    }
  });

  // Réinitialiser avec données par défaut
  await initializeWithDefaultData();
  localStorage.setItem('store-migrated-v2', 'true');
  localStorage.setItem('stores-initialized', 'true');

  console.log('✅ Reset to default data completed');
  window.location.reload(); // Recharger pour appliquer les changements
  return true;
};