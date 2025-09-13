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
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs};
`;

export const TopRow = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 3fr 1.5fr;
  gap: ${props => props.theme.spacing.xs};
  align-items: center;
  height: ${props => props.theme.button.large};
`;

export const BottomRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const LeftSquare = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
  text-align: center;
`;

export const CenterRect = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-size: 14px;
  gap: ${props => props.theme.spacing.xs};
  height: ${props => props.theme.button.large};
  padding: ${props => props.theme.spacing.xs};
  text-align: center;
`;

export const RightSquare = styled.div`
  ${craftBorderHeavy}
  ${flexCenter}
  flex-direction: column;
  background: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text.primary};
  font-weight: bold;
  text-align: center;
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${props => props.theme.spacing.xs};
  height: 100%;
  place-items: center;
  padding: ${props => props.theme.spacing.xs};
  align-content: center;
`;
