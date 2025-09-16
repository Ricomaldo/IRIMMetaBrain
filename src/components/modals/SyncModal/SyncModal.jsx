// src/components/modals/SyncModal/SyncModal.jsx - Modal de synchronisation

import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import {
  SyncContainer,
  SyncSection,
  SyncTitle,
  SyncDescription,
  InputGroup,
  Label,
  Input,
  PasswordInput,
  ButtonGroup,
  ActionButton,
  StatusMessage,
  ConfigInfo,
  ConfigRow
} from './SyncModal.styles';
import SyncManager from '../../../services/SyncManager';
import useNotesStore from '../../../stores/useNotesStore';
import useProjectsStore from '../../../stores/useProjectsStore';

/**
 * SyncModal - Interface de synchronisation des stores
 *
 * Fonctionnalités:
 * - Configuration GitHub token et mot de passe
 * - Export/Import des stores chiffrés
 * - Feedback visuel des opérations
 * - Gestion des erreurs
 */
const SyncModal = ({ isOpen, onClose }) => {
  // États locaux pour l'UI
  const [githubToken, setGithubToken] = useState('');
  const [password, setPassword] = useState('');
  const [gistId, setGistId] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Récupération des stores
  const notesStore = useNotesStore();
  const projectsStore = useProjectsStore();

  // Helper pour afficher un message de statut
  const showStatus = (type, message) => {
    setStatus({ type, message });
    // Auto-clear après 5 secondes
    setTimeout(() => setStatus({ type: '', message: '' }), 5000);
  };

  // Test de connexion GitHub
  const handleTestConnection = async () => {
    if (!githubToken) {
      showStatus('error', '⚠️ Token GitHub requis');
      return;
    }

    setIsLoading(true);
    try {
      SyncManager.configure(githubToken);
      const isConnected = await SyncManager.testConnection();

      if (isConnected) {
        showStatus('success', '✅ Connexion GitHub OK');
      } else {
        showStatus('error', '❌ Token invalide ou expiré');
      }
    } catch (error) {
      showStatus('error', `❌ Erreur: ${error.message}`);
    }
    setIsLoading(false);
  };

  // Export vers GitHub Gist
  const handleExport = async () => {
    if (!githubToken) {
      showStatus('error', '⚠️ Token GitHub requis');
      return;
    }

    if (!password || password.length < 8) {
      showStatus('error', '⚠️ Mot de passe requis (min 8 caractères)');
      return;
    }

    setIsLoading(true);
    try {
      // Configurer le service
      SyncManager.configure(githubToken, gistId);
      SyncManager.setPassword(password);

      // Préparer les données des stores
      const storesData = {
        notes: {
          roomNotes: notesStore.roomNotes,
          sideTowerNotes: notesStore.sideTowerNotes
        },
        projects: {
          projects: projectsStore.projects,
          currentProjectId: projectsStore.currentProjectId
        }
      };

      // Upload vers GitHub
      const gistUrl = await SyncManager.uploadGist(storesData, true);

      // Sauvegarder l'ID du Gist pour futures mises à jour
      if (!gistId && SyncManager.gistId) {
        setGistId(SyncManager.gistId);
      }

      showStatus('success', `✅ Export réussi ! Gist: ${SyncManager.gistId}`);

      // Copier l'URL dans le clipboard
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(gistUrl);
        showStatus('success', '✅ Export réussi ! URL copiée dans le presse-papier');
      }
    } catch (error) {
      showStatus('error', `❌ Erreur export: ${error.message}`);
    }
    setIsLoading(false);
  };

  // Import depuis GitHub Gist
  const handleImport = async () => {
    if (!githubToken) {
      showStatus('error', '⚠️ Token GitHub requis');
      return;
    }

    if (!gistId) {
      showStatus('error', '⚠️ ID du Gist requis');
      return;
    }

    if (!password) {
      showStatus('error', '⚠️ Mot de passe requis pour déchiffrer');
      return;
    }

    setIsLoading(true);
    try {
      // Configurer le service
      SyncManager.configure(githubToken, gistId);
      SyncManager.setPassword(password);

      // Télécharger depuis GitHub
      const data = await SyncManager.downloadGist(gistId, true);

      // Confirmation avant d'écraser les données locales
      const confirm = window.confirm(
        `⚠️ Ceci va remplacer toutes vos données locales par celles du Gist.\n` +
        `Date de sync: ${data.timestamp}\n` +
        `Continuer ?`
      );

      if (!confirm) {
        showStatus('info', 'Import annulé');
        setIsLoading(false);
        return;
      }

      // Mettre à jour les stores
      if (data.stores.notes) {
        notesStore.importData(data.stores.notes);
      }

      if (data.stores.projects) {
        projectsStore.importData(data.stores.projects);
      }

      showStatus('success', '✅ Import réussi ! Données synchronisées');
    } catch (error) {
      showStatus('error', `❌ Erreur import: ${error.message}`);
    }
    setIsLoading(false);
  };

  // Liste des Gists existants
  const handleListGists = async () => {
    if (!githubToken) {
      showStatus('error', '⚠️ Token GitHub requis');
      return;
    }

    setIsLoading(true);
    try {
      SyncManager.configure(githubToken);
      const gists = await SyncManager.listGists();

      if (gists.length === 0) {
        showStatus('info', 'Aucun Gist IRIM trouvé');
      } else {
        const gistInfo = gists.map(g => `${g.id} (${g.updated_at})`).join('\n');
        showStatus('info', `Gists trouvés:\n${gistInfo}`);

        // Auto-remplir avec le premier Gist trouvé
        if (gists[0]) {
          setGistId(gists[0].id);
        }
      }
    } catch (error) {
      showStatus('error', `❌ Erreur: ${error.message}`);
    }
    setIsLoading(false);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="🔄 Synchronisation Multi-Device"
      size="large"
      variant="roomCanvas"
    >
      <SyncContainer>
        {/* Section Configuration */}
        <SyncSection>
          <SyncTitle>⚙️ Configuration</SyncTitle>
          <SyncDescription>
            Synchronisez vos données entre appareils via GitHub Gist chiffré
          </SyncDescription>

          <InputGroup>
            <Label>GitHub Personal Access Token</Label>
            <Input
              type="password"
              value={githubToken}
              onChange={(e) => setGithubToken(e.target.value)}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              disabled={isLoading}
            />
            <ActionButton onClick={handleTestConnection} disabled={isLoading}>
              🔗 Tester connexion
            </ActionButton>
          </InputGroup>

          <InputGroup>
            <Label>Mot de passe de chiffrement (min 8 caractères)</Label>
            <PasswordInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mot de passe fort pour chiffrer vos données"
              disabled={isLoading}
            />
          </InputGroup>

          <InputGroup>
            <Label>ID du Gist (optionnel pour export, requis pour import)</Label>
            <Input
              type="text"
              value={gistId}
              onChange={(e) => setGistId(e.target.value)}
              placeholder="Ex: abc123def456..."
              disabled={isLoading}
            />
            <ActionButton onClick={handleListGists} disabled={isLoading}>
              📋 Lister mes Gists
            </ActionButton>
          </InputGroup>
        </SyncSection>

        {/* Section Actions */}
        <SyncSection>
          <SyncTitle>🚀 Actions</SyncTitle>

          <ButtonGroup>
            <ActionButton
              $variant="primary"
              onClick={handleExport}
              disabled={isLoading || !githubToken || !password}
            >
              ⬆️ Exporter vers GitHub
            </ActionButton>

            <ActionButton
              $variant="secondary"
              onClick={handleImport}
              disabled={isLoading || !githubToken || !password || !gistId}
            >
              ⬇️ Importer depuis GitHub
            </ActionButton>
          </ButtonGroup>

          {/* Message de statut */}
          {status.message && (
            <StatusMessage $type={status.type}>
              {status.message}
            </StatusMessage>
          )}
        </SyncSection>

        {/* Section Info */}
        <SyncSection>
          <ConfigInfo>
            <ConfigRow>
              <strong>Sécurité:</strong> AES-256 + PBKDF2 (10k iterations)
            </ConfigRow>
            <ConfigRow>
              <strong>Données:</strong> Notes + Projets
            </ConfigRow>
            <ConfigRow>
              <strong>Stockage:</strong> GitHub Gist privé
            </ConfigRow>
          </ConfigInfo>
        </SyncSection>
      </SyncContainer>
    </Modal>
  );
};

export default SyncModal;