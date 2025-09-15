// src/components/layout/StudioHall/StudioHall.styles.js

import styled from 'styled-components';

export const StudioContainer = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  height: 100svh;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm};
  background: black;
  box-sizing: border-box;
`;
