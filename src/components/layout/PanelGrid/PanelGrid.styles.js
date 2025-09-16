// src/components/layout/PanelGrid/PanelGrid.styles.js

import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  grid-template-rows: repeat(${props => props.$rows}, 1fr);
  gap: ${props => props.$gap};
`;