// src/components/rooms/Chambre/ChambreRoom.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const ChambreGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
`;

export const ChambreTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  font-family: ${({ theme }) => theme.typography.families.ui};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.background, 0.8)};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(8px);
  text-align: center;
`;
