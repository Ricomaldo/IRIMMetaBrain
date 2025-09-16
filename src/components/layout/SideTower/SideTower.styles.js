// src/components/layout/SideTower/SideTower.styles.js

import styled from 'styled-components';
import { craftBorder, stoneBg } from '../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 3fr 320px;
  gap: ${({ theme }) => theme.spacing.sm};
  ${craftBorder}
  ${stoneBg}
  padding: ${({ theme }) => theme.spacing.sm};
`;

// Wrapper pour l'étage supérieur (ControlTower)
export const TopTowerFloor = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
`;

// Wrapper pour l'étage du milieu (WorkbenchDrawer)
export const MiddleTowerFloor = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;

// Wrapper pour l'étage inférieur (SideTowerNotes)
export const BottomTowerFloor = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  overflow: hidden;
`;