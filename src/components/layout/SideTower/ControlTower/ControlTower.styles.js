// src/components/layout/SideTower/ControlTower/ControlTower.styles.js

import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const TowerContainer = styled.div`
  height: 100px;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: white;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;
