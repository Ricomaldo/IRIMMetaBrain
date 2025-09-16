// src/components/rooms/Atelier/AtelierRoom.styles.js

import styled from 'styled-components';
import { metalBg } from '../../../styles/mixins';
export const AtelierGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PanelTitle = styled.div`
  ${metalBg}
  color: ${({ theme }) => theme.colors.text.light};
  border: 2px solid ${({ theme }) => theme.colors.border || '#ccc'};
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.typography.sizes.md || '14px'};
  font-weight: ${({ theme }) => theme.typography.weights.bold || 'bold'};
  opacity: 1;
  height: 32px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

