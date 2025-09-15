// src/components/layout/RoomCanvas/RoomCanvas.styles.js

import styled from 'styled-components';
import { craftBorder, craftBorderHeavy, parchmentBg, medievalShadow } from '../../../styles/mixins';

export const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  ${craftBorderHeavy}
  ${parchmentBg}
  cursor: crosshair;
  padding: ${props => props.theme.spacing.md};
  box-sizing: border-box;
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  transition: transform 0.4s ease-out;
  width: 400%;
  height: 300%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const RoomSlot = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !['roomType', 'roomColors', 'background'].includes(prop)
})`
  ${craftBorder}
  background: ${props => props.roomColors?.[props.roomType] || '#2F1B14'};
  background-image: ${props => props.background ? `url(${props.background})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.spacing.lg};
  font-weight: bold;
  font-family: ${props => props.theme.fonts.main};
  color: ${props => props.theme.colors.text.primary};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  position: relative;
  margin: 2px;
  border-radius: 6px;
  ${medievalShadow}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${props => props.background ?
      'linear-gradient(rgba(139,69,19,0.2), rgba(139,69,19,0.4))' :
      'none'};
    border-radius: 4px;
    pointer-events: none;
  }
`;

export const RoomTitleOverlay = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 15;
  
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.weights.bold};
  color: ${props => props.theme.colors.text.primary};
  text-align: center;
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
  user-select: none;
  
  background: rgba(0, 0, 0, 0.3);
  padding: 8px 16px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
`;

export const NavigationZone = styled.div`
  position: absolute;
  background: ${props => `${props.theme.colors.primary}66`}; /* 40% opacity */
  border: 2px solid rgba(210, 180, 140, 0.6);
  border-radius: 8px;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F4E4BC;
  font-size: 24px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
  opacity: 0.7;
  transition: all 0.3s ease;
  ${medievalShadow}

  &.zone-top {
    top: ${props => props.theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 40px;
    cursor: n-resize;
  }

  &.zone-bottom {
    bottom: ${props => props.theme.spacing.md};
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 40px;
    cursor: s-resize;
  }

  &.zone-left {
    top: 50%;
    transform: translateY(-50%);
    left: ${props => props.theme.spacing.md};
    width: 40px;
    height: 60px;
    cursor: w-resize;
  }

  &.zone-right {
    top: 50%;
    transform: translateY(-50%);
    right: ${props => props.theme.spacing.md};
    width: 40px;
    height: 60px;
    cursor: e-resize;
  }

  &:hover {
    opacity: 1;
    background: ${props => `${props.theme.colors.primary}99`}; /* 60% opacity */
    border-color: rgba(218, 165, 32, 0.8);
    transform: ${props => 
      props.className?.includes('zone-top') ? 'translateX(-50%) translateY(-2px)' :
      props.className?.includes('zone-bottom') ? 'translateX(-50%) translateY(2px)' :
      props.className?.includes('zone-left') ? 'translateY(-50%) translateX(-2px)' :
      'translateY(-50%) translateX(2px)'
    };
  }
`;
