#!/usr/bin/env node

/**
 * Script de capture d'état simplifié pour IRIMMetaBrain
 * Version sans Puppeteer - capture manuelle de l'état
 *
 * Usage: node scripts/capture-state-simple.js
 */

const fs = require('fs-extra');
const path = require('path');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

// Configuration
const CAPTURES_DIR = path.join(__dirname, '..', 'captures');
const SRC_DIR = path.join(__dirname, '..', 'src');

/**
 * Collecte les métriques du projet
 */
async function collectMetrics() {
  const metrics = {
    timestamp: new Date().toISOString(),
    files: {},
    totals: {
      components: 0,
      lines: 0,
      files: 0
    }
  };

  // Compter les fichiers par type
  try {
    const { stdout: jsxCount } = await execPromise(`find ${SRC_DIR} -name "*.jsx" | wc -l`);
    const { stdout: jsCount } = await execPromise(`find ${SRC_DIR} -name "*.js" | wc -l`);
    const { stdout: styleCount } = await execPromise(`find ${SRC_DIR} -name "*.styles.js" | wc -l`);

    metrics.files = {
      jsx: parseInt(jsxCount.trim()),
      js: parseInt(jsCount.trim()),
      styles: parseInt(styleCount.trim())
    };

    metrics.totals.files = metrics.files.jsx + metrics.files.js;
    metrics.totals.components = metrics.files.jsx;

    // Compter les lignes de code (approximatif)
    const { stdout: lineCount } = await execPromise(`find ${SRC_DIR} \\( -name "*.jsx" -o -name "*.js" \\) -exec wc -l {} + | tail -1`);
    const lines = lineCount.trim().split(/\s+/)[0];
    metrics.totals.lines = parseInt(lines);

  } catch (error) {
    console.warn('⚠️  Impossible de collecter toutes les métriques:', error.message);
  }

  // Analyser la structure des composants
  metrics.structure = await analyzeStructure();

  return metrics;
}

/**
 * Analyse la structure des composants
 */
async function analyzeStructure() {
  const structure = {
    rooms: [],
    components: {
      layout: [],
      common: [],
      navigation: []
    }
  };

  try {
    // Lister les rooms
    const roomsDir = path.join(SRC_DIR, 'components', 'rooms');
    if (await fs.pathExists(roomsDir)) {
      const rooms = await fs.readdir(roomsDir);
      structure.rooms = rooms.filter(r => !r.startsWith('.'));
    }

    // Lister les composants par catégorie
    const categories = ['layout', 'common', 'navigation'];
    for (const cat of categories) {
      const catDir = path.join(SRC_DIR, 'components', cat);
      if (await fs.pathExists(catDir)) {
        const items = await fs.readdir(catDir);
        structure.components[cat] = items.filter(i => !i.startsWith('.'));
      }
    }
  } catch (error) {
    console.warn('⚠️  Erreur lors de l\'analyse de structure:', error.message);
  }

  return structure;
}

/**
 * Capture l'état actuel depuis les stores (template)
 */
function captureStoresTemplate() {
  // Template pour l'état des stores
  // En production, ceci serait récupéré depuis l'app en runtime
  return {
    projects: {
      current: "IRIMMetaBrain",
      roadmapMarkdown: "# Roadmap\n\n- [ ] Phase 1: Architecture\n- [ ] Phase 2: Features\n- [ ] Phase 3: Polish",
      todoMarkdown: "# TODOs\n\n- [ ] Implémenter SystemOverview\n- [ ] Créer ComponentCatalog\n- [ ] Setup tests visuels"
    },
    notes: {
      rooms: {
        atelier: {
          title: "Atelier",
          content: "Centre de création et développement",
          lastModified: new Date().toISOString()
        },
        forge: {
          title: "Forge",
          content: "Lieu du hardcoding et des outils dev",
          lastModified: new Date().toISOString()
        }
      }
    },
    ui: {
      currentRoom: "atelier",
      isNavigating: false,
      modalsOpen: [],
      theme: "default"
    }
  };
}

/**
 * Compare avec la capture précédente
 */
async function compareWithPrevious(currentState) {
  const captures = await fs.readdir(CAPTURES_DIR);
  const previous = captures
    .filter(c => c !== currentState.id)
    .sort()
    .pop();

  if (!previous) {
    return null;
  }

  const previousPath = path.join(CAPTURES_DIR, previous, 'state.json');
  if (!await fs.pathExists(previousPath)) {
    return null;
  }

  const previousState = await fs.readJson(previousPath);

  // Comparaison simple des métriques
  const diff = {
    previous: previous,
    current: currentState.id,
    changes: {
      files: currentState.metrics.totals.files - previousState.metrics.totals.files,
      components: currentState.metrics.totals.components - previousState.metrics.totals.components,
      lines: currentState.metrics.totals.lines - previousState.metrics.totals.lines,
      newRooms: currentState.metrics.structure.rooms.filter(
        r => !previousState.metrics.structure.rooms.includes(r)
      )
    }
  };

  return diff;
}

/**
 * Fonction principale
 */
async function captureState() {
  console.log('🎬 Capture d\'état IRIMMetaBrain...\n');

  // Créer le dossier de captures si nécessaire
  await fs.ensureDir(CAPTURES_DIR);

  // Créer un dossier avec timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const captureDir = path.join(CAPTURES_DIR, timestamp);
  await fs.ensureDir(captureDir);

  console.log(`📁 Dossier de capture: ${timestamp}`);

  // 1. Collecter les métriques
  console.log('📊 Collection des métriques...');
  const metrics = await collectMetrics();
  await fs.writeJson(
    path.join(captureDir, 'metrics.json'),
    metrics,
    { spaces: 2 }
  );
  console.log(`   ✓ ${metrics.totals.files} fichiers, ${metrics.totals.lines} lignes`);

  // 2. Capturer l'état des stores (template)
  console.log('💾 Capture de l\'état...');
  const storesState = captureStoresTemplate();
  const fullState = {
    id: timestamp,
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    stores: storesState,
    metrics: metrics
  };
  await fs.writeJson(
    path.join(captureDir, 'state.json'),
    fullState,
    { spaces: 2 }
  );
  console.log('   ✓ État capturé');

  // 3. Comparer avec la capture précédente
  console.log('🔍 Comparaison avec l\'état précédent...');
  const diff = await compareWithPrevious(fullState);
  if (diff) {
    await fs.writeJson(
      path.join(captureDir, 'diff.json'),
      diff,
      { spaces: 2 }
    );
    console.log(`   ✓ Changements: ${diff.changes.files > 0 ? '+' : ''}${diff.changes.files} fichiers, ${diff.changes.lines > 0 ? '+' : ''}${diff.changes.lines} lignes`);
  } else {
    console.log('   ℹ️  Première capture');
  }

  // 4. Générer un README pour cette capture
  const readme = `# Capture ${timestamp}

## Métriques
- **Fichiers**: ${metrics.totals.files}
- **Composants**: ${metrics.totals.components}
- **Lignes de code**: ${metrics.totals.lines}

## Structure
- **Rooms**: ${metrics.structure.rooms.join(', ')}
- **Layout Components**: ${metrics.structure.components.layout.length}
- **Common Components**: ${metrics.structure.components.common.length}
- **Navigation Components**: ${metrics.structure.components.navigation.length}

${diff ? `## Changements depuis ${diff.previous}
- Fichiers: ${diff.changes.files > 0 ? '+' : ''}${diff.changes.files}
- Composants: ${diff.changes.components > 0 ? '+' : ''}${diff.changes.components}
- Lignes: ${diff.changes.lines > 0 ? '+' : ''}${diff.changes.lines}
${diff.changes.newRooms.length > 0 ? `- Nouvelles rooms: ${diff.changes.newRooms.join(', ')}` : ''}` : ''}

---
*Capturé le ${new Date().toLocaleString('fr-FR')}*
`;

  await fs.writeFile(
    path.join(captureDir, 'README.md'),
    readme
  );

  console.log('\n✅ Capture terminée avec succès!');
  console.log(`📸 Voir les résultats dans: ${captureDir}\n`);
}

// Exécuter si appelé directement
if (require.main === module) {
  captureState().catch(error => {
    console.error('❌ Erreur lors de la capture:', error);
    process.exit(1);
  });
}

module.exports = { captureState, collectMetrics };