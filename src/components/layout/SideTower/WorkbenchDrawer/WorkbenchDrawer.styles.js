// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  height: 100px;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.accent};
`;

export const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
`;
