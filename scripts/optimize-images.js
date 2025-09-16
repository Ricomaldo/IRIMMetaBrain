#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration pour l'optimisation web
const WEB_CONFIG = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 85,
  outputDir: 'optimized'
};

// Vérifier si ImageMagick est installé
function checkImageMagick() {
  try {
    execSync('convert -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ ImageMagick n\'est pas installé. Veuillez l\'installer avec:');
    console.error('   brew install imagemagick');
    return false;
  }
}

// Optimiser une image
function optimizeImage(inputPath, outputPath) {
  try {
    const command = `convert "${inputPath}" -resize "${WEB_CONFIG.maxWidth}x${WEB_CONFIG.maxHeight}>" -quality ${WEB_CONFIG.quality} -strip "${outputPath}"`;
    execSync(command, { stdio: 'pipe' });
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de l'optimisation de ${inputPath}:`, error.message);
    return false;
  }
}

// Obtenir la taille d'un fichier
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return stats.size;
}

// Formater la taille en MB
function formatSize(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

// Fonction principale
function main() {
  console.log('🖼️  Optimisation des images pour le web...\n');

  if (!checkImageMagick()) {
    process.exit(1);
  }

  // Récupérer le dossier à traiter depuis les arguments de ligne de commande
  const targetFolder = process.argv[2] || 'sandbox';
  const imagesDir = path.join(__dirname, '..', 'src', 'assets', 'images', targetFolder);
  const outputDir = path.join(imagesDir, WEB_CONFIG.outputDir);

  // Créer le dossier de sortie
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`📁 Dossier de sortie créé: ${outputDir}`);
  }

  // Vérifier que le dossier existe
  if (!fs.existsSync(imagesDir)) {
    console.log(`❌ Le dossier ${imagesDir} n'existe pas`);
    return;
  }

  // Lire tous les fichiers JPG
  const files = fs.readdirSync(imagesDir)
    .filter(file => file.toLowerCase().endsWith('.jpg'))
    .filter(file => !file.includes('optimized'));

  if (files.length === 0) {
    console.log(`❌ Aucune image JPG trouvée dans le dossier ${targetFolder}`);
    return;
  }

  console.log(`📊 ${files.length} images trouvées à optimiser\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let successCount = 0;

  files.forEach((file, index) => {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(outputDir, file);

    console.log(`[${index + 1}/${files.length}] Optimisation de ${file}...`);

    const originalSize = getFileSize(inputPath);
    totalOriginalSize += originalSize;

    if (optimizeImage(inputPath, outputPath)) {
      const optimizedSize = getFileSize(outputPath);
      totalOptimizedSize += optimizedSize;
      successCount++;

      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`   ✅ ${formatSize(originalSize)} → ${formatSize(optimizedSize)} (${reduction}% de réduction)`);
    } else {
      console.log(`   ❌ Échec de l'optimisation`);
    }
  });

  console.log('\n📈 Résumé de l\'optimisation:');
  console.log(`   Images traitées: ${successCount}/${files.length}`);
  console.log(`   Taille totale originale: ${formatSize(totalOriginalSize)}`);
  console.log(`   Taille totale optimisée: ${formatSize(totalOptimizedSize)}`);
  
  if (totalOriginalSize > 0) {
    const totalReduction = ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize * 100).toFixed(1);
    console.log(`   Réduction totale: ${totalReduction}%`);
    console.log(`   Économie: ${formatSize(totalOriginalSize - totalOptimizedSize)}`);
  }

  console.log(`\n📁 Images optimisées sauvegardées dans: ${outputDir}`);
  console.log('\n💡 Pour utiliser ces images optimisées, remplacez les chemins dans votre code par:');
  console.log(`   src/assets/images/${targetFolder}/optimized/[nom-image].jpg`);
}

// Exécuter le script
main();
