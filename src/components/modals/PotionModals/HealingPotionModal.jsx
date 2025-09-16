// src/components/modals/PotionModals/HealingPotionModal.jsx

import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};

  h3 {
    color: ${({ theme }) => theme.colors.accents.success};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  p {
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const HealingPotionModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💚 Potion de Soin"
      variant="overlay" // Test avec overlay classique
      size="medium"
      showFooterCloseButton={true}
    >
      <TestContent>
        <h3>Test Modal - Variant: overlay</h3>
        <p>Cette modale utilise la variante "overlay" classique.</p>
        <p>Elle apparaît au centre de l'écran avec un fond semi-transparent.</p>
        <p>
          Effets: Restaure 50 points de vie<br />
          Ingrédients: Feuille de sauge, Racine de mandragore<br />
          Temps de préparation: 30 secondes
        </p>
      </TestContent>
    </Modal>
  );
};

export default HealingPotionModal;