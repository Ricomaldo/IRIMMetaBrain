// src/components/rooms/Undefined/UndefinedRoom.styles.js

import styled from "styled-components";
import {
  woodBg,
  metalBg,
  primaryLevel,
  secondaryLevel,
  tertiaryLevel,
} from "../../../styles/mixins";

// Composants non utilisés - supprimés pour éviter la redondance

// Barre de contrôle horizontale - secondaryLevel
export const SandboxControlBar = styled.div`
  ${secondaryLevel}
  ${woodBg};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(45px, 1fr));
  grid-auto-rows: minmax(28px, auto);
  gap: 4px;
  padding: 8px 12px;
  width: 100%;
  margin: 0 auto;
  background: transparent;
  box-shadow: none;
  flex: 1;

  button {
    min-width: 45px;
    padding: 4px 8px;
    font-size: 12px;
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
  color: ${({ theme }) => theme.colors.primary};
  font-size: 24px;
  font-family: ${({ theme }) => theme.typography.families.ui};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  align-items: center;
  white-space: nowrap;
`;

// Conteneur unifié pour le titre et les contrôles
export const ControlHeader = styled.div`
  ${primaryLevel}
  ${metalBg}
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
`;

// Grille principale qui prend toute la place disponible
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  flex: 1;
`;

// Conteneur pour le mode sans panel
export const NoPanelCenter = styled.div`
  text-align: center;
`;
