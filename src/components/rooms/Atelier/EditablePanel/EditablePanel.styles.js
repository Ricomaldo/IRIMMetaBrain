// src/components/rooms/Atelier/EditablePanel/EditablePanel.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../../styles/mixins';

export const PanelWrapper = styled.div`
  grid-column: ${props => props.$gridColumn};
  grid-row: ${props => props.$gridRow};
  position: relative;
`;

export const PanelContainer = styled.div`
  width: 100%;
  height: 100%;
  ${parchmentBg}
  border-radius: 12px;
  border: 3px solid ${props => props.theme.colors.border};
  box-shadow:
    0 8px 16px rgba(0,0,0,0.25),
    inset 0 1px 0 #FFFFFF,
    inset 0 -1px 0 #8B4513;
  padding: 12px;
  position: relative;
  display: flex;
  flex-direction: column;

  // Effet parchemin authentique
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      #F5F5DC 0%,
      #E8E2D6 50%,
      #D2B48C 100%
    );
    border-radius: 9px;
    z-index: 0;
  }
`;

export const PanelHeader = styled.div`
  padding: 8px 12px;
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background: ${props => {
    if (props.$panelType === 'roadmap') return props.theme.colors.accents.cold;
    if (props.$panelType === 'todo') return props.theme.colors.accents.success;
    return props.theme.colors.accents.cold;
  }};
  color: ${props => props.theme.colors.text.light};
  border-radius: 6px 6px 0 0;
  margin-bottom: 8px;
  position: relative;
  z-index: 1;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const PanelBadge = styled.span`
  background: #FFFFFF;
  color: ${props => props.theme.colors.text.primary};
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.bold};
  border: 1px solid ${props => props.theme.colors.border};
  min-width: 20px;
  text-align: center;
`;

export const ToggleButton = styled.button`
  background: ${props => props.$active ? '#FFFFFF' : '#F0F0F0'};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  color: ${props => props.theme.colors.text.primary};
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 24px;

  &:hover {
    background: #FFFFFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  background: ${props => {
    if (props.$panelType === 'roadmap') return props.theme.colors.accents.cold;
    if (props.$panelType === 'todo') return props.theme.colors.accents.success;
    return props.theme.colors.accents.cold;
  }};
  border-radius: 0 0 6px 6px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;