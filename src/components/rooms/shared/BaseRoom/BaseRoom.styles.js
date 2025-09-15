// src/components/rooms/shared/BaseRoom/BaseRoom.styles.js

import styled from 'styled-components';

export const BaseRoomContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 64px;
  
  ${props => props.layoutType === 'flex' ? `
    display: flex;
    align-items: center;
    justify-content: center;
  ` : props.layoutType === 'grid' ? `
    display: grid;
  ` : ''}
`;
