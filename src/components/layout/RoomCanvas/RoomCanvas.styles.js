// src/components/layout/RoomCanvas/RoomCanvas.styles.js

import styled from 'styled-components';
import { craftBorder } from '../../../styles/mixins';

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  ${craftBorder}
  cursor: pointer;
  padding: ${props => props.theme.spacing.sm};
  box-sizing: border-box;
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100%);
  grid-template-rows: repeat(3, 100%);
  transition: transform 0.4s ease-out;
  width: 400%;
  height: 300%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const RoomSlot = styled.div`
  ${craftBorder}
  background: ${props => props.roomColors?.[props.roomType] || '#000000'};
  background-image: ${props => props.background ? `url(${props.background})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.spacing.lg};
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  position: relative;
`;

export const NavigationZone = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.3);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;

  &.zone-top {
    top: ${props => props.theme.spacing.sm};
    left: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    height: 50px;
    cursor: n-resize;
  }

  &.zone-bottom {
    bottom: ${props => props.theme.spacing.sm};
    left: ${props => props.theme.spacing.sm};
    right: ${props => props.theme.spacing.sm};
    height: 50px;
    cursor: s-resize;
  }

  &.zone-left {
    top: calc(50px + ${props => props.theme.spacing.sm});
    bottom: calc(50px + ${props => props.theme.spacing.sm});
    left: ${props => props.theme.spacing.sm};
    width: 50px;
    cursor: w-resize;
  }

  &.zone-right {
    top: calc(50px + ${props => props.theme.spacing.sm});
    bottom: calc(50px + ${props => props.theme.spacing.sm});
    right: ${props => props.theme.spacing.sm};
    width: 50px;
    cursor: e-resize;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
