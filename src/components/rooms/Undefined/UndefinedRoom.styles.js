// src/components/rooms/Undefined/UndefinedRoom.styles.js

import styled from "styled-components";
import { alpha } from "../../../styles/color";
import {
  metalBg,
  primaryLevel,
  secondaryLevel,
  tertiaryLevel,
} from "../../../styles/mixins";

// Composants non utilisés - supprimés pour éviter la redondance

// Barre de contrôle horizontale - secondaryLevel
export const SandboxControlBar = styled.div`
  ${secondaryLevel}
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  background: ${({ theme }) => alpha(theme.colors.black, 0.8)};
  width: fit-content;
  margin: 0 auto;
  justify-content: center;
`;

// Bouton de configuration - utilise le theme
export const SandboxConfigButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  background: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
  color: ${({ theme, $active }) => $active ? theme.colors.background : theme.colors.primary};
  border: ${({ theme }) => `${theme.borders.thin} solid ${theme.colors.primary}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ $active }) => $active ? 'bold' : 'normal'};
  transition: ${({ theme }) => `all ${theme.motion.durations.fast} ${theme.motion.easings.standard}`};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : alpha(theme.colors.primary, 0.1)};
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

// Contenu sans panel - tertiaryLevel
export const NoPanelContent = styled.div`
  ${tertiaryLevel}
  grid-column: 1 / 6;
  grid-row: 2 / 6;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 215, 0, 0.05);
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

// Titre du labo avec texture métal - primaryLevel
export const LaboTitle = styled.h2`
  ${primaryLevel}
  ${metalBg}
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  margin: ${({ theme }) => `${theme.spacing.xl} auto 20px auto`};
  font-size: 24px;
  font-family: ${({ theme }) => theme.typography.families.ui};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  display: block;
  width: 25%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;
