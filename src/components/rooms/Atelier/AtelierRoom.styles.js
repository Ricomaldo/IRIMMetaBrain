// src/components/rooms/Atelier/AtelierRoom.styles.js

import styled from 'styled-components';


// Grid 5x4 Layout final :
// [    ][    ][    ][    ]
// [RoadMap 2x2][   ][Todo][     ]
// [           ][   ][    ][     ]
// [   ][TitreProjet][   ][RoomNote]

const AtelierGrid = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 8px;
`;

// Styles pour les nouveaux panneaux éditables
// (Les panneaux utilisent maintenant EditablePanel avec wrappers parchemin)

const ProjetNameBar = styled.div`
  grid-column: 1 / -1;
  grid-row: 1;
  background: rgba(0, 0, 0, 0.1);
  color: ${props => props.theme.colors.text.secondary};
  border-radius: 4px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.medium};
  opacity: 0.8;
  height: 24px;
  z-index: 1;
`;


const PanelTitle = styled.h3`
  ${props => props.theme.typography.families.primary ? `
    font-family: ${props.theme.typography.families.primary};
    font-size: ${props.theme.typography.sizes.md};
    font-weight: ${props.theme.typography.weights.bold};
    letter-spacing: ${props.theme.typography.letterSpacing.wider};
  ` : `
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 0.5px;
  `}
  margin: 0 0 12px 0;
  text-align: center;
  opacity: 0.95;
  text-transform: uppercase;
  line-height: ${props => props.theme.typography?.lineHeights?.tight || '1.2'};
  color: inherit;
`;

export {
  AtelierGrid,
  ProjetNameBar
};
