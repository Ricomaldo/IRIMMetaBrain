#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(process.cwd(), 'docs');

// Scanner récursivement les fichiers .md
function scanDocs(dir, baseDir = '') {
  const files = {};

  if (!fs.existsSync(dir)) return files;

  fs.readdirSync(dir).forEach(item => {
    const fullPath = path.join(dir, item);
    const relativePath = path.join(baseDir, item);

    if (fs.statSync(fullPath).isDirectory()) {
      Object.assign(files, scanDocs(fullPath, relativePath));
    } else if (item.endsWith('.md') && item !== 'README.md') {
      const content = fs.readFileSync(fullPath, 'utf8');
      const title = extractTitle(content) || item.replace('.md', '');
      const category = baseDir.split(path.sep)[0] || 'root';

      if (!files[category]) files[category] = [];
      files[category].push({
        path: relativePath,
        title: title,
        file: item
      });
    }
  });

  return files;
}

// Extraire le premier titre H1
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

// Générer le README
const docs = scanDocs(docsDir);
const categories = Object.keys(docs).sort();

let readme = `# 📚 Documentation IRIMMetaBrain

> Meta-cerveau spatial pour développeurs TDA/H

## Navigation

`;

// Sections par catégorie
categories.forEach(cat => {
  const catTitle = cat.charAt(0).toUpperCase() + cat.slice(1);
  readme += `### ${catTitle}\n\n`;

  docs[cat].forEach(doc => {
    readme += `- [${doc.title}](${doc.path})\n`;
  });

  readme += '\n';
});

// Footer avec commandes
readme += `---

## 🚀 Commandes rapides

\`\`\`bash
# Capturer une pensée
npm run doc:capture "Ma pensée brute"

# Promouvoir vers docs officiels
npm run doc:promote devlog/YYYY-MM-DD.md category/filename.md

# Régénérer cet index
npm run doc:index
\`\`\`
`;

// Écrire le README
fs.writeFileSync(path.join(docsDir, 'README.md'), readme);

console.log(`✨ Index généré: docs/README.md`);
console.log(`   ${categories.length} catégories, ${Object.values(docs).flat().length} documents`);