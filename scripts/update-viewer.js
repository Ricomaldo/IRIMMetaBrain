#!/usr/bin/env node

/**
 * Script pour mettre à jour le viewer HTML avec la liste des captures
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CAPTURES_DIR = path.join(__dirname, '..', 'captures');
const VIEWER_PATH = path.join(CAPTURES_DIR, 'viewer.html');

async function updateViewer() {
  console.log('📸 Mise à jour du viewer...\n');

  // Lister tous les dossiers de captures
  const items = await fs.readdir(CAPTURES_DIR);
  const captures = [];

  for (const item of items) {
    const itemPath = path.join(CAPTURES_DIR, item);
    const stat = await fs.stat(itemPath);

    // Vérifier si c'est un dossier de capture (format timestamp)
    if (stat.isDirectory() && item.match(/^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/)) {
      console.log(`  ✓ Capture trouvée: ${item}`);
      captures.push(item);
    }
  }

  // Trier par date décroissante
  captures.sort().reverse();

  console.log(`\n📊 Total: ${captures.length} captures\n`);

  // Mettre à jour le viewer.html
  if (await fs.pathExists(VIEWER_PATH)) {
    let html = await fs.readFile(VIEWER_PATH, 'utf-8');

    // Remplacer la liste des captures connues
    const newList = captures.map(c => `                    '${c}'`).join(',\n');
    html = html.replace(
      /const knownCaptures = \[[\s\S]*?\];/,
      `const knownCaptures = [\n${newList}\n                ];`
    );

    await fs.writeFile(VIEWER_PATH, html);
    console.log('✅ Viewer mis à jour !');
  } else {
    console.log('❌ Viewer non trouvé');
  }

  // Créer aussi un captures-index.json pour un accès plus facile
  const indexPath = path.join(CAPTURES_DIR, 'captures-index.json');
  const index = {
    captures: captures,
    lastUpdated: new Date().toISOString(),
    total: captures.length
  };

  await fs.writeJson(indexPath, index, { spaces: 2 });
  console.log('✅ Index JSON créé (captures-index.json)');
}

updateViewer().catch(console.error);