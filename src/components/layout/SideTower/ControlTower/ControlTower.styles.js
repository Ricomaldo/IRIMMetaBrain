// src/components/layout/SideTower/ControlTower/ControlTower.styles.js

import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  color: white;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;
