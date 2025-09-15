// src/styles/mixins.js

import { css } from 'styled-components';
import { textures } from '../utils/assetMapping';
import { alpha } from './color';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const craftBorder = css`
  border: ${({ theme }) => `${theme.borders.heavy} solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

export const parchmentBg = css`
  background: ${({ theme }) => theme.colors.secondary};
  background-image: url(${textures.parchment});
  background-size: cover;
  opacity: 1;
`;

export const stoneBg = css`
  background: ${({ theme }) => theme.colors.stone};
  background-image: url(${textures.stone}),
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: cover, 8px 8px;
  opacity: 1;
`;

export const woodBg = css`
  background: ${({ theme }) => theme.colors.secondary};
  background-image: url(${textures.wood});
  background-size: cover;
  background-position: center;
  opacity: 1;
`;

export const metalBg = css`
  background: ${({ theme }) => theme.colors.stone};
  background-image: url(${textures.metal});
  background-size: cover;
  background-position: center;
  opacity: 1;
`;

export const craftBorderHeavy = css`
  border: ${({ theme }) => `${theme.borders.heavy} solid ${theme.colors.primary}`};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow:
    inset 0 0 0 2px ${({ theme }) => theme.colors.secondary},
    inset 0 0 0 4px ${({ theme }) => theme.colors.border},
    ${({ theme }) => theme.shadows.lg},
    ${({ theme }) => theme.shadows.md};
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.accent}`};
    border-radius: ${({ theme }) => `calc(${theme.radii.lg} + 2px)`};
    pointer-events: none;
  }
`;

export const medievalShadow = css`
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.4))
          drop-shadow(1px 1px 2px rgba(0,0,0,0.2));
`;


export const squareButton = (size = 'medium') => css`
  width: ${({ theme }) => theme.button[size]};
  height: ${({ theme }) => theme.button[size]};
  ${flexCenter}
  flex-direction: column;
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: ${({ theme }) => `all ${theme.motion.durations.base} ${theme.motion.easings.standard}`};
  font-size: ${size === 'small' ? '14px' : size === 'large' ? '20px' : '16px'};

  &:hover {
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: scale(0.95);
    box-shadow: ${({ theme }) => `${theme.shadows.sm}, inset 0 1px 3px rgba(0,0,0,0.2)`};
  }
`;

export const primaryLevel = css`
  ${craftBorderHeavy}
  ${medievalShadow}
  z-index: ${({ theme }) => theme.zIndex.level3};
  position: relative;
`;

export const secondaryLevel = css`
  ${craftBorder}
  box-shadow: ${({ theme }) => theme.shadows.md};
  z-index: ${({ theme }) => theme.zIndex.level2};
  position: relative;
`;

export const tertiaryLevel = css`
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.sm};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  z-index: ${({ theme }) => theme.zIndex.level1};
  position: relative;
  opacity: 1;
`;
