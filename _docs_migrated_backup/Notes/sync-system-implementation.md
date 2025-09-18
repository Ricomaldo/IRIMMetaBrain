# Système de Synchronisation Multi-Device - Documentation

**Date d'implémentation :** 16 septembre 2025
**Version :** 1.0.0

## 📦 Architecture créée

### 1. **Service SyncManager** (`src/services/SyncManager.js`)
Service générique singleton pour la synchronisation chiffrée.

**Méthodes principales :**
- `configure(githubToken, gistId)` - Configure les credentials
- `setPassword(password)` - Définit le mot de passe de chiffrement
- `encrypt(data)` - Chiffre avec AES-256 + PBKDF2 (10k iterations)
- `decrypt(encryptedData)` - Déchiffre les données
- `uploadGist(data, encrypted)` - Upload vers GitHub Gist
- `downloadGist(gistId, encrypted)` - Download depuis GitHub Gist
- `testConnection()` - Vérifie la validité du token
- `listGists()` - Liste les Gists IRIM existants

**Sécurité :**
- AES-256 pour le chiffrement symétrique
- PBKDF2 avec 10000 iterations (dérivation de clé)
- Salt aléatoire pour chaque chiffrement
- IV aléatoire pour chaque bloc

### 2. **Système de modales** (`src/components/common/Modal/`)

**Composant Modal de base :**
- Utilise React Portal pour render au-dessus de tout
- Design aligné sur Tower System (metalBg + primaryLevel)
- Fermeture par Escape ou clic overlay
- Animations fadeIn + slideUp
- Tailles configurables : small, medium, large, fullscreen

**Hook useModal** (`src/hooks/useModal.js`) :
```javascript
const modal = useModal();
// modal.isOpen - état ouvert/fermé
// modal.open(data) - ouvrir avec données optionnelles
// modal.close() - fermer
// modal.toggle() - basculer
```

### 3. **SyncModal spécifique** (`src/components/modals/SyncModal/`)

Interface utilisateur pour la synchronisation :
- Configuration GitHub token
- Mot de passe de chiffrement
- Export/Import des stores
- Liste des Gists existants
- Messages de statut colorés (success/error/info)

### 4. **Intégration stores Zustand**

Ajout de `importData()` aux stores :
- `useNotesStore.importData(data)` - Remplace toutes les notes
- `useProjectsStore.importData(data)` - Remplace tous les projets

## 🔑 Configuration GitHub requise

### Personal Access Token
1. GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. **Scope requis :** `gist` (Create gists)
5. Expiration : 90 days recommandé

### Structure du Gist
```json
{
  "version": "1.0.0",
  "timestamp": "2025-09-16T10:00:00Z",
  "stores": {
    "notes": {
      "roomNotes": {...},
      "sideTowerNotes": {...}
    },
    "projects": {
      "projects": {...},
      "currentProjectId": "..."
    }
  }
}
```

## 🎨 Design System créé

### Styles Modal (`Modal.styles.js`)
- **Overlay** : `alpha(black, 0.6)` + `backdrop-filter: blur(8px)`
- **Container** : `metalBg` + `primaryLevel` du système Tower
- **Header** : `alpha(primary, 0.3)` avec titre uppercase
- **Content** : Scrollable avec custom scrollbar Tower-style
- **Footer** : Pour actions, aligné à droite

### Patterns réutilisables
```javascript
// Import du système
import Modal from 'components/common/Modal/Modal';
import useModal from 'hooks/useModal';

// Usage
const myModal = useModal();

<Modal
  isOpen={myModal.isOpen}
  onClose={myModal.close}
  title="Ma Modal"
  size="medium"
>
  {/* Contenu */}
</Modal>
```

## 🚀 Usage

### Export des données
1. Cliquer sur 🔄 dans ControlTower
2. Entrer GitHub token
3. Tester connexion
4. Entrer mot de passe (min 8 caractères)
5. Cliquer "Exporter vers GitHub"
6. L'ID du Gist est copié dans le presse-papier

### Import des données
1. Même processus initial
2. Entrer ou récupérer l'ID du Gist
3. Entrer le même mot de passe
4. Cliquer "Importer depuis GitHub"
5. Confirmer le remplacement des données locales

## 🔒 Sécurité

### Chiffrement
- **Algorithme** : AES-256-CBC
- **Dérivation de clé** : PBKDF2 avec 10000 iterations
- **Salt** : 128 bits aléatoire par chiffrement
- **IV** : 128 bits aléatoire par bloc

### Stockage
- GitHub Gist privé (non listé)
- Token stocké uniquement en mémoire (pas persisté)
- Mot de passe jamais stocké

## 📝 Notes d'apprentissage

### Concepts maîtrisés
1. **React Portals** - Render en dehors du flux DOM
2. **Singleton pattern** - Instance unique de service
3. **Chiffrement symétrique** - AES avec dérivation de clé
4. **GitHub API** - Gestion des Gists via API REST
5. **Custom hooks** - Logique réutilisable d'état

### Points d'attention
- Le token GitHub expire (90 jours par défaut)
- Le mot de passe n'est pas récupérable (pas de "forgot password")
- Les Gists ont une limite de 1MB par fichier
- La synchronisation écrase toutes les données locales

## 🔮 Évolutions V2 prévues

1. **Auto-sync périodique**
   - Sync automatique toutes les X minutes
   - Indicateur de statut de sync

2. **Conflict resolution**
   - Comparer timestamps
   - Merger intelligemment les changements

3. **Selective sync**
   - Choisir quels stores synchroniser
   - Sync par room/projet spécifique

4. **Multi-device tracking**
   - Identifier chaque device
   - Historique des sync par device

## 🐛 Debug

### Erreurs communes
- **"GitHub token not configured"** : Token non entré
- **"Wrong password?"** : Mot de passe incorrect pour déchiffrer
- **"401 Unauthorized"** : Token expiré ou invalide
- **"404 Not Found"** : Gist ID incorrect

### Console browser
```javascript
// Vérifier le service
console.log(window.SyncManager); // undefined = normal (pas exposé)

// Tester le chiffrement local
import SyncManager from './src/services/SyncManager';
const encrypted = SyncManager.encrypt({test: "data"}, "password123");
const decrypted = SyncManager.decrypt(encrypted, "password123");
console.log(decrypted); // {test: "data"}
```

---

**Implémenté par :** Claude + [Ton nom]
**Statut :** ✅ Fonctionnel et testé