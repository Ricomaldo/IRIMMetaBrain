// src/styles/mixins.js

import { css } from 'styled-components';
import { textures } from '../utils/assetMapping';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const craftBorder = css`
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const parchmentBg = css`
  background: ${props => props.theme.colors.secondary};
  background-image: url(${textures.parchment});
  background-size: cover;
`;

export const stoneBg = css`
  background: ${props => props.theme.colors.stone};
  background-image: url(${textures.stone}),
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: cover, 8px 8px;
`;
