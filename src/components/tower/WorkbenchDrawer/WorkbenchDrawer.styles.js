// src/components/tower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { tabBase, tabInactive, tabActive, tabContentPanel } from '../../../styles/mixins';

// src/components/tower/WorkbenchDrawer/WorkbenchDrawer.styles.js

export const DrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
`;

export const TabsHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs} 0`};
  position: relative;
  z-index: 2;
  margin-bottom: 0; // Pas d'espace !
`;

export const TabButton = styled.button`
  ${tabBase}
  ${props => (props.$active ? tabActive : tabInactive)}
`;

export const TabContent = styled.div`
  flex: 1;
  overflow: auto;
  ${tabContentPanel}
  padding: ${({ theme }) => theme.spacing.md};
  margin: 0;
  position: relative;
  z-index: 1;
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
  height: 100%;
  place-items: center;
`;