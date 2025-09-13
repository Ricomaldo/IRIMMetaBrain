// components/layout/RoomCanvas/RoomCanvas.styles.js
import styled from 'styled-components';
import { craftBorder } from '../../../styles/mixins';

export const CanvasContainer = styled.div`
  width: 75%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${craftBorder}
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100%);
  grid-template-rows: repeat(3, 100vh);
  transition: transform 0.4s ease-out;
  width: 400%; /* 4 colonnes */
  height: 300%; /* 3 rangées */
`;

export const RoomSlot = styled.div`
  ${craftBorder}
  background: ${props => {
    const roomColors = {
      chambre: '#FFE4B5',
      atelier: '#DEB887',
      forge: '#CD853F',
      boutique: '#F0E68C',
      empty: '#F5F5F5'
    };
    return roomColors[props.roomType] || roomColors.empty;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.spacing.lg};
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
`;

// components/layout/SideTower/SideTower.styles.js
import styled from 'styled-components';
import { craftBorder } from '../../../styles/mixins';

export const PanelContainer = styled.div`
  width: 25%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${craftBorder}
  background: ${props => props.theme.colors.secondary};
`;

// components/layout/SideTower/ControlTower/ControlTower.styles.js
import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const TowerContainer = styled.div`
  height: 100px;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.primary};
  color: white;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

// components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.styles.js
import styled from 'styled-components';
import { craftBorder, flexCenter } from '../../../../styles/mixins';

export const DrawerContainer = styled.div`
  height: 100px;
  ${craftBorder}
  ${flexCenter}
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
  background: ${props => props.theme.colors.accent};
`;

export const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${props => props.theme.spacing.xs};
  width: 100%;
  padding: ${props => props.theme.spacing.sm};
`;

// components/common/IconButton/IconButton.styles.js
import styled from 'styled-components';
import { flexCenter } from '../../../styles/mixins';

export const ButtonContainer = styled.button`
  ${flexCenter}
  flex-direction: column;
  padding: ${props => props.theme.spacing.xs};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  background: ${props => props.active ? props.theme.colors.accent : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.theme.colors.accent};
    transform: translateY(-1px);
  }
`;

export const IconWrapper = styled.div`
  font-size: 16px;
  margin-bottom: 2px;
`;

export const Label = styled.span`
  font-size: 10px;
  color: ${props => props.theme.colors.text.secondary};
`;