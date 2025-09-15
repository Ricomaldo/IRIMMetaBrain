// src/components/rooms/Atelier/AtelierRoom.styles.js

import styled from 'styled-components';

const AtelierGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MarkdownPanelContainer = styled.div`
  ${props => props.gridColumn && `grid-column: ${props.gridColumn};`}
  ${props => props.gridRow && `grid-row: ${props.gridRow};`}
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
`;

const PanelTitle = styled.div`
  grid-column: 2 / 5;
  grid-row: 4;
  background: rgba(255, 255, 255, 0.9);
  color: ${({ theme }) => theme.colors.text.primary || '#333'};
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
  margin-top: 30px;
`;



export {
  AtelierGrid,
  PanelTitle,
  MarkdownPanelContainer
};
