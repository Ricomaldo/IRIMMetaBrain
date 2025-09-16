// src/hooks/useModal.js - Hook pour gérer l'état des modales

import { useState, useCallback } from 'react';

/**
 * useModal - Hook réutilisable pour gérer l'état d'une modale
 *
 * @param {boolean} initialState - État initial (ouvert/fermé)
 * @returns {Object} - État et méthodes de contrôle
 */
export const useModal = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const [data, setData] = useState(null);

  const open = useCallback((modalData = null) => {
    setData(modalData);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    // Nettoyer les données après l'animation
    setTimeout(() => setData(null), 300);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle
  };
};

export default useModal;