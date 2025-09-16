// src/components/modals/PotionModals/SleepPotionModal.jsx

import React from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};

  h3 {
    color: ${({ theme }) => theme.colors.accents.primary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }

  p {
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .test-info {
    background: ${({ theme }) => theme.colors.stone};
    padding: ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.md};
    margin-top: ${({ theme }) => theme.spacing.xl};
  }
`;

const SleepPotionModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💤 Potion de Sommeil"
      variant="roomCanvas" // Test avec roomCanvas
      size="large"
    >
      <TestContent>
        <h3>Test Modal - Variant: roomCanvas</h3>
        <p>Cette modale utilise la variante "roomCanvas".</p>
        <p>Elle remplace complètement la zone RoomCanvas (80% de la largeur).</p>

        <div className="test-info">
          <h4>Propriétés de la potion:</h4>
          <p>
            Effets: Induit un sommeil profond pendant 8 heures<br />
            Ingrédients: Pétales de pavot, Poudre de lune<br />
            Temps de préparation: 45 secondes<br />
            Avertissement: Ne pas utiliser avant de conduire
          </p>
        </div>
      </TestContent>
    </Modal>
  );
};

export default SleepPotionModal;