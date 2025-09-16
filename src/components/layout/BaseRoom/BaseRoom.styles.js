// src/components/rooms/shared/BaseRoom/BaseRoom.styles.js

import styled from 'styled-components';

export const BaseRoomContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => !['layoutType'].includes(prop)
})`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 64px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  /* Important pour éviter que les enfants grid ne poussent hors du viewport */
  min-height: 0;
  min-width: 0;
`;
