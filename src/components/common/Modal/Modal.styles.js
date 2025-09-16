// src/components/common/Modal/Modal.styles.js - Styles pour le système de modales

import styled, { keyframes } from 'styled-components';
import { alpha } from '../../../styles/color';
import { metalBg, primaryLevel } from '../../../styles/mixins';

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translate(-50%, -45%);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

// Overlay adaptable selon variante
export const ModalOverlay = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.modal};
  animation: ${fadeIn} 0.2s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ variant, theme }) => {
    if (variant === 'roomCanvas') {
      // Positionné exactement sur RoomCanvas (4fr = 80% de la largeur)
      return `
        top: ${theme.spacing.sm};
        left: ${theme.spacing.sm};
        width: calc(80% - ${theme.spacing.sm});
        height: calc(100vh - ${theme.spacing.lg});
        background: ${theme.colors.black}; /* Fond opaque pour cacher RoomCanvas */
        border-radius: ${theme.radii.xl};
      `;
    } else if (variant === 'baseFloorTower') {
      // Positionné sur l'étage de base de SideTower (320px de hauteur)
      return `
        bottom: ${theme.spacing.sm};
        right: ${theme.spacing.sm};
        width: calc(20% - ${theme.spacing.sm}); /* 1fr de la grid */
        height: 320px; /* Hauteur fixe du BottomTowerFloor */
        background: ${theme.colors.black}; /* Fond opaque */
        border-radius: ${theme.radii.xl};
      `;
    } else {
      // Mode overlay classique (plein écran)
      return `
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: ${alpha(theme.colors.black, 0.7)};
        backdrop-filter: blur(8px);
      `;
    }
  }}
`;

// Container de la modal - Adapté selon variante
export const ModalContainer = styled.div`
  position: relative;
  border-radius: ${({ theme }) => theme.radii.xl};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  ${({ variant, theme, size }) => {
    if (variant === 'roomCanvas') {
      // Version qui remplace complètement RoomCanvas
      return `
        ${metalBg}
        ${primaryLevel}
        width: 100%;
        height: 100%;
        background-blend-mode: multiply;
        animation: ${fadeIn} 0.3s ease-out; /* Pas de slide, juste fadeIn */
      `;
    } else if (variant === 'baseFloorTower') {
      // Version qui remplace l'étage de base (BottomTowerFloor)
      return `
        ${metalBg}
        ${primaryLevel}
        width: 100%;
        height: 100%;
        background-blend-mode: multiply;
        animation: ${fadeIn} 0.3s ease-out;
      `;
    } else {
      // Version modale classique
      return `
        ${metalBg}
        ${primaryLevel}
        background-blend-mode: multiply;
        animation: ${slideUp} 0.3s ease-out;

        width: ${(() => {
          switch (size) {
            case 'small': return '400px';
            case 'large': return '80%';
            case 'fullscreen': return '95%';
            default: return '600px'; // medium
          }
        })()};

        max-width: 90%;
        max-height: 85%;
      `;
    }
  }}
`;

// Header de la modal - Style Tower/Control
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.primary, 0.3)};
  border-bottom: ${({ theme }) => `${theme.borders.thick} solid ${theme.colors.border}`};
  backdrop-filter: blur(4px);
`;

export const ModalTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  margin: 0;
  text-shadow: 2px 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.5)};
`;

// Bouton fermer - Style IconButton Tower
export const ModalCloseButton = styled.button`
  width: ${({ theme }) => theme.button.small};
  height: ${({ theme }) => theme.button.small};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.stone};
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  cursor: pointer;
  transition: ${({ theme }) => `all ${theme.motion.durations.base} ${theme.motion.easings.standard}`};

  &:hover {
    background: ${({ theme }) => theme.colors.accents.danger};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  }

  &:active {
    transform: translateY(0);
  }
`;

// Contenu scrollable
export const ModalContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => alpha(theme.colors.secondary, 0.3)};

  /* Custom scrollbar style Tower */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => alpha(theme.colors.black, 0.2)};
    border-radius: ${({ theme }) => theme.radii.sm};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

// Footer optionnel pour actions
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
  border-top: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
`;