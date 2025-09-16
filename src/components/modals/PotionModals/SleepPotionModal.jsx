// src/components/modals/PotionModals/SleepPotionModal.jsx

import React from 'react';
import Modal from '../../common/Modal/Modal';
import styled from 'styled-components';

const TestContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.light};
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  h3 {
    color: ${({ theme }) => theme.colors.accents.primary};
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

const SleepPotionModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="💤 Potion de Sommeil"
      variant="roomCanvas" // Test avec roomCanvas
      size="large"
      showFooterCloseButton={true}
      closeButtonText="Fermer la modale"
    >
      <TestContent>
        <h3>Modal RoomCanvas Test</h3>
        <div className="test-badge">🧪 Fonction expérimentale UI</div>
      </TestContent>
    </Modal>
  );
};

export default SleepPotionModal;