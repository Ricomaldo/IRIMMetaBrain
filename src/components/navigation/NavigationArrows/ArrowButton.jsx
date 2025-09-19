// src/components/navigation/NavigationArrows/ArrowButton.jsx

import React from 'react';
import styled, { css } from 'styled-components';
import arrowLeft from '../../../assets/images/ui/navigation/navigation-wood-arrow-left.png';
import { alpha } from '../../../styles/color';

// Définition des rotations pour chaque direction
// La flèche de base pointe vers la GAUCHE
const directionRotations = {
  left: '0deg',
  up: '90deg',
  right: '180deg',
  down: '270deg'
};

// Container du bouton avec toutes les animations
const ArrowContainer = styled.button`
  /* Reset des styles par défaut */
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: none;

  /* Positionnement et taille */
  width: ${({ $size }) => $size || '60px'};
  height: ${({ $size }) => $size || '60px'};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  /* Animation de base + opacité pendant navigation */
  transition: all 0.3s ease, opacity 0.2s ease;

  /* Gestion de l'opacité pendant la navigation */
  opacity: ${({ $isNavigating, $isActive }) => {
    if (!$isNavigating) return '1';
    if ($isActive) return '0.5'; // La flèche active reste plus visible
    return '0.2'; // Les autres flèches s'estompent
  }};

  /* Rotation selon la direction */
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transform: rotate(${({ $direction }) => directionRotations[$direction] || '0deg'});
    transition: all 0.3s ease;
    filter: drop-shadow(0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.5)});
  }

  /* Effet de glow doré au hover */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120%;
    height: 120%;
    background: radial-gradient(
      circle,
      ${({ theme }) => alpha(theme.colors.accents.gold || '#FFD700', 0.3)} 0%,
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  /* États interactifs */
  &:hover {
    /* Le transform est géré par les variantes pour conserver les positions */

    &::before {
      opacity: 1;
    }

    img {
      filter:
        drop-shadow(0 4px 8px ${({ theme }) => alpha(theme.colors.black, 0.6)})
        brightness(1.2);
    }
  }

  &:active {
    /* Le transform est géré par les variantes */
  }

  /* Désactivé */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.3;

    &:hover {
      transform: none;

      &::before {
        opacity: 0;
      }

      img {
        filter: drop-shadow(0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.5)});
      }
    }
  }

  /* Variantes de position pour RoomCanvas */
  ${({ $variant }) => {
    switch($variant) {
      case 'room-top':
        return css`
          position: absolute;
          top: ${({ theme }) => theme.spacing.lg};
          left: 50%;
          transform: translateX(-50%);

          &:hover {
            transform: translateX(-50%) scale(1.1) translateY(-2px);
          }

          &:active {
            transform: translateX(-50%) scale(0.95);
          }
        `;
      case 'room-bottom':
        return css`
          position: absolute;
          bottom: ${({ theme }) => theme.spacing.lg};
          left: 50%;
          transform: translateX(-50%);

          &:hover {
            transform: translateX(-50%) scale(1.1) translateY(2px);
          }

          &:active {
            transform: translateX(-50%) scale(0.95);
          }
        `;
      case 'room-left':
        return css`
          position: absolute;
          left: ${({ theme }) => theme.spacing.lg};
          top: 50%;
          transform: translateY(-50%);

          &:hover {
            transform: translateY(-50%) scale(1.1) translateX(-2px);
          }

          &:active {
            transform: translateY(-50%) scale(0.95);
          }
        `;
      case 'room-right':
        return css`
          position: absolute;
          right: ${({ theme }) => theme.spacing.lg};
          top: 50%;
          transform: translateY(-50%);

          &:hover {
            transform: translateY(-50%) scale(1.1) translateX(2px);
          }

          &:active {
            transform: translateY(-50%) scale(0.95);
          }
        `;
      default:
        return '';
    }
  }}
`;

/**
 * Individual arrow button with direction and styling support
 * @renders ArrowContainer
 * @renders img
 */
const ArrowButton = ({
  direction = 'left',
  onClick,
  disabled = false,
  size = '60px',
  variant = null,
  className = '',
  title = '',
  isNavigating = false,
  isActive = false
}) => {
  return (
    <ArrowContainer
      $direction={direction}
      $size={size}
      $variant={variant}
      $isNavigating={isNavigating}
      $isActive={isActive}
      onClick={onClick}
      disabled={disabled}
      className={className}
      title={title || `Navigate ${direction}`}
      aria-label={`Navigate ${direction}`}
    >
      <img src={arrowLeft} alt={`Arrow ${direction}`} />
    </ArrowContainer>
  );
};

export default ArrowButton;