// src/components/rooms/Atelier/AtelierPanels/AtelierPanels.styles.js

import styled from 'styled-components';
import { parchmentBg } from '../../../../styles/mixins';

export const PanelsContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  height: 80%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
  z-index: 10;
`;

export const Panel = styled.div`
  ${parchmentBg}
  border: 2px solid #A0522D;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  padding-bottom: 6px;
  border-bottom: 1px solid ${props => props.theme.colors.border};
`;

export const PanelTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const PanelBadge = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 10px;
  font-weight: bold;
`;

export const PanelContent = styled.div`
  flex: 1;
  overflow-y: auto;
  font-size: 11px;
  line-height: 1.4;
`;

export const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Item = styled.div`
  padding: 6px 8px;
  background: rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(139, 69, 19, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
  }
`;

export const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ItemText = styled.div`
  color: ${props => props.theme.colors.text.primary};
  font-weight: ${props => props.bold ? 'bold' : 'normal'};
`;

export const ItemMeta = styled.div`
  font-size: 9px;
  color: ${props => props.theme.colors.text.secondary};
  opacity: 0.7;
`;

export const ItemStatus = styled.span`
  padding: 2px 6px;
  border-radius: 8px;
  font-size: 9px;
  font-weight: bold;
  white-space: nowrap;

  &.high { background: #ffebee; color: #d32f2f; }
  &.medium { background: #fff3e0; color: #f57c00; }
  &.low { background: #e8f5e8; color: #388e3c; }
  &.pending { background: #f3e5f5; color: #7b1fa2; }
  &.in_progress { background: #e3f2fd; color: #1976d2; }
  &.completed { background: #e8f5e8; color: #388e3c; }
  &.en_cours { background: #e3f2fd; color: #1976d2; }
`;

export const AddButton = styled.button`
  width: 100%;
  padding: 6px;
  margin-top: 8px;
  border: 1px dashed rgba(139, 69, 19, 0.4);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.3);
  color: ${props => props.theme.colors.text.secondary};
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    border-color: ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text.primary};
  }
`;

export const NextActionPanel = styled(Panel)`
  grid-column: 1 / -1;
  grid-row: 2;
  max-height: 120px;
`;

export const NextActionContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
`;

export const ActionText = styled.div`
  flex: 1;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

export const ActionMeta = styled.div`
  font-size: 10px;
  color: ${props => props.theme.colors.text.secondary};
  text-align: right;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: 1px solid rgba(139, 69, 19, 0.3);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  color: ${props => props.theme.colors.text.secondary};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;

  &:hover {
    background: rgba(255, 255, 255, 1);
    color: ${props => props.theme.colors.text.primary};
  }
`;