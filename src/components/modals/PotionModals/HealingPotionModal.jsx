// src/components/modals/PotionModals/HealingPotionModal.jsx

import React, { useState } from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;

  h3 {
    color: ${({ theme }) => theme.colors.accents.success};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }

  .test-badge {
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.stone};
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    margin-top: ${({ theme }) => theme.spacing.lg};
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
        <h3>Modal Overlay Test</h3>
        <div className="test-badge">🧪 Fonction expérimentale UI</div>
      </TestContent>
    </Modal>
  );
};

export default HealingPotionModal;