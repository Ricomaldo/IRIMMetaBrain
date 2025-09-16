// src/components/modals/ModalManager.jsx

import React, { useState, useEffect } from 'react';
import { registerModalHandler } from '../../utils/buttonMapping';
import { HealingPotionModal, SleepPotionModal, StrengthPotionModal } from './PotionModals';
import SyncModal from './SyncModal/SyncModal';

const ModalManager = () => {
  // État pour chaque modale
  const [modalStates, setModalStates] = useState({
    'potion-heal': false,
    'potion-sleep': false,
    'potion-strength': false,
    'sync': false,
  });

  // Fonction générique pour ouvrir une modale
  const openModal = (modalId) => {
    setModalStates(prev => ({ ...prev, [modalId]: true }));
  };

  // Fonction générique pour fermer une modale
  const closeModal = (modalId) => {
    setModalStates(prev => ({ ...prev, [modalId]: false }));
  };

  // Enregistrer les handlers au montage
  useEffect(() => {
    Object.keys(modalStates).forEach(modalId => {
      registerModalHandler(modalId, () => openModal(modalId));
    });
  }, []);

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
    </>
  );
};

export default ModalManager;