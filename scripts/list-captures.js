#!/usr/bin/env node

/**
 * Script simple pour lister les captures existantes
 * Met à jour viewer.html automatiquement
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CAPTURES_DIR = path.join(__dirname, '..', 'captures');
const VIEWER_PATH = path.join(CAPTURES_DIR, 'viewer.html');

// Lister les dossiers de capture
const items = fs.readdirSync(CAPTURES_DIR);
const captures = items.filter(item => {
    const fullPath = path.join(CAPTURES_DIR, item);
    return fs.statSync(fullPath).isDirectory() &&
           /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/.test(item);
}).sort().reverse(); // Plus récent en premier

console.log(`\n📸 Captures trouvées: ${captures.length}`);
captures.forEach(c => console.log(`  - ${c}`));

// Mettre à jour viewer.html
if (fs.existsSync(VIEWER_PATH)) {
    let html = fs.readFileSync(VIEWER_PATH, 'utf-8');

    // Créer la nouvelle liste
    const capturesList = captures.map(c => `                    '${c}'`).join(',\n');

    // Remplacer dans le HTML
    html = html.replace(
        /const knownCaptures = \[[^\]]*\]/s,
        `const knownCaptures = [\n${capturesList}\n                    // Ajoute tes nouvelles captures ici\n                ]`
    );

    fs.writeFileSync(VIEWER_PATH, html);
    console.log('\n✅ viewer.html mis à jour !');
} else {
    console.log('\n⚠️  viewer.html non trouvé');
}

// Créer aussi un index.json pour référence
const indexPath = path.join(CAPTURES_DIR, 'captures-index.json');
const index = {
    captures: captures,
    total: captures.length,
    latest: captures[0],
    updated: new Date().toISOString()
};

fs.writeFileSync(indexPath, JSON.stringify(index, null, 2));
console.log('✅ captures-index.json créé');