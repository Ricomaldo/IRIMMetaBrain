// src/components/rooms/Cuisine/CuisineRoom.styles.js

import styled from 'styled-components';

export const CuisineGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 2fr;
  gap: 15px;
`;
