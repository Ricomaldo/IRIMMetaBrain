#!/usr/bin/env node

/**
 * Script de test pour vérifier l'exposition des stores
 * Usage: node scripts/test-stores.js
 */

import puppeteer from 'puppeteer';

const APP_URL = 'http://localhost:5173';

async function testStores() {
  console.log('🔍 Test des stores Zustand\n');

  const browser = await puppeteer.launch({
    headless: false, // Pour voir ce qui se passe
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();

    // Activer les logs de la console
    page.on('console', msg => {
      if (msg.type() === 'log' || msg.type() === 'info') {
        console.log('  Console:', msg.text());
      }
    });

    console.log('📍 Connexion à', APP_URL);
    await page.goto(APP_URL);

    // Attendre que l'app soit chargée
    await page.waitForSelector('#root', { timeout: 10000 });
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('\n📊 Test de l\'exposition des stores:');

    // Tester l'état
    const storeInfo = await page.evaluate(() => {
      const info = {
        hasZustandStores: false,
        stores: {},
        localStorage: {},
        navigation: null
      };

      // Vérifier __ZUSTAND_STORES__
      if (window.__ZUSTAND_STORES__) {
        info.hasZustandStores = true;
        Object.keys(window.__ZUSTAND_STORES__).forEach(key => {
          const store = window.__ZUSTAND_STORES__[key];
          if (store && typeof store.getState === 'function') {
            const state = store.getState();
            // Compter les propriétés
            const props = Object.keys(state);
            const dataProps = props.filter(p => typeof state[p] !== 'function');
            const funcProps = props.filter(p => typeof state[p] === 'function');

            info.stores[key] = {
              totalProps: props.length,
              dataProps: dataProps.length,
              funcProps: funcProps.length,
              data: {}
            };

            // Capturer uniquement les données
            dataProps.forEach(prop => {
              info.stores[key].data[prop] = state[prop];
            });
          }
        });
      }

      // Vérifier localStorage
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes('irim')) {
          try {
            info.localStorage[key] = JSON.parse(localStorage.getItem(key));
          } catch {
            info.localStorage[key] = localStorage.getItem(key);
          }
        }
      }

      // Vérifier navigation
      if (window.__NAVIGATION__) {
        info.navigation = {
          present: true,
          currentRoom: window.__NAVIGATION__.currentRoom
        };
      }

      return info;
    });

    // Afficher les résultats
    if (storeInfo.hasZustandStores) {
      console.log('✅ window.__ZUSTAND_STORES__ trouvé');

      Object.entries(storeInfo.stores).forEach(([name, info]) => {
        console.log(`\n  📦 Store: ${name}`);
        console.log(`     - Total props: ${info.totalProps}`);
        console.log(`     - Data props: ${info.dataProps}`);
        console.log(`     - Func props: ${info.funcProps}`);
        console.log(`     - Data:`, JSON.stringify(info.data, null, 2).split('\n').map(l => '       ' + l).join('\n'));
      });
    } else {
      console.log('❌ window.__ZUSTAND_STORES__ non trouvé');
    }

    if (Object.keys(storeInfo.localStorage).length > 0) {
      console.log('\n💾 LocalStorage (clés irim):');
      Object.entries(storeInfo.localStorage).forEach(([key, value]) => {
        console.log(`  - ${key}:`, JSON.stringify(value, null, 2).split('\n').map(l => '    ' + l).join('\n'));
      });
    } else {
      console.log('\n⚠️  Aucune donnée localStorage avec "irim"');
    }

    if (storeInfo.navigation?.present) {
      console.log('\n🧭 Navigation:', storeInfo.navigation.currentRoom);
    }

    // Tester l'ajout de données
    console.log('\n🧪 Test d\'ajout de données:');
    const testResult = await page.evaluate(() => {
      try {
        if (window.__ZUSTAND_STORES__?.notes) {
          const store = window.__ZUSTAND_STORES__.notes;
          const state = store.getState();

          // Ajouter une note de test
          if (state.updateRoomNote) {
            state.updateRoomNote('atelier', 'Note de test depuis script');
            return {
              success: true,
              newState: store.getState().roomNotes?.atelier
            };
          }
        }
        return { success: false, error: 'Store ou fonction non trouvé' };
      } catch (e) {
        return { success: false, error: e.message };
      }
    });

    if (testResult.success) {
      console.log('  ✅ Note ajoutée avec succès');
      console.log('  📝 Nouvelle valeur:', testResult.newState);
    } else {
      console.log('  ❌ Échec:', testResult.error);
    }

    console.log('\n✨ Test terminé! Fermeture dans 5 secondes...');
    await new Promise(resolve => setTimeout(resolve, 5000));

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await browser.close();
  }
}

testStores().catch(console.error);