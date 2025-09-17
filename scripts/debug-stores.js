#!/usr/bin/env node

/**
 * Debug direct des stores et localStorage
 */

import puppeteer from 'puppeteer';

const APP_URL = 'http://localhost:5173';

async function debugStores() {
  console.log('🔍 Debug complet des stores et localStorage\n');

  const browser = await puppeteer.launch({
    headless: false,
    devtools: true, // Ouvre les DevTools
    defaultViewport: null,
    args: ['--window-size=1920,1080']
  });

  try {
    const page = await browser.newPage();

    console.log('📍 Connexion à', APP_URL);
    await page.goto(APP_URL);

    // Attendre le chargement complet
    await page.waitForSelector('#root', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 1. TOUT le localStorage
    console.log('\n=== LOCALSTORAGE COMPLET ===');
    const localStorageData = await page.evaluate(() => {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        try {
          data[key] = JSON.parse(value);
        } catch {
          data[key] = value;
        }
      }
      return data;
    });

    Object.entries(localStorageData).forEach(([key, value]) => {
      console.log(`\n📦 ${key}:`);
      if (typeof value === 'object') {
        console.log(JSON.stringify(value, null, 2));
      } else {
        console.log(value);
      }
    });

    // 2. Stores Zustand via console
    console.log('\n=== STORES ZUSTAND ===');
    const storesData = await page.evaluate(() => {
      const results = {};

      // Méthode 1: Via __ZUSTAND_STORES__
      if (window.__ZUSTAND_STORES__) {
        console.log('✅ __ZUSTAND_STORES__ trouvé');
        Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
          const store = window.__ZUSTAND_STORES__[key];
          if (store && store.getState) {
            const state = store.getState();
            results[key] = {
              method: '__ZUSTAND_STORES__',
              state: state
            };
          }
        });
      }

      // Méthode 2: Chercher dans window
      Object.keys(window).forEach(key => {
        if (key.includes('store') || key.includes('Store')) {
          results[`window.${key}`] = window[key];
        }
      });

      return results;
    });

    console.log('Stores trouvés:', JSON.stringify(storesData, null, 2));

    // 3. Tester l'accès direct au store
    console.log('\n=== TEST ACCÈS DIRECT ===');
    const directAccess = await page.evaluate(() => {
      const tests = {};

      // Test 1: localStorage direct
      const notesKey = 'irim-notes-store';
      const projectKey = 'project-store';
      const todoKey = 'todo-store';

      [notesKey, projectKey, todoKey].forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          tests[`localStorage.${key}`] = {
            exists: true,
            length: value.length,
            sample: value.substring(0, 200)
          };
        } else {
          tests[`localStorage.${key}`] = { exists: false };
        }
      });

      // Test 2: Zustand DevTools
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        tests.reactDevTools = true;
      }

      return tests;
    });

    console.log('Tests accès direct:', JSON.stringify(directAccess, null, 2));

    // 4. Injecter un script pour accéder aux stores React
    console.log('\n=== INJECTION REACT ===');
    await page.evaluate(() => {
      // Logger tout dans la console pour debug
      console.log('🔍 Recherche des stores React...');

      // Chercher les fibres React
      const rootElement = document.getElementById('root');
      if (rootElement && rootElement._reactRootContainer) {
        console.log('✅ React Root trouvé');

        // Essayer de récupérer les hooks
        const fiber = rootElement._reactRootContainer._internalRoot?.current;
        if (fiber) {
          console.log('✅ Fiber trouvé:', fiber);
        }
      }

      // Logger les stores disponibles
      if (window.__ZUSTAND_STORES__) {
        console.log('📦 Stores Zustand disponibles:');
        Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
          const store = window.__ZUSTAND_STORES__[key];
          const state = store.getState();
          console.log(`  - ${key}:`, state);
        });
      }

      // Logger le localStorage
      console.log('💾 localStorage:');
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        console.log(`  - ${key}:`, localStorage.getItem(key));
      }
    });

    // 5. Attendre et capturer les logs console
    console.log('\n=== CONSOLE LOGS (voir le navigateur) ===');
    console.log('👁️  Regarde la console du navigateur pour plus de détails');
    console.log('📝 Tu peux aussi exécuter manuellement dans la console:');
    console.log('    localStorage.getItem("irim-notes-store")');
    console.log('    window.__ZUSTAND_STORES__');
    console.log('    window.__DEBUG_STORES__()');

    // Garder ouvert pour debug manuel
    console.log('\n⏸️  Browser restera ouvert. Appuie sur Ctrl+C pour fermer.');
    await new Promise(() => {}); // Attendre indéfiniment

  } catch (error) {
    console.error('❌ Erreur:', error);
  }
}

debugStores().catch(console.error);