#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Récupération du texte (arg ou stdin)
const args = process.argv.slice(2);
const text = args.join(' ').trim();

if (!text) {
  console.error('Usage: npm run doc:capture "Votre note ici"');
  process.exit(1);
}

// Date et heure
const now = new Date();
const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD
const timeStr = now.toTimeString().slice(0, 5);   // HH:MM

// Fichier devlog du jour
const devlogDir = path.join(process.cwd(), 'devlog');
const devlogFile = path.join(devlogDir, `${dateStr}.md`);

// Créer le dossier si nécessaire
if (!fs.existsSync(devlogDir)) {
  fs.mkdirSync(devlogDir, { recursive: true });
}

// Créer le fichier avec header si inexistant
if (!fs.existsSync(devlogFile)) {
  const header = `# DevLog - ${dateStr}\n\n`;
  fs.writeFileSync(devlogFile, header);
  console.log(`✨ Nouveau devlog créé: ${dateStr}.md`);
}

// Extraire un titre (premiers mots ou "Note")
const title = text.split(' ').slice(0, 5).join(' ') +
              (text.split(' ').length > 5 ? '...' : '');

// Formater l'entrée
const entry = `\n## ${timeStr} - ${title}\n\n${text}\n`;

// Ajouter au fichier
fs.appendFileSync(devlogFile, entry);

console.log(`📝 Capturé dans devlog/${dateStr}.md à ${timeStr}`);
console.log(`   "${title.slice(0, 40)}..."`);