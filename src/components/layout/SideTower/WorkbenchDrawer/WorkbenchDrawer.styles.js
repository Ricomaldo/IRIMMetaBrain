// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js

import styled from 'styled-components';
import { craftBorder, craftBorderHeavy, metalBg, woodBg, tertiaryLevel, secondaryLevel } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 1fr 320px;
  ${secondaryLevel};
  ${woodBg};
`;

export const TabsHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
  overflow: hidden;
margin-left: ${({ theme }) => theme.spacing.sm};
  z-index: 2;
  position: relative;
`;

export const TabButton = styled.button`
  ${craftBorder}
  background: ${props => props.active ? props.theme.colors.secondary : props.theme.colors.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  white-space: nowrap;
  color: ${props => props.active ? props.theme.colors.text.primary : props.theme.colors.secondary};
  font-size: 18px;
  min-width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const TabContent = styled.div`
  overflow: auto;
  margin-left: ${({ theme }) => theme.spacing.sm};
  margin-right: ${({ theme }) => theme.spacing.sm};
  border-radius: 0 0 ${({ theme }) => theme.radii.lg} ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.secondary};
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  height: 100%;
  place-items: center;

  > div {
    ${tertiaryLevel}
    border-radius: ${({ theme }) => theme.radii.sm};
    padding: 2px;
  }
`;

export const ItemBadge = styled.span`
  position: absolute;
  right: -6px;
  bottom: -6px;
  ${craftBorderHeavy}
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 10px;
  line-height: 1;
  padding: 2px 4px;
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const InfoFooter = styled.div`
  ${metalBg}
  ${craftBorder}
  padding: ${({ theme }) => theme.spacing.xs};
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const FooterLine = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.secondary};
`;
