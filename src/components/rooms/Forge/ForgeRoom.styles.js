// src/components/rooms/Forge/ForgeRoom.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const ForgeGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const ForgeTitle = styled.h1`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  z-index: ${({ theme }) => theme.zIndex.level1};
  font-family: ${({ theme }) => theme.typography.families.ui};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.background, 0.8)};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(8px);
`;

export const TabContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: ${({ theme }) => `${theme.borders.thin} solid ${alpha(theme.colors.primary, 0.2)}`};
  background: ${({ theme }) => alpha(theme.colors.background, 0.5)};
  border-radius: ${({ theme }) => `${theme.radii.md} ${theme.radii.md} 0 0`};
`;

export const TabButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, active }) =>
    active ? alpha(theme.colors.primary, 0.2) : 'transparent'};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text};
  border: ${({ theme, active }) =>
    active ? `${theme.borders.base} solid ${theme.colors.primary}` : `${theme.borders.thin} solid ${alpha(theme.colors.border, 0.5)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) =>
    `all ${theme.motion.durations.base} ${theme.motion.easings.standard}`};
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme, active }) => active ? '600' : '400'};

  &:hover {
    background: ${({ theme, active }) =>
      active ? alpha(theme.colors.primary, 0.3) : alpha(theme.colors.primary, 0.1)};
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DevToolContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.backgroundDark, 0.3)};
  border-radius: ${({ theme }) => `0 0 ${theme.radii.md} ${theme.radii.md}`};
  min-height: 400px;
  position: relative;
`;

export const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-family: ${({ theme }) => theme.typography.families.ui};
`;

export const IframeContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 500px;
  border: ${({ theme }) => `${theme.borders.thin} solid ${alpha(theme.colors.border, 0.3)}`};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.white};
`;
