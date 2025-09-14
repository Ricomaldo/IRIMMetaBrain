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

// Styles pour les nouveaux panneaux éditables
// (Les panneaux utilisent maintenant EditablePanel avec wrappers parchemin)

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
  ${props => props.theme.typography.families.primary ? `
    font-family: ${props.theme.typography.families.primary};
    font-size: ${props.theme.typography.sizes.lg};
    font-weight: ${props.theme.typography.weights.bold};
    line-height: ${props.theme.typography.lineHeights.tight};
  ` : `
    font-size: 12px;
    font-weight: bold;
  `}
  height: 40px;
  margin-top: 32px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
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
  TitreProjetPanel
};
