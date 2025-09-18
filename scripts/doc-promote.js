#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Arguments : source et destination
const [source, destination] = process.argv.slice(2);

if (!source || !destination) {
  console.error('Usage: npm run doc:promote <source> <category/filename.md>');
  console.error('Ex: npm run doc:promote devlog/2025-09-18.md architecture/new-pattern.md');
  process.exit(1);
}

// Chemins absolus
const sourcePath = path.resolve(process.cwd(), source);
const destPath = path.resolve(process.cwd(), 'docs', destination);
const destDir = path.dirname(destPath);

// Vérifier que la source existe
if (!fs.existsSync(sourcePath)) {
  console.error(`❌ Source introuvable: ${source}`);
  process.exit(1);
}

// Lire et nettoyer le contenu
let content = fs.readFileSync(sourcePath, 'utf8');

// Nettoyer les timestamps du devlog (format: ## HH:MM - )
content = content.replace(/^## \d{2}:\d{2} - .*$/gm, (match) => {
  const title = match.replace(/^## \d{2}:\d{2} - /, '## ');
  return title;
});

// Extraire la catégorie du chemin de destination
const category = destination.split('/')[0];

// Créer le front-matter
const today = new Date().toISOString().split('T')[0];
const frontMatter = `---
type: ${category}
updated: ${today}
---

`;

// Ajouter le front-matter si pas déjà présent
if (!content.startsWith('---')) {
  content = frontMatter + content;
}

// Créer le dossier destination si nécessaire
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Écrire le fichier
fs.writeFileSync(destPath, content);

console.log(`📚 Promu: ${source} → docs/${destination}`);
console.log(`   Category: ${category}`);

// Lancer l'indexation
console.log(`🔄 Mise à jour de l'index...`);
import('./doc-index.js');