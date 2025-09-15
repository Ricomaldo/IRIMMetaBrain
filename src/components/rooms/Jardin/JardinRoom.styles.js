// src/components/rooms/Jardin/JardinRoom.styles.js

import styled from 'styled-components';

export const JardinGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 1fr 2fr;
  grid-template-rows: repeat(4, 1fr);
  gap: 18px;
`;
