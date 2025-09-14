// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { craftBorder, craftBorderHeavy, metalBg, woodBg, tertiaryLevel, secondaryLevel } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr 240px;
    ${secondaryLevel};
    ${woodBg};
`;

export const TabsHeader = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
  padding: ${props => props.theme.spacing.xs};
  overflow: hidden;
margin-left: ${props => props.theme.spacing.sm};
  z-index: 2;
  position: relative;
`;

export const TabButton = styled.button`
  ${craftBorder}
  background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.primary};
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  color: ${props => props.active ? props.theme.colors.text.primary : props.theme.colors.secondary};
  font-size: 18px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.accent};
    color: ${props => props.theme.colors.secondary};
  }
`;

export const TabContent = styled.div`
  overflow: auto;
  margin-left: ${props => props.theme.spacing.sm};
  margin-right: ${props => props.theme.spacing.sm};
  border-radius: 0 0 8px 8px;
  padding: ${props => props.theme.spacing.xs};
  background: ${props => props.theme.colors.secondary};
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.xs};
  height: 100%;
  place-items: center;

  > div {
    ${tertiaryLevel}
    border-radius: 4px;
    padding: 2px;
  }
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
  ${metalBg}
  ${craftBorder}
  padding: ${props => props.theme.spacing.xs};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FooterLine = styled.div`
  font-size: 12px;
  color: ${props => props.theme.colors.secondary};
`;
