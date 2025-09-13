// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { craftBorder, craftBorderHeavy, parchmentBg, woodBg } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr 60px;
`;

export const TabsHeader = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs};
  overflow: hidden;
`;

export const TabButton = styled.button`
  ${craftBorder}
  ${props => props.active ? woodBg : ''}
  background: ${props => props.active ? props.theme.colors.accent : props.theme.colors.secondary};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  color: ${props => props.theme.colors.text.primary};
  font-size: 18px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
  }
`;

export const TabContent = styled.div`
  overflow: auto;
  padding: ${props => props.theme.spacing.xs};
  ${woodBg}
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xs};
  height: 100%;
  place-items: center;
`;

export const ItemBadge = styled.span`
  position: absolute;
  right: -6px;
  bottom: -6px;
  ${craftBorderHeavy}
  background: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.secondary};
  font-size: 10px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: 6px;
`;

export const InfoFooter = styled.div`
  ${parchmentBg}
  ${craftBorder}
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FooterLine = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.text.primary};
`;
