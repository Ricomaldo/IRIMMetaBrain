// src/components/rooms/Undefined/UndefinedRoom.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const UndefinedGrid = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SandboxContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.backgroundDark} 0%, ${theme.colors.background} 100%)`};
`;

export const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.black, 0.5)};
  border: ${({ theme }) => `${theme.borders.base} solid ${alpha(theme.colors.primary, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(10px);

  h2 {
    margin: 0;
    color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
    font-family: ${({ theme }) => theme.typography.families.ui};
  }
`;

export const GridButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $active }) =>
    $active ? alpha(theme.colors.primary, 0.3) : alpha(theme.colors.white, 0.1)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.text};
  border: ${({ theme, $active }) =>
    $active ? `${theme.borders.base} solid ${theme.colors.primary}` : `${theme.borders.thin} solid ${alpha(theme.colors.border, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-family: ${({ theme }) => theme.typography.families.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, $active }) => $active ? 'bold' : 'normal'};
  cursor: pointer;
  transition: ${({ theme }) => `all ${theme.motion.durations.fast} ${theme.motion.easings.standard}`};

  &:hover {
    background: ${({ theme }) => alpha(theme.colors.primary, 0.2)};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TestArea = styled.div`
  flex: 1;
  min-height: 0;
  background: ${({ theme }) => alpha(theme.colors.black, 0.3)};
  border: ${({ theme }) => `${theme.borders.thin} dashed ${alpha(theme.colors.primary, 0.2)}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: auto;
  position: relative;

  &::before {
    content: 'Test Area';
    position: absolute;
    top: ${({ theme }) => theme.spacing.xs};
    right: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => alpha(theme.colors.primary, 0.3)};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
    font-family: ${({ theme }) => theme.typography.families.mono};
    text-transform: uppercase;
    letter-spacing: 2px;
  }
`;

export const InfoBadge = styled.div`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => alpha(theme.colors.primary, 0.1)};
  border: ${({ theme }) => `${theme.borders.thin} solid ${alpha(theme.colors.primary, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.typography.families.mono};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  white-space: nowrap;
`;