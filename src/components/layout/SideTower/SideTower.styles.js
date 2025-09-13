// src/components/layout/SideTower/SideTower.styles.js

import styled from 'styled-components';

export const TowerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 3fr;
  gap: ${props => props.theme.spacing.sm};
`;