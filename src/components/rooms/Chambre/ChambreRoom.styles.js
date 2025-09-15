// src/components/rooms/Chambre/ChambreRoom.styles.js

import styled from 'styled-components';

export const ChambreGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 12px;
`;
