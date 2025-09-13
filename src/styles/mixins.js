// src/styles/mixins.js

import { css } from 'styled-components';
import { textures } from '../utils/assetMapping';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const craftBorder = css`
  border: 4px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const parchmentBg = css`
  background: ${props => props.theme.colors.secondary};
  background-image: url(${textures.parchment});
  background-size: cover;
  opacity: 0.8;
`;

export const stoneBg = css`
  background: ${props => props.theme.colors.stone};
  background-image: url(${textures.stone}),
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: cover, 8px 8px;
  opacity: 0.8;
`;

export const woodBg = css`
  background: ${props => props.theme.colors.secondary};
  background-image: url(${textures.wood});
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

export const metalBg = css`
  background: ${props => props.theme.colors.stone};
  background-image: url(${textures.metal});
  background-size: cover;
  background-position: center;
  opacity: 0.8;
`;

export const craftBorderHeavy = css`
  border: 4px solid #8B4513;
  border-radius: 8px;
  box-shadow: 
    inset 0 0 0 2px #D2B48C,
    inset 0 0 0 4px #A0522D,
    0 4px 8px rgba(0,0,0,0.3),
    0 2px 4px rgba(0,0,0,0.2);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: 2px solid #CD853F;
    border-radius: 10px;
    pointer-events: none;
  }
`;

export const medievalShadow = css`
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))
          drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
`;


export const squareButton = (size = 'medium') => css`
  width: ${props => props.theme.button[size]};
  height: ${props => props.theme.button[size]};
  ${flexCenter}
  flex-direction: column;
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: ${size === 'small' ? '14px' : size === 'large' ? '20px' : '16px'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  }
`;

export const primaryLevel = css`
  ${craftBorderHeavy}
  ${medievalShadow}
  z-index: 3;
  position: relative;
`;

export const secondaryLevel = css`
  ${craftBorder}
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  z-index: 2;
  position: relative;
`;

export const tertiaryLevel = css`
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  z-index: 1;
  position: relative;
  opacity: 0.9;
`;
