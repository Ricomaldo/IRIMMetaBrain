// src/components/modals/PotionModals/StrengthPotionModal.jsx

import React from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};

  h3 {
    color: ${({ theme }) => theme.colors.accents.danger};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  p {
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  .compact-info {
    background: ${({ theme }) => theme.colors.secondary};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radii.sm};
    margin-top: ${({ theme }) => theme.spacing.md};
  }
`;

const StrengthPotionModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💪 Potion de Force"
      variant="baseFloorTower" // Test avec baseFloorTower
      showFooterCloseButton={true}
      closeButtonText="OK"
    >
      <TestContent>
        <h3>Test Modal - Variant: baseFloorTower</h3>
        <p>Cette modale remplace la zone SideTowerNotes.</p>
        <p>Elle occupe exactement l'espace du BottomTowerFloor (320px).</p>

        <div className="compact-info">
          <p>Force: +10</p>
          <p>Durée: 5 minutes</p>
          <p>Ingrédients: Racine de ginseng</p>
        </div>
      </TestContent>
    </Modal>
  );
};

export default StrengthPotionModal;