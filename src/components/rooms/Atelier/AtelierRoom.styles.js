// src/components/rooms/Atelier/AtelierRoom.styles.js

import styled from 'styled-components';


// Grid 5x4 Layout final :
// [    ][    ][    ][    ]
// [RoadMap 2x2][   ][Todo][     ]
// [           ][   ][    ][     ]
// [   ][TitreProjet][   ][RoomNote]

const AtelierGrid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
  padding: 64px;
`;

// Styles des composants Atelier
const RoadmapPanel = styled.div`
  grid-column:  4 / 6;
  grid-row: 1 / 4;
  border: 2px dashed #666;
  padding: 8px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
`;

const TodoPanel = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 4;
  border: 2px dashed #666;
  padding: 8px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.background};
  overflow-y: auto;
`;

const TitreProjetPanel = styled.div`
  grid-column: 3 / 4;
  grid-row: 4;
  border: 2px solid ${props => props.theme.colors.accents.cold};
  background: ${props => props.theme.colors.accents.cold};
  color: ${props => props.theme.colors.text.light};
  border-radius: 4px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  height: 40px;
  margin-top:32px;
`;


const RoomNotePanel = styled.div`
  grid-column: 1;
  grid-row: 4;
  position: relative;
`;

const PanelTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 12px;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
`;

export {
  AtelierGrid,
  RoadmapPanel,
  TodoPanel,
  TitreProjetPanel,
  RoomNotePanel,
  PanelTitle
};
