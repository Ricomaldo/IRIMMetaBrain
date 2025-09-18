// src/components/layout/PanelGrid/PanelGrid.styles.js

import styled from 'styled-components';

export const GridContainer = styled.div`
  width: 100%;
  /* En contexte flex, remplir l'espace restant sans dépasser */
  flex: 1;
  display: grid;
  grid-template-columns: repeat(${props => props.$columns}, 1fr);
  grid-template-rows: repeat(${props => props.$rows}, 1fr);
  gap: ${props => props.$gap};
  /* Laisser les enfants rétrécir et scroller */
  min-width: 0;
  min-height: 0;
  /* Laisser flexbox gérer la hauteur automatiquement */
  overflow: auto;
`;