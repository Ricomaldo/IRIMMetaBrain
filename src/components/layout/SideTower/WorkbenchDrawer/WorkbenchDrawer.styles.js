// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
    color: white;

`;

export const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 4fr);
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
`;
