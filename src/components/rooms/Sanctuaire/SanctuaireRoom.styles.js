// src/components/rooms/Sanctuaire/SanctuaireRoom.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const SanctuaireGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.xl};

  /* TEST-MEDIEVAL-UI: Background bleu nuit premium avec overlay doré subtil */
  background: ${({ theme }) => theme.gradients.uiKitBlue};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.gradients.goldShine};
    opacity: 0.03; /* Très subtil */
    pointer-events: none;
    border-radius: ${({ theme }) => theme.radii.xl};
  }

  /* Ombre intérieure pour profondeur */
  box-shadow:
    inset 0 2px 10px ${({ theme }) => alpha(theme.colors.black, 0.3)},
    inset 0 0 30px ${({ theme }) => alpha('#111629', 0.4)};
`;
