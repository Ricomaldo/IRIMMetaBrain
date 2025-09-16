// src/components/rooms/Scriptorium/ScriptoriumRoom.styles.js

import styled from 'styled-components';

export const ScriptoriumGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 2fr;
  gap: ${({ theme }) => theme.spacing.md};
`;
