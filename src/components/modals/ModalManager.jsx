// src/components/modals/ModalManager.jsx

import React, { useState, useEffect, useRef } from 'react';
import { registerModalHandler } from '../../utils/buttonMapping';
import { HealingPotionModal, SleepPotionModal, StrengthPotionModal } from './PotionModals';
import SyncModal from './SyncModal/SyncModal';
import SettingsModal from './SettingsModal/SettingsModal';

const ModalManager = () => {
  // État pour chaque modale
  const [modalStates, setModalStates] = useState({
    'potion-heal': false,
    'potion-sleep': false,
    'potion-strength': false,
    'sync': false,
    'settings': false,
  });

  // Utiliser une ref pour stocker la fonction de setState
  const modalStatesRef = useRef(modalStates);
  modalStatesRef.current = modalStates;

  // Fonction générique pour fermer une modale
  const closeModal = (modalId) => {
    setModalStates(prev => ({ ...prev, [modalId]: false }));
  };

  // Enregistrer les handlers au montage (une seule fois)
  useEffect(() => {
    // Fonction stable qui utilise setModalStates
    const openModal = (modalId) => {
      setModalStates(() => {
        // Créer un nouvel état avec toutes les modales fermées sauf celle demandée
        const newState = {};
        Object.keys(modalStatesRef.current).forEach(key => {
          newState[key] = key === modalId;
        });
        return newState;
      });
    };

    // Enregistrer les handlers
    Object.keys(modalStates).forEach(modalId => {
      registerModalHandler(modalId, () => openModal(modalId));
    });
  }, []); // Vide pour ne s'exécuter qu'une fois

  return (
    <>
      <HealingPotionModal
        isOpen={modalStates['potion-heal']}
        onClose={() => closeModal('potion-heal')}
      />

      <SleepPotionModal
        isOpen={modalStates['potion-sleep']}
        onClose={() => closeModal('potion-sleep')}
      />

      <StrengthPotionModal
        isOpen={modalStates['potion-strength']}
        onClose={() => closeModal('potion-strength')}
      />

      <SyncModal
        isOpen={modalStates['sync']}
        onClose={() => closeModal('sync')}
      />

      <SettingsModal
        isOpen={modalStates['settings']}
        onClose={() => closeModal('settings')}
      />
    </>
  );
};

export default ModalManager;