#!/usr/bin/env node

/**
 * Script de capture d'état complet avec Puppeteer
 * Capture screenshots + état Zustand + métriques
 */

import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configuration
const CAPTURES_DIR = path.join(__dirname, '..', 'captures');
const APP_URL = process.env.APP_URL || 'http://localhost:5173';

/**
 * Attendre que l'application soit prête
 */
async function waitForApp(page) {
  try {
    // Attendre que le root soit présent
    await page.waitForSelector('#root', { timeout: 10000 });

    // Attendre que les stores soient initialisés
    await page.waitForFunction(
      () => {
        // Vérifier que les stores existent
        if (!window.__ZUSTAND_STORES__) return false;
        // Vérifier qu'au moins un store est présent
        return Object.keys(window.__ZUSTAND_STORES__).length > 0;
      },
      { timeout: 10000 }
    );

    // Attendre que le contenu soit visible (RoomCanvas chargé)
    await page.waitForSelector('canvas, [data-room], .room-container', { timeout: 5000 }).catch(() => {
      console.log('  ⚠️ Canvas/Room non trouvé, mais on continue...');
    });

    // Vérifier la présence des flèches de navigation
    const arrows = await page.evaluate(() => {
      const arrowElements = document.querySelectorAll('button[aria-label*="Navigate"]');
      return Array.from(arrowElements).map(el => el.getAttribute('aria-label'));
    });
    if (arrows.length > 0) {
      console.log(`  ✓ ${arrows.length} flèches trouvées:`, arrows.join(', '));
    } else {
      console.log('  ⚠️ Aucune flèche de navigation trouvée');
    }

    // Petit délai pour les animations
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Vérifier qu'on peut récupérer l'état
    const hasStores = await page.evaluate(() => {
      if (window.__ZUSTAND_STORES__ && window.__GET_ALL_STATE__) {
        const state = window.__GET_ALL_STATE__();
        console.log('État détecté:', state);
        return true;
      }
      return false;
    });

    if (!hasStores) {
      console.log('  ⚠️ Stores non accessibles, mais on continue...');
    }

    return true;
  } catch (error) {
    console.error('❌ L\'application n\'est pas prête:', error.message);
    return false;
  }
}

/**
 * Capturer l'état des stores Zustand
 */
async function captureZustandState(page) {
  return await page.evaluate(() => {
    const result = {
      stores: {},
      localStorage: {},
      url: window.location.href,
      timestamp: new Date().toISOString(),
      debug: {}
    };

    // Utiliser le helper si disponible
    if (window.__GET_ALL_STATE__) {
      const rawState = window.__GET_ALL_STATE__();
      // Nettoyer l'état en enlevant les fonctions
      result.stores = JSON.parse(JSON.stringify(rawState));
      result.debug.method = '__GET_ALL_STATE__';
      result.debug.rawStateKeys = Object.keys(rawState);
    } else if (window.__ZUSTAND_STORES__) {
      // Fallback : parcourir manuellement
      Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
        const store = window.__ZUSTAND_STORES__[key];
        if (store && typeof store.getState === 'function') {
          try {
            const storeState = store.getState();
            // Filtrer uniquement les données, pas les fonctions
            const cleanState = {};
            Object.keys(storeState).forEach(prop => {
              if (typeof storeState[prop] !== 'function') {
                cleanState[prop] = storeState[prop];
              }
            });
            result.stores[key] = cleanState;
          } catch (e) {
            console.error(`Erreur lors de la capture du store ${key}:`, e);
          }
        }
      });
      result.debug.method = 'manual';
    } else {
      result.debug.error = 'Aucun store trouvé';
    }

    // Capturer TOUT le localStorage pour debug
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key) {
        try {
          const value = window.localStorage.getItem(key);
          // Essayer de parser en JSON
          try {
            result.localStorage[key] = JSON.parse(value);
          } catch {
            // Si ce n'est pas du JSON, garder comme string
            result.localStorage[key] = value;
          }
        } catch (e) {
          console.error(`Erreur localStorage pour ${key}:`, e);
        }
      }
    }

    // Vérifier spécifiquement les stores persist de Zustand
    const persistKeys = ['irim-notes-store', 'irim-projects-store'];
    result.debug.zustandPersist = {};

    persistKeys.forEach(key => {
      const value = window.localStorage.getItem(key);
      if (value) {
        try {
          result.debug.zustandPersist[key] = JSON.parse(value);
        } catch {
          result.debug.zustandPersist[key] = 'Present but not parseable';
        }
      }
    })

    // Debug info
    result.debug.storeKeys = window.__ZUSTAND_STORES__ ? Object.keys(window.__ZUSTAND_STORES__) : [];
    result.debug.localStorageKeys = Object.keys(result.localStorage);

    return result;
  });
}

/**
 * Naviguer et capturer chaque room
 */
async function captureRooms(page, captureDir) {
  const roomCaptures = {};

  // Fonction helper pour cliquer sur une flèche
  const clickArrow = async (direction) => {
    // Essayer différents sélecteurs possibles
    const selectors = [
      `button[aria-label="Navigate ${direction}"]`,
      `button[title="Navigate ${direction}"]`,
      `[aria-label="Navigate ${direction}"]`,
      `button img[alt="Arrow ${direction}"]`,
      `.navigation-arrow-${direction}`,
      `button:has(img[alt="Arrow ${direction}"])`
    ];

    for (const selector of selectors) {
      try {
        const element = await page.$(selector);
        if (element) {
          await element.click();
          return true;
        }
      } catch (e) {
        // Continuer avec le prochain sélecteur
      }
    }
    console.log(`    ⚠️ Impossible de cliquer sur la flèche ${direction}`);
    return false;
  };

  // STRATÉGIE DE NAVIGATION LINÉAIRE
  // On commence par aller en haut à gauche (room1 = 0,0)
  // puis on parcourt ligne par ligne

  console.log('  🎯 Navigation vers le point de départ (room1 - coin haut-gauche)...');

  // 1. D'abord aller tout en haut (plusieurs fois pour être sûr)
  for (let i = 0; i < 3; i++) {
    await clickArrow('up');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // 2. Puis tout à gauche
  for (let i = 0; i < 4; i++) {
    await clickArrow('left');
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  // On est maintenant à room1 (0,0)
  let currentRoomNumber = 1;

  // PARCOURS LINÉAIRE DE LA GRILLE
  // Ligne 0 (y=0): room1 -> room4
  console.log('  📸 --- Ligne 0 (y=0) ---');

  // Room 1 (0,0) - on y est déjà
  console.log(`  📸 Capture de room${currentRoomNumber} (0,0)...`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  await captureRoom(page, captureDir, currentRoomNumber, 0, 0);
  currentRoomNumber++;

  // Aller à droite 3 fois pour rooms 2, 3, 4
  for (let x = 1; x <= 3; x++) {
    await clickArrow('right');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`  📸 Capture de room${currentRoomNumber} (${x},0)...`);
    await captureRoom(page, captureDir, currentRoomNumber, x, 0);
    currentRoomNumber++;
  }

  // Ligne 1 (y=1): room5 -> room8
  console.log('  📸 --- Ligne 1 (y=1) ---');

  // Descendre d'une ligne
  await clickArrow('down');
  await new Promise(resolve => setTimeout(resolve, 800));

  // Room 8 (3,1) - on y est déjà
  console.log(`  📸 Capture de room${currentRoomNumber + 3} (3,1)...`);
  await captureRoom(page, captureDir, currentRoomNumber + 3, 3, 1);

  // Aller à gauche 3 fois pour rooms 7, 6, 5
  for (let x = 2; x >= 0; x--) {
    await clickArrow('left');
    await new Promise(resolve => setTimeout(resolve, 800));
    const roomNum = 5 + x; // room7, room6, room5
    console.log(`  📸 Capture de room${roomNum} (${x},1)...`);
    await captureRoom(page, captureDir, roomNum, x, 1);
  }
  currentRoomNumber = 9; // On continue à room9

  // Ligne 2 (y=2): room9 -> room12
  console.log('  📸 --- Ligne 2 (y=2) ---');

  // Descendre d'une ligne
  await clickArrow('down');
  await new Promise(resolve => setTimeout(resolve, 800));

  // Room 9 (0,2) - on y est déjà
  console.log(`  📸 Capture de room${currentRoomNumber} (0,2)...`);
  await captureRoom(page, captureDir, currentRoomNumber, 0, 2);
  currentRoomNumber++;

  // Aller à droite 3 fois pour rooms 10, 11, 12
  for (let x = 1; x <= 3; x++) {
    await clickArrow('right');
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log(`  📸 Capture de room${currentRoomNumber} (${x},2)...`);
    await captureRoom(page, captureDir, currentRoomNumber, x, 2);
    currentRoomNumber++;
  }

  // Retour des captures
  for (let i = 1; i <= 12; i++) {
    const roomData = roomCaptures[`room${i}`];
    if (roomData) {
      roomCaptures[`room${i}`] = roomData;
    }
  }

  return roomCaptures;

  // Fonction interne pour capturer une room
  async function captureRoom(page, captureDir, roomNumber, x, y) {
    try {
      const roomId = `room${roomNumber}`;

      // Screenshot
      const screenshotPath = path.join(captureDir, 'screenshots', `${roomId}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: false
      });

      // Capturer l'état et les métadonnées de la room actuelle
      const roomData = await page.evaluate((roomInfo) => {
        // Récupérer le nom actuel de la room depuis le DOM ou les stores
        let currentRoomName = 'unknown';

        // Essayer de récupérer le nom depuis le DOM
        const roomTitle = document.querySelector('[data-room-name], .room-title, h1, h2');
        if (roomTitle) {
          currentRoomName = roomTitle.textContent.trim();
        }

        // Récupérer les notes si disponibles
        const notesStore = window.__ZUSTAND_STORES__?.notes;
        let notes = '';
        if (notesStore) {
          const state = notesStore.getState();
          // On ne sait pas quel nom de room est utilisé, donc on récupère tout
          notes = state.roomNotes || {};
        }

        return {
          position: { x: roomInfo.x, y: roomInfo.y },
          id: `room${roomInfo.number}`,
          detectedName: currentRoomName,
          notes: notes,
          timestamp: new Date().toISOString()
        };
      }, { x, y, number: roomNumber });

      roomCaptures[roomId] = {
        screenshot: `screenshots/${roomId}.png`,
        position: `(${x},${y})`,
        data: roomData
      };

    } catch (error) {
      console.warn(`    ⚠️  Erreur pour room${roomNumber}:`, error.message);
    }
  }
}

/**
 * Collecter les métriques du code
 */
async function collectCodeMetrics() {
  const metrics = {
    files: {},
    components: [],
    totals: {}
  };

  try {
    // Compter les fichiers
    const { stdout: jsxList } = await execPromise('find src -name "*.jsx" -type f');
    const { stdout: jsList } = await execPromise('find src -name "*.js" -type f');

    metrics.files.jsx = jsxList.trim().split('\n').filter(Boolean);
    metrics.files.js = jsList.trim().split('\n').filter(Boolean);

    // Analyser les composants
    const componentsDir = path.join(__dirname, '..', 'src', 'components');
    if (await fs.pathExists(componentsDir)) {
      const scanDir = async (dir, category = '') => {
        const items = await fs.readdir(dir);
        for (const item of items) {
          const fullPath = path.join(dir, item);
          const stat = await fs.stat(fullPath);
          if (stat.isDirectory()) {
            const componentFile = path.join(fullPath, `${item}.jsx`);
            if (await fs.pathExists(componentFile)) {
              metrics.components.push({
                name: item,
                category: category || path.basename(dir),
                path: path.relative(process.cwd(), componentFile)
              });
            }
            // Récursif pour les sous-dossiers
            if (item === 'rooms' || item === 'common' || item === 'layout') {
              await scanDir(fullPath, item);
            }
          }
        }
      };
      await scanDir(componentsDir);
    }

    // Totaux
    metrics.totals = {
      jsx: metrics.files.jsx.length,
      js: metrics.files.js.length,
      total: metrics.files.jsx.length + metrics.files.js.length,
      components: metrics.components.length
    };

  } catch (error) {
    console.warn('⚠️  Erreur lors de la collecte des métriques:', error.message);
  }

  return metrics;
}

/**
 * Fonction principale
 */
async function captureState() {
  console.log('🚀 Capture d\'état complète IRIMMetaBrain\n');
  console.log(`📍 URL: ${APP_URL}\n`);

  // Créer le dossier de capture
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
  const captureDir = path.join(CAPTURES_DIR, timestamp);
  await fs.ensureDir(path.join(captureDir, 'screenshots'));

  console.log(`📁 Dossier: captures/${timestamp}\n`);

  // Lancer Puppeteer
  console.log('🌐 Lancement du navigateur...');
  const isDebugMode = process.env.DEBUG === 'true' || process.argv.includes('--debug');

  const browser = await puppeteer.launch({
    headless: !isDebugMode,  // Mode visuel si debug
    defaultViewport: {
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2
    },
    args: isDebugMode ? ['--window-size=1920,1080'] : []
  });

  if (isDebugMode) {
    console.log('  🔍 Mode debug activé - Navigation visible');
  }

  try {
    const page = await browser.newPage();

    // Injection de helpers pour le debug
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('  ⚠️  Erreur console:', msg.text());
      }
    });

    console.log('🔗 Connexion à l\'application...');
    await page.goto(APP_URL);

    const appReady = await waitForApp(page);
    if (!appReady) {
      throw new Error('Application non disponible');
    }

    console.log('✅ Application prête\n');

    // 1. Capturer l'état global
    console.log('💾 Capture de l\'état Zustand...');
    const globalState = await captureZustandState(page);
    await fs.writeJson(
      path.join(captureDir, 'state.json'),
      globalState,
      { spaces: 2 }
    );
    console.log('  ✓ État capturé\n');

    // 2. Capturer chaque room
    console.log('📸 Capture des rooms...');
    const roomCaptures = await captureRooms(page, captureDir);
    await fs.writeJson(
      path.join(captureDir, 'rooms.json'),
      roomCaptures,
      { spaces: 2 }
    );
    console.log('  ✓ Toutes les rooms capturées\n');

    // 3. Collecter les métriques
    console.log('📊 Collecte des métriques...');
    const metrics = await collectCodeMetrics();
    await fs.writeJson(
      path.join(captureDir, 'metrics.json'),
      metrics,
      { spaces: 2 }
    );
    console.log(`  ✓ ${metrics.totals.total} fichiers, ${metrics.totals.components} composants\n`);

    // 4. Générer le rapport
    const report = {
      id: timestamp,
      timestamp: new Date().toISOString(),
      summary: {
        roomsCaptured: Object.keys(roomCaptures).length,
        storesFound: Object.keys(globalState.stores).length,
        totalFiles: metrics.totals.total,
        components: metrics.totals.components
      },
      captures: {
        state: 'state.json',
        rooms: 'rooms.json',
        metrics: 'metrics.json',
        screenshots: 'screenshots/'
      }
    };

    await fs.writeJson(
      path.join(captureDir, 'report.json'),
      report,
      { spaces: 2 }
    );

    // 5. Générer un README avec mapping des rooms
    const roomsList = Object.entries(roomCaptures).map(([roomId, capture]) => {
      const detectedName = capture.data?.detectedName || 'unknown';
      const position = capture.position;
      return `- **${roomId}** ${position}: ${detectedName} - ![${roomId}](screenshots/${roomId}.png)`;
    }).join('\n');

    const readme = `# 📸 Capture ${timestamp}

## 📊 Résumé
- **Date**: ${new Date().toLocaleString('fr-FR')}
- **Rooms capturées**: ${report.summary.roomsCaptured}
- **Stores Zustand**: ${report.summary.storesFound}
- **Fichiers totaux**: ${report.summary.totalFiles}
- **Composants**: ${report.summary.components}

## 📁 Contenu
- \`state.json\`: État complet des stores Zustand
- \`rooms.json\`: État et screenshots de chaque room (room1 à room12)
- \`metrics.json\`: Métriques du code
- \`screenshots/\`: Captures d'écran numérotées par position

## 🗺️ Mapping des Rooms
Grille 4x3 (x,y) - Numérotation de gauche à droite, ligne par ligne:

### Ligne 0 (y=0)
- room1 (0,0) | room2 (1,0) | room3 (2,0) | room4 (3,0)

### Ligne 1 (y=1)
- room5 (0,1) | room6 (1,1) | room7 (2,1) | room8 (3,1)

### Ligne 2 (y=2)
- room9 (0,2) | room10 (1,2) | room11 (2,2) | room12 (3,2)

## 🖼️ Screenshots avec positions
${roomsList}

---
*Capturé automatiquement - Les rooms sont numérotées par position pour rester indépendant des changements de noms*
`;

    await fs.writeFile(
      path.join(captureDir, 'README.md'),
      readme
    );

    // Mettre à jour l'index des captures automatiquement
    const capturesIndexPath = path.join(CAPTURES_DIR, 'captures-index.json');
    let capturesIndex = { captures: [] };

    // Charger l'index existant
    if (await fs.pathExists(capturesIndexPath)) {
      capturesIndex = await fs.readJson(capturesIndexPath);
    }

    // Ajouter la nouvelle capture
    if (!capturesIndex.captures.includes(timestamp)) {
      capturesIndex.captures.unshift(timestamp); // Plus récent en premier
      capturesIndex.captures = capturesIndex.captures.slice(0, 20); // Max 20
    }

    capturesIndex.latest = timestamp;
    capturesIndex.updated = new Date().toISOString();
    capturesIndex.total = capturesIndex.captures.length;

    await fs.writeJson(capturesIndexPath, capturesIndex, { spaces: 2 });

    console.log('✅ Capture complète terminée!');
    console.log(`\n📁 Résultats dans: ${captureDir}`);
    console.log(`\n💡 Astuce: Ouvre captures/viewer.html pour voir toutes les captures\n`);

  } catch (error) {
    console.error('❌ Erreur:', error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Gérer les arguments CLI
const args = process.argv.slice(2);
if (args.includes('--help')) {
  console.log(`
📸 Capture d'état IRIMMetaBrain

Usage: node scripts/capture-state.js [options]

Options:
  --help     Afficher cette aide
  --url URL  Spécifier l'URL de l'app (défaut: http://localhost:5173)

Exemples:
  node scripts/capture-state.js
  node scripts/capture-state.js --url http://localhost:3000
  `);
  process.exit(0);
}

if (args.includes('--url')) {
  const urlIndex = args.indexOf('--url');
  if (args[urlIndex + 1]) {
    process.env.APP_URL = args[urlIndex + 1];
  }
}

// Lancer la capture
captureState().catch(error => {
  console.error('❌ Échec de la capture:', error);
  process.exit(1);
});