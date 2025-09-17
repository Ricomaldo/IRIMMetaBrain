#!/usr/bin/env node

/**
 * Script pour capturer avec import du localStorage existant
 */

import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_URL = 'http://localhost:5173';

async function captureWithLocalStorage() {
  console.log('🚀 Capture avec import du localStorage\n');

  // Vérifier si on a un export de localStorage
  const exportPath = path.join(__dirname, '..', 'localStorage-export.json');
  let localStorageData = null;

  if (await fs.pathExists(exportPath)) {
    console.log('✅ Export trouvé:', exportPath);
    localStorageData = await fs.readJson(exportPath);
    console.log(`  📊 ${localStorageData.stats.totalKeys} clés à importer`);
  } else {
    console.log('⚠️  Pas d\'export trouvé.');
    console.log('  💡 Pour créer un export:');
    console.log('     1. Ouvre http://localhost:5173 dans ton navigateur');
    console.log('     2. Ouvre la console (F12)');
    console.log('     3. Copie le contenu de scripts/export-localstorage.js');
    console.log('     4. Colle dans la console et appuie sur Entrée');
    console.log('     5. Sauvegarde le fichier téléchargé comme localStorage-export.json à la racine du projet');
  }

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();

    // Si on a des données, les injecter AVANT de naviguer
    if (localStorageData && localStorageData.data) {
      console.log('\n💾 Injection du localStorage...');

      // Naviguer d'abord vers l'URL pour avoir le bon domaine
      await page.goto(APP_URL);

      // Injecter le localStorage
      await page.evaluate((data) => {
        Object.entries(data).forEach(([key, value]) => {
          try {
            const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
            localStorage.setItem(key, stringValue);
            console.log(`  ✓ ${key} importé`);
          } catch (e) {
            console.error(`  ✗ Erreur pour ${key}:`, e);
          }
        });
      }, localStorageData.data);

      // Recharger pour que l'app charge les données
      console.log('  🔄 Rechargement de la page...');
      await page.reload();
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
    } else {
      await page.goto(APP_URL);
      await page.waitForSelector('#root', { timeout: 10000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    // Maintenant capturer l'état
    console.log('\n📸 Capture de l\'état...');
    const state = await page.evaluate(() => {
      const result = {
        stores: {},
        localStorage: {},
        timestamp: new Date().toISOString()
      };

      // Stores Zustand
      if (window.__GET_ALL_STATE__) {
        result.stores = window.__GET_ALL_STATE__();
      } else if (window.__ZUSTAND_STORES__) {
        Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
          const store = window.__ZUSTAND_STORES__[key];
          if (store && typeof store.getState === 'function') {
            const state = store.getState();
            const cleanState = {};
            Object.keys(state).forEach(prop => {
              if (typeof state[prop] !== 'function') {
                cleanState[prop] = state[prop];
              }
            });
            result.stores[key] = cleanState;
          }
        });
      }

      // localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
          result.localStorage[key] = JSON.parse(localStorage.getItem(key));
        } catch {
          result.localStorage[key] = localStorage.getItem(key);
        }
      }

      return result;
    });

    // Sauvegarder
    const outputPath = path.join(__dirname, '..', 'state-with-data.json');
    await fs.writeJson(outputPath, state, { spaces: 2 });

    console.log('\n✅ État capturé avec succès !');
    console.log('📁 Fichier:', outputPath);
    console.log('\n📊 Résumé:');
    console.log(`  - Stores: ${Object.keys(state.stores).join(', ')}`);
    console.log(`  - LocalStorage: ${Object.keys(state.localStorage).length} clés`);

    // Vérifier spécifiquement les notes
    if (state.stores.notes?.roomNotes) {
      const notesCount = Object.values(state.stores.notes.roomNotes).filter(n => n !== '').length;
      console.log(`  - Notes: ${notesCount} rooms avec du contenu`);
    }

    console.log('\n⏸️  Browser reste ouvert pour vérification. Ctrl+C pour fermer.');
    await new Promise(() => {});

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

captureWithLocalStorage().catch(console.error);