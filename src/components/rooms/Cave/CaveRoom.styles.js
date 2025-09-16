// src/components/rooms/Cave/CaveRoom.styles.js

import styled from 'styled-components';

export const CaveGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;
