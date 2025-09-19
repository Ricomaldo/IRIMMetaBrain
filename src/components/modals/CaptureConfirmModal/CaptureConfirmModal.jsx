// src/components/modals/CaptureConfirmModal/CaptureConfirmModal.jsx

import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import { 
  CaptureContainer, 
  CaptureSection, 
  CaptureTitle, 
  CaptureDescription, 
  ActionInfo,
  ButtonGroup, 
  ActionButton, 
  StatusMessage 
} from './CaptureConfirmModal.styles';

/**
 * Modale de confirmation pour lancer la capture d'état
 * @renders Modal
 * @renders CaptureContainer
 * @renders CaptureSection
 * @renders CaptureTitle
 * @renders CaptureDescription
 * @renders ActionInfo
 * @renders ButtonGroup
 * @renders ActionButton
 * @renders StatusMessage
 */
const CaptureConfirmModal = ({ isOpen, onClose }) => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureStatus, setCaptureStatus] = useState('');

  const handleConfirm = async () => {
    setIsCapturing(true);
    setCaptureStatus('🚀 Instructions pour lancer la capture...');
    
    // Afficher les instructions pour lancer manuellement la capture
    setCaptureStatus(`📋 Pour capturer l'état du projet, exécutez dans votre terminal :

cd ${window.location.pathname.includes('IRIMMetaBrain') ? '' : '/chemin/vers/'}IRIMMetaBrain
npm run capture

⚡ Vous pouvez laisser cette modale ouverte et lancer la commande maintenant !

📁 Les résultats apparaîtront dans le dossier captures/`);
    
    // Option : Copier la commande dans le presse-papier si possible
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText('npm run capture');
        setCaptureStatus(prev => prev + '\n\n📋 Commande copiée dans le presse-papier !');
      }
    } catch (error) {
      // Clipboard API might not be available
    }
  };

  const handleClose = () => {
    setIsCapturing(false);
    setCaptureStatus('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="📷 Capture d'État du Projet"
      size="medium"
      variant="roomCanvas"
    >
      <CaptureContainer>
        <CaptureSection>
          <CaptureTitle>🎯 Capture Complète</CaptureTitle>
          <CaptureDescription>
            Capture automatisée de l'état complet du projet IRIM MetaBrain
          </CaptureDescription>
          
          <ActionInfo>
            <div><strong>🖼️ Screenshots</strong> - Toutes les rooms (room1 à room12)</div>
            <div><strong>💾 État Zustand</strong> - Stores et données complètes</div>
            <div><strong>📊 Métriques</strong> - Statistiques du code source</div>
            <div><strong>📝 Rapport</strong> - Documentation automatique</div>
          </ActionInfo>
        </CaptureSection>

        <CaptureSection>
          {!isCapturing && !captureStatus && (
            <ButtonGroup>
              <ActionButton 
                $variant="secondary" 
                onClick={handleClose}
                disabled={isCapturing}
              >
                Annuler
              </ActionButton>
              
              <ActionButton 
                $variant="primary" 
                onClick={handleConfirm}
                disabled={isCapturing}
              >
                📷 Obtenir les Instructions
              </ActionButton>
            </ButtonGroup>
          )}
          
          {(isCapturing || captureStatus) && (
            <>
              <StatusMessage $type={captureStatus.includes('❌') ? 'error' : 'info'}>
                {captureStatus}
              </StatusMessage>
              
              <ButtonGroup>
                <ActionButton 
                  $variant="primary" 
                  onClick={handleClose}
                >
                  ✓ Compris - Fermer
                </ActionButton>
              </ButtonGroup>
            </>
          )}
        </CaptureSection>
      </CaptureContainer>
    </Modal>
  );
};

export default CaptureConfirmModal;
