// src/components/common/Modal/Modal.jsx - Composant modal réutilisable

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalActionButton
} from './Modal.styles';

/**
 * Modal - Composant de base pour toutes les modales de l'app
 *
 * Architecture:
 * - Utilise React Portal pour render au-dessus de tout
 * - Design aligné sur Tower System
 * - Fermeture par Escape ou clic overlay
 * - Flexible avec header/footer optionnels
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'medium', // small, medium, large, fullscreen
  variant = 'overlay', // 'overlay', 'roomCanvas' ou 'baseFloorTower'
  closeOnOverlay = true,
  closeOnEscape = true,
  showCloseButton = true,
  showFooterCloseButton = false, // Option pour afficher un bouton de fermeture dans le footer
  closeButtonText = 'Fermer' // Texte personnalisable du bouton
}) => {
  // Gestion de la touche Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Bloquer le scroll du body quand modal ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (closeOnOverlay && e.target === e.currentTarget) {
      onClose();
    }
  };

  // Détermine où rendre la modale en fonction de la variante
  const getPortalContainer = () => {
    if (variant === 'roomCanvas') {
      const el = document.getElementById('room-canvas-container');
      return el || document.body;
    } else if (variant === 'baseFloorTower') {
      const el = document.getElementById('notes-floor');
      return el || document.body;
    }
    return document.body;
  };

  // Render dans un portal au bon endroit
  return createPortal(
    <ModalOverlay onClick={handleOverlayClick} $variant={variant}>
      <ModalContainer $size={size} $variant={variant}>
        {(title || showCloseButton) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {showCloseButton && (
              <ModalCloseButton onClick={onClose} title="Fermer (Esc)">
                ✕
              </ModalCloseButton>
            )}
          </ModalHeader>
        )}

        <ModalContent>
          {children}
        </ModalContent>

        {(footer || showFooterCloseButton) && (
          <ModalFooter>
            {footer}
            {showFooterCloseButton && (
              <ModalActionButton onClick={onClose} $variant="primary">
                {closeButtonText}
              </ModalActionButton>
            )}
          </ModalFooter>
        )}
      </ModalContainer>
    </ModalOverlay>,
    getPortalContainer()
  );
};

export default Modal;