// src/components/common/Panel/Panel.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const PanelWrapper = styled.div`
  grid-column: ${props => props.$gridColumn};
  grid-row: ${props => props.$gridRow};
  position: relative;
`;

export const PanelContainer = styled.div`
  width: 100%;
  height: ${props => props.$collapsed ? 'auto' : '100%'};
  max-height: ${props => props.$collapsed ? 'none' : props.$maxHeight};
  ${parchmentBg}
  border-radius: ${({ theme }) => theme.radii.xl};
  border: ${({ theme }) => `${theme.borders.thick} solid ${theme.colors.border}`};
  box-shadow:
    0 8px 16px rgba(0,0,0,0.25),
    inset 0 1px 0 ${({ theme }) => theme.surfaces.base},
    inset 0 -1px 0 ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.sm};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: height 0.3s ease, max-height 0.3s ease;

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
      ${'${({ theme }) => theme.colors.secondary}'} 100%
    );
    border-radius: ${({ theme }) => theme.radii.md};
    z-index: 0;
  }
`;

export const PanelHeader = styled.div`
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  display: flex;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  background: ${props => {
    if (props.$variant === 'roadmap') return props.theme.colors.accents.cold;
    if (props.$variant === 'todo') return props.theme.colors.accents.success;
    if (props.$variant === 'notes') return props.theme.colors.accents.warm;
    return props.theme.colors.accents.cold;
  }};
  color: ${({ theme }) => theme.colors.text.light};
  border-radius: 6px 6px 0 0;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  position: relative;
  z-index: 1;
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PanelBadge = styled.span`
  background: ${({ theme }) => theme.surfaces.base};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: 2px 8px;
  border-radius: ${({ theme }) => theme.radii.xl};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  border: 1px solid ${({ theme }) => theme.colors.border};
  min-width: 20px;
  text-align: center;
`;

export const ToggleButton = styled.button`
  background: ${props => props.$active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 24px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);

  &:hover {
    background: #FFFFFF;
    transform: translateY(-1px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PanelContent = styled.div`
  flex: 1;
  background: ${props => {
    if (props.$variant === 'roadmap') return props.theme.colors.accents.cold;
    if (props.$variant === 'todo') return props.theme.colors.accents.success;
    if (props.$variant === 'notes') return props.theme.colors.accents.warm;
    return props.theme.colors.accents.cold;
  }};
  border-radius: 0 0 ${({ theme }) => theme.radii.sm} ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
  padding: ${({ theme }) => theme.spacing.sm};
  min-height: 0;
`;