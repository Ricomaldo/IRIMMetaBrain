#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const componentsDir = path.join(rootDir, 'src', 'components');
const outputFile = path.join(rootDir, 'architecture-map.json');

/**
 * Parse un fichier JSX/JS pour extraire les annotations @renders
 * @param {string} filePath - Chemin du fichier à parser
 * @returns {Promise<Array>} Liste des composants rendus
 */
async function parseFileForRenders(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    
    // Regex pour capturer les blocs JSDoc
    const jsdocRegex = /\/\*\*([\s\S]*?)\*\//g;
    const renders = [];
    
    let match;
    while ((match = jsdocRegex.exec(content)) !== null) {
      const jsdocContent = match[1];
      
      // Extraire les tags @renders
      const rendersRegex = /@renders\s+(\S+)/g;
      let renderMatch;
      
      while ((renderMatch = rendersRegex.exec(jsdocContent)) !== null) {
        renders.push(renderMatch[1]);
      }
    }
    
    return renders;
  } catch (error) {
    // Fichier non lisible ou erreur
    return [];
  }
}

/**
 * Extrait le nom du composant depuis le chemin du fichier
 * @param {string} filePath - Chemin complet du fichier
 * @returns {string} Nom du composant
 */
function getComponentName(filePath) {
  const basename = path.basename(filePath, path.extname(filePath));
  // Retirer les extensions de style
  if (basename.endsWith('.styles')) {
    return null;
  }
  // Retirer les fichiers de test
  if (basename.endsWith('.test') || basename.endsWith('.spec')) {
    return null;
  }
  return basename;
}

/**
 * Parcourt récursivement un dossier pour trouver tous les composants
 * @param {string} dir - Dossier à parcourir
 * @param {string} basePath - Chemin de base pour les chemins relatifs
 * @returns {Promise<Array>} Liste des composants trouvés
 */
async function scanDirectory(dir, basePath = '') {
  const components = [];
  
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);
      
      if (entry.isDirectory()) {
        // Parcourir récursivement les sous-dossiers
        const subComponents = await scanDirectory(fullPath, relativePath);
        components.push(...subComponents);
      } else if (entry.isFile() && (entry.name.endsWith('.jsx') || entry.name.endsWith('.js'))) {
        const componentName = getComponentName(entry.name);
        
        if (componentName) {
          const renders = await parseFileForRenders(fullPath);
          
          // Créer le chemin relatif depuis src/components/
          const componentPath = relativePath.replace(/\.(jsx|js)$/, '');
          
          components.push({
            name: componentName,
            path: componentPath,
            renders: renders
          });
        }
      }
    }
  } catch (error) {
    console.error(`Erreur lors du scan de ${dir}:`, error.message);
  }
  
  return components;
}

/**
 * Construit un arbre hiérarchique à partir de la liste plate des composants
 * @param {Array} components - Liste plate des composants
 * @returns {Object} Arbre hiérarchique
 */
function buildComponentTree(components) {
  // Créer un index pour recherche rapide
  const componentIndex = {};
  components.forEach(comp => {
    componentIndex[comp.name] = comp;
  });
  
  // Enrichir chaque composant avec ses enfants résolus
  const enrichedComponents = components.map(comp => {
    const children = comp.renders
      .map(childName => componentIndex[childName])
      .filter(Boolean); // Filtrer les composants non trouvés
    
    return {
      ...comp,
      children: children.map(child => child.name)
    };
  });
  
  // Trouver les composants racines (non référencés par d'autres)
  const referencedComponents = new Set();
  enrichedComponents.forEach(comp => {
    comp.children.forEach(child => referencedComponents.add(child));
  });
  
  const rootComponents = enrichedComponents.filter(
    comp => !referencedComponents.has(comp.name)
  );
  
  return {
    timestamp: new Date().toISOString(),
    totalComponents: components.length,
    rootComponents: rootComponents.map(comp => comp.name),
    components: enrichedComponents
  };
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🔍 Parsing component tree from JSDoc annotations...');
  console.log(`📂 Scanning: ${componentsDir}`);
  
  // Scanner tous les composants
  const components = await scanDirectory(componentsDir);
  
  console.log(`✅ Found ${components.length} components`);
  
  // Afficher les composants avec des @renders
  const componentsWithRenders = components.filter(c => c.renders.length > 0);
  console.log(`📊 Components with @renders: ${componentsWithRenders.length}`);
  
  if (componentsWithRenders.length > 0) {
    console.log('\n📋 Components with @renders annotations:');
    componentsWithRenders.forEach(comp => {
      console.log(`  - ${comp.name}: renders [${comp.renders.join(', ')}]`);
    });
  }
  
  // Construire l'arbre
  const tree = buildComponentTree(components);
  
  // Sauvegarder le résultat
  await fs.writeFile(
    outputFile,
    JSON.stringify(tree, null, 2),
    'utf8'
  );
  
  console.log(`\n✨ Architecture map saved to: ${outputFile}`);
  console.log(`📈 Stats:`);
  console.log(`   - Total components: ${tree.totalComponents}`);
  console.log(`   - Root components: ${tree.rootComponents.length}`);
  console.log(`   - Components with children: ${componentsWithRenders.length}`);
}

// Exécuter le script
main().catch(error => {
  console.error('❌ Error:', error);
  process.exit(1);
});