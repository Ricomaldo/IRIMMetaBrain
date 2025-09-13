// src/components/layout/RoomCanvas/RoomCanvas.styles.js

import styled from 'styled-components';
import { craftBorder } from '../../../styles/mixins';

export const CanvasContainer = styled.div`
  width: 75%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${craftBorder}
  cursor: pointer;
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100%);
  grid-template-rows: repeat(3, 100vh);
  transition: transform 0.4s ease-out;
  width: 400%;
  height: 300%;
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
  background: transparent;

  &.zone-top {
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    cursor: n-resize;
  }

  &.zone-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    cursor: s-resize;
  }

  &.zone-left {
    top: 50px;
    bottom: 50px;
    left: 0;
    width: 50px;
    cursor: w-resize;
  }

  &.zone-right {
    top: 50px;
    bottom: 50px;
    right: 0;
    width: 50px;
    cursor: e-resize;
  }
`;
