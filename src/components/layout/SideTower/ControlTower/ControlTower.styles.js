// src/components/layout/SideTower/ControlTower/ControlTower.styles.js

import styled from 'styled-components';
import { stoneBg, craftBorderHeavy, flexCenter, primaryLevel } from '../../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  ${stoneBg}
  ${primaryLevel}
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr 1.5fr;
  gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  height: ${({ theme }) => theme.button.large};
  padding: ${({ theme }) => theme.spacing.xs};
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  height: ${({ theme }) => theme.button.large};
  align-items: center;
`;

export const LeftSquare = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  text-align: center;
`;

export const CenterRect = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: 14px;
  gap: ${({ theme }) => theme.spacing.xs};
  height: ${({ theme }) => theme.button.large};
  padding: ${({ theme }) => theme.spacing.xs};
  text-align: center;
`;

export const RightSquare = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  text-align: center;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  height: 100%;
  place-items: center;
  padding: ${({ theme }) => theme.spacing.xs};
  align-content: center;
  max-height: ${({ theme }) => theme.button.large};
`;
