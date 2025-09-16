// src/components/tower/ControlTower/ControlTower.styles.js

import styled from 'styled-components';
import { metalBg, craftBorderHeavy, primaryLevel } from '../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${metalBg}
  ${primaryLevel}
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-items: center;
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  justify-items: center;
`;

export const CenterRect = styled.div`
  ${craftBorderHeavy}
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  width: 100%;
  height: ${({ theme }) => theme.button.large};
  padding: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;
