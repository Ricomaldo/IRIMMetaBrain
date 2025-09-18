// src/components/rooms/Forge/ForgeRoom.styles.js

import styled from "styled-components";
import { alpha } from "../../../styles/color";
import { secondaryLevel, metalBg } from "../../../styles/mixins";

export const ForgeTitle = styled.h1`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  z-index: ${({ theme }) => theme.zIndex.level1};
  font-family: ${({ theme }) => theme.typography.families.ui};
  margin: 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.background, 0.8)};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(8px);
`;

export const ForgeToolbar = styled.div`
  ${secondaryLevel}
  ${metalBg}
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  z-index: ${({ theme }) => theme.zIndex.level1};
`;
