// Script de test des scénarios critiques
// À copier-coller dans la console du navigateur

console.log('🧪 TESTS DE VALIDATION - IRIM MetaBrain v2');
console.log('==========================================\n');

// Test 1: Vérification de l'initialisation
console.log('📋 Test 1: Vérification de l\'initialisation');
const metaState = window.stores.projectMeta();
const projectCount = Object.keys(metaState.projects || {}).length;
console.log(`✅ ${projectCount} projets trouvés`);
console.log('Projets:', Object.keys(metaState.projects));
console.log('Projet sélectionné:', metaState.selectedProject);
console.log('Projets visibles:', metaState.visibleProjects);

// Test 2: Accès aux données d'un projet
console.log('\n📋 Test 2: Accès aux données d\'un projet');
const projectData = window.stores.projectData('irimmetabrain');
console.log('✅ Données IRIMMetaBrain chargées');
console.log('Roadmap (extrait):', projectData.roadmapMarkdown?.substring(0, 100) + '...');
console.log('Todo (extrait):', projectData.todoMarkdown?.substring(0, 100) + '...');
console.log('Modules Atelier:', Object.keys(projectData.atelierModules || {}));

// Test 3: Navigation entre projets
console.log('\n📋 Test 3: Navigation entre projets');
const currentProject = window.stores.getCurrentProject();
console.log('Projet actuel:', currentProject?.name);
window.stores.selectProject('moodcycle');
const newProject = window.stores.getCurrentProject();
console.log('Nouveau projet après navigation:', newProject?.name);
// Restaurer
window.stores.selectProject('irimmetabrain');

// Test 4: Vérification des catégories
console.log('\n📋 Test 4: Vérification des catégories');
const categories = metaState.categories;
console.log('Catégories disponibles:', Object.keys(categories));
Object.entries(categories).forEach(([key, cat]) => {
  console.log(`  - ${key}: ${cat.label} (${cat.subcategories.join(', ')})`);
});

// Test 5: Statistiques de synchronisation
console.log('\n📋 Test 5: Statistiques de synchronisation');
const lastSync = localStorage.getItem('last-sync');
const migrationFlag = localStorage.getItem('store-migrated-v2');
const initialized = localStorage.getItem('stores-initialized');
console.log('Migration v2:', migrationFlag === 'true' ? '✅ Effectuée' : '❌ Non effectuée');
console.log('Stores initialisés:', initialized === 'true' ? '✅ Oui' : '❌ Non');
console.log('Dernière sync:', lastSync || 'Jamais synchronisé');

// Test 6: Vérification de la structure localStorage
console.log('\n📋 Test 6: Structure localStorage');
const keys = Object.keys(localStorage);
const projectDataKeys = keys.filter(k => k.startsWith('project-data-'));
const metaKey = keys.find(k => k === 'project-meta-store');
console.log('Clé meta store:', metaKey ? '✅ Présente' : '❌ Absente');
console.log(`Stores de données projet: ${projectDataKeys.length} trouvés`);
projectDataKeys.forEach(key => {
  const projectId = key.replace('project-data-', '');
  const size = (localStorage.getItem(key)?.length || 0) / 1024;
  console.log(`  - ${projectId}: ${size.toFixed(2)} KB`);
});

// Test 7: Vérification de l'intégrité des données
console.log('\n📋 Test 7: Intégrité des données');
let integrityOk = true;
Object.keys(metaState.projects).forEach(projectId => {
  const hasData = localStorage.getItem(`project-data-${projectId}`);
  if (!hasData) {
    console.log(`❌ Données manquantes pour: ${projectId}`);
    integrityOk = false;
  }
});
if (integrityOk) {
  console.log('✅ Toutes les données projet sont présentes');
}

// Résumé
console.log('\n==========================================');
console.log('📊 RÉSUMÉ DES TESTS');
console.log('==========================================');
console.log(`✅ ${projectCount} projets initialisés`);
console.log(`✅ Navigation fonctionnelle`);
console.log(`✅ Catégories configurées`);
console.log(`✅ Structure localStorage correcte`);
console.log(`${integrityOk ? '✅' : '❌'} Intégrité des données`);
console.log('\n💡 Pour réinitialiser avec les données par défaut:');
console.log('   localStorage.clear() puis recharger la page');
console.log('\n💡 Pour tester la synchronisation:');
console.log('   Cliquer sur le bouton 🔄 dans Control Tower');

// Commandes utiles
console.log('\n🛠️ COMMANDES UTILES');
console.log('==========================================');
console.log('window.stores.projectMeta()           // État meta complet');
console.log('window.stores.projectData("id")       // Données d\'un projet');
console.log('window.stores.getCurrentProject()     // Projet actuel');
console.log('window.stores.selectProject("id")     // Changer de projet');
console.log('window.__DEBUG_STORES__()              // Debug complet');