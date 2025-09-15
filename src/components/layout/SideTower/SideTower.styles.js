// src/components/layout/SideTower/SideTower.styles.js

import styled from 'styled-components';
import { craftBorder, stoneBg } from '../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
   grid-template-rows: 1fr 5fr;
  gap: ${({ theme }) => theme.spacing.sm};
  ${craftBorder}
  ${stoneBg}
  padding: ${({ theme }) => theme.spacing.sm};
`;