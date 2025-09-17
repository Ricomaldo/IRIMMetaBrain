// src/components/rooms/Undefined/UndefinedRoom.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const UndefinedGrid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SandboxContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundDark};
  overflow: hidden;
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.black, 0.5)};
  border: ${({ theme }) => `${theme.borders.base} solid ${alpha(theme.colors.primary, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(10px);

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-family: ${({ theme }) => theme.typography.families.ui};
  }
`;

export const GridButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $active }) =>
    $active ? alpha(theme.colors.primary, 0.3) : alpha(theme.colors.white, 0.1)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  border: ${({ theme, $active }) =>
    $active ? `${theme.borders.base} solid ${theme.colors.primary}` : `${theme.borders.thin} solid ${alpha(theme.colors.border, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: ${({ theme }) => theme.typography.families.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $active }) => $active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: ${({ theme }) => `all ${theme.motion.durations.fast} ${theme.motion.easings.standard}`};

  &:hover {
    background: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TestArea = styled.div`
  flex: 1;
  min-height: 0;
  background: ${({ theme }) => alpha(theme.colors.black, 0.3)};
  border: ${({ theme }) => `${theme.borders.thin} dashed ${alpha(theme.colors.primary, 0.2)}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: auto;
  position: relative;

  &::before {
    content: 'Test Area';
    position: absolute;
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => alpha(theme.colors.primary, 0.3)};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    font-family: ${({ theme }) => theme.typography.families.mono};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const InfoBadge = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  border: ${({ theme }) => `${theme.borders.thin} solid ${alpha(theme.colors.primary, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.families.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  white-space: nowrap;
`;

// Barre de contrôle horizontale
export const ControlBar = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #ffd700;
  border-radius: 12px;
  margin-bottom: 20px;
  width: fit-content;
  margin: 0 auto 20px;
`;

// Bouton de configuration
export const ConfigButton = styled.button`
  padding: 6px 12px;
  background: ${({ $active }) => $active ? '#ffd700' : 'transparent'};
  color: ${({ $active }) => $active ? 'black' : '#ffd700'};
  border: 1px solid #ffd700;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ $active }) => $active ? '#ffd700' : 'rgba(255, 215, 0, 0.1)'};
  }
`;

// Contenu welcome pour Panel
export const WelcomeContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

// Emoji de bienvenue
export const WelcomeEmoji = styled.div`
  font-size: 60px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Titre de bienvenue
export const WelcomeTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

// Description de bienvenue
export const WelcomeDescription = styled.p`
  opacity: 0.7;
  margin: ${({ theme }) => `${theme.spacing.sm} 0`};
`;

// Hint de bienvenue
export const WelcomeHint = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm};
  background: rgba(255, 215, 0, 0.1);
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
`;

// Contenu sans panel
export const NoPanelContent = styled.div`
  grid-column: 1 / 6;
  grid-row: 1 / 6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.05);
  border: 2px dashed rgba(255, 215, 0, 0.3);
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
`;

// Emoji grand pour sans panel
export const LargeEmoji = styled.div`
  font-size: 80px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

// Sous-titre sans panel
export const NoPanelSubtitle = styled.p`
  opacity: 0.7;
`;