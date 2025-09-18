// src/components/rooms/Forge/ForgeRoom.styles.js

import styled from "styled-components";
import { alpha } from "../../../styles/color";
import { secondaryLevel, metalBg } from "../../../styles/mixins";

export const ForgeTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes["2xl"]};
  color: ${({ theme }) => theme.colors.primary};
  text-shadow: 0 2px 4px ${({ theme }) => alpha(theme.colors.black, 0.3)};
  font-family: ${({ theme }) => theme.typography.families.ui};
  margin: 0 0 ${({ theme }) => theme.spacing.md} 0;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.background, 0.8)};
  border-radius: ${({ theme }) => theme.radii.lg};
  backdrop-filter: blur(8px);
  text-align: center;
`;

export const ForgeToolbar = styled.div`
  ${secondaryLevel}
  ${metalBg}
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-top: ${({ theme }) => theme.spacing.md};
`;
