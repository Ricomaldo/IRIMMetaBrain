/**
 * Script à exécuter dans la console du navigateur pour exporter le localStorage
 *
 * 1. Ouvre http://localhost:5173 dans ton navigateur
 * 2. Ouvre la console (F12)
 * 3. Copie-colle ce script et appuie sur Entrée
 * 4. Le fichier sera téléchargé automatiquement
 */

(function exportLocalStorage() {
  const data = {};

  // Récupérer tout le localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    try {
      data[key] = JSON.parse(value);
    } catch {
      data[key] = value;
    }
  }

  // Ajouter les métadonnées
  const exportData = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    data: data,
    stats: {
      totalKeys: Object.keys(data).length,
      zustandStores: Object.keys(data).filter(k => k.includes('irim')).length
    }
  };

  // Créer le blob et télécharger
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `localStorage-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  console.log('✅ LocalStorage exporté !');
  console.log('📊 Stats:', exportData.stats);
  console.log('📦 Données:', data);

  return exportData;
})();