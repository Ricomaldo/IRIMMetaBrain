// src/components/rooms/Forge/ForgeRoom.styles.js

import styled from 'styled-components';

export const ForgeGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.sm};
`;
