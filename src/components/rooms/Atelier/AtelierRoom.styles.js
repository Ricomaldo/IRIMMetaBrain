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
  border: 2px solid ${props => props.theme.colors.border};
  padding: 12px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.accents.cold};
  color: ${props => props.theme.colors.text.light};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  overflow-y: auto;
`;

const TodoPanel = styled.div`
  grid-column: 1 / 3;
  grid-row: 1 / 4;
  border: 2px solid ${props => props.theme.colors.border};
  padding: 12px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.colors.accents.success};
  color: ${props => props.theme.colors.text.light};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  overflow-y: auto;
`;

const TitreProjetPanel = styled.div`
  grid-column: 3 / 4;
  grid-row: 4;
  border: 2px solid ${props => props.theme.colors.border};
  background: ${props => props.theme.colors.accents.cold};
  color: ${props => props.theme.colors.text.light};
  border-radius: 8px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  height: 40px;
  margin-top: 32px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
`;


const PanelTitle = styled.h3`
  margin: 0 0 12px 0;
  font-size: 13px;
  font-weight: bold;
  text-align: center;
  opacity: 0.95;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${props => props.theme.colors.primary};
`;

export {
  AtelierGrid,
  RoadmapPanel,
  TodoPanel,
  TitreProjetPanel,
  PanelTitle
};
