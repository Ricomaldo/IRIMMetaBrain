// src/components/modals/PotionModals/StrengthPotionModal.jsx

import React from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h3 {
    color: ${({ theme }) => theme.colors.accents.danger};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  .test-badge {
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
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
        <h3>Modal Tower Test</h3>
        <div className="test-badge">🧪 UI Test</div>
      </TestContent>
    </Modal>
  );
};

export default StrengthPotionModal;