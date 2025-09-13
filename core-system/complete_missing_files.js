// styles/theme.js
export const theme = {
  colors: {
    primary: '#8B4513',
    secondary: '#D2B48C',
    accent: '#CD853F',
    background: '#F5F5DC',
    border: '#A0522D',
    stone: '#708090',
    text: {
      primary: '#2F1B14',
      secondary: '#5D4037'
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  fonts: {
    main: '"Cinzel", serif',
    mono: '"Courier New", monospace'
  }
};

// utils/assetMapping.js
export const roomBackgrounds = {
  chambre: '/assets/rooms/chambre-cozy.jpg',
  atelier: '/assets/rooms/atelier-workbench.jpg',
  forge: '/assets/rooms/forge-fire.jpg',
  boutique: '/assets/rooms/boutique-medieval.jpg'
};

export const roomColors = {
  chambre: '#FFE4B5',
  atelier: '#DEB887',
  forge: '#CD853F',
  boutique: '#F0E68C',
  empty: '#F5F5F5'
};

export const wireframeColors = {
  chambre: '#FFFFFF',
  atelier: '#FFFFFF', 
  forge: '#FFFFFF',
  boutique: '#FFFFFF',
  empty: '#000000'
};

export const textures = {
  parchment: '/assets/ui/parchment-texture.jpg',
  stone: '/assets/ui/stone-wall.jpg',
  wood: '/assets/ui/wood-grain.jpg',
  metal: '/assets/ui/metal-surface.jpg'
};

export const icons = {
  expand: '➡️',
  collapse: '⬇️',
  note: '📝'
};

// styles/mixins.js
import { css } from 'styled-components';
import { textures } from '../utils/assetMapping';

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const craftBorder = css`
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: 4px;
`;

export const parchmentBg = css`
  background: ${props => props.theme.colors.secondary};
  background-image: url(${textures.parchment});
  background-size: cover;
`;

export const stoneBg = css`
  background: ${props => props.theme.colors.stone};
  background-image: url(${textures.stone}), 
                    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%);
  background-size: cover, 8px 8px;
`;

// utils/roomPositions.js
import { roomBackgrounds } from './assetMapping';

export const roomConfig = [
  { x: 0, y: 0, type: 'empty', name: '', background: null },
  { x: 1, y: 0, type: 'chambre', name: 'Chambre', background: roomBackgrounds.chambre },
  { x: 2, y: 0, type: 'empty', name: '', background: null },
  { x: 3, y: 0, type: 'empty', name: '', background: null },
  { x: 0, y: 1, type: 'boutique', name: 'Boutique', background: roomBackgrounds.boutique },
  { x: 1, y: 1, type: 'atelier', name: 'Atelier', background: roomBackgrounds.atelier },
  { x: 2, y: 1, type: 'forge', name: 'Forge', background: roomBackgrounds.forge },
  { x: 3, y: 1, type: 'empty', name: '', background: null },
  { x: 0, y: 2, type: 'empty', name: '', background: null },
  { x: 1, y: 2, type: 'empty', name: '', background: null },
  { x: 2, y: 2, type: 'empty', name: '', background: null },
  { x: 3, y: 2, type: 'empty', name: '', background: null }
];

export const getAdjacentRooms = (currentPos) => {
  return {
    up: currentPos.y > 0 ? { x: currentPos.x, y: currentPos.y - 1 } : null,
    down: currentPos.y < 2 ? { x: currentPos.x, y: currentPos.y + 1 } : null,
    left: currentPos.x > 0 ? { x: currentPos.x - 1, y: currentPos.y } : null,
    right: currentPos.x < 3 ? { x: currentPos.x + 1, y: currentPos.y } : null
  };
};

export const isValidPosition = (pos) => {
  return pos && pos.x >= 0 && pos.x <= 3 && pos.y >= 0 && pos.y <= 2;
};

// utils/buttonMapping.js
export const controlButtons = [
  { id: 'calendar', icon: '📅', label: 'Calendrier', action: () => console.log('Calendar') },
  { id: 'timer', icon: '⏱️', label: 'Timer', action: () => console.log('Timer') },
  { id: 'settings', icon: '⚙️', label: 'Config', action: () => console.log('Settings') }
];

export const workbenchButtons = [
  { id: 'github', icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com') },
  { id: 'vscode', icon: '💻', label: 'VS Code', action: () => console.log('VS Code') },
  { id: 'arc', icon: '🌐', label: 'Arc', action: () => console.log('Arc') },
  { id: 'cursor', icon: '🎯', label: 'Cursor', action: () => console.log('Cursor') }
];

// components/layout/StudioHall/StudioHall.styles.js
import styled from 'styled-components';

export const StudioContainer = styled.div`
  display: flex;
  height: 100vh;
  background: ${props => props.theme.colors.background};
`;

// components/layout/RoomCanvas/RoomCanvas.styles.js
import styled from 'styled-components';
import { craftBorder } from '../../../styles/mixins';

export const CanvasContainer = styled.div`
  width: 75%;
  height: 100vh;
  overflow: hidden;
  position: relative;
  ${craftBorder}
  cursor: pointer;
`;

export const RoomsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 100%);
  grid-template-rows: repeat(3, 100vh);
  transition: transform 0.4s ease-out;
  width: 400%;
  height: 300%;
`;

export const RoomSlot = styled.div`
  ${craftBorder}
  background: ${props => props.roomColors?.[props.roomType] || '#000000'};
  background-image: ${props => props.background ? `url(${props.background})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.spacing.lg};
  font-weight: bold;
  color: ${props => props.theme.colors.text.primary};
  position: relative;
`;

export const NavigationZone = styled.div`
  position: absolute;
  background: transparent;
  
  &.zone-top {
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    cursor: n-resize;
  }
  
  &.zone-bottom {
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    cursor: s-resize;
  }
  
  &.zone-left {
    top: 50px;
    bottom: 50px;
    left: 0;
    width: 50px;
    cursor: w-resize;
  }
  
  &.zone-right {
    top: 50px;
    bottom: 50px;
    right: 0;
    width: 50px;
    cursor: e-resize;
  }
`;

// components/layout/SideTower/SideTower.styles.js
import styled from 'styled-components';
import { craftBorder, stoneBg } from '../../../styles/mixins';

export const TowerContainer = styled.div`
  width: 25%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  ${craftBorder}
  ${stoneBg}
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

// components/rooms/RoomNote/RoomNote.styles.js
import styled from 'styled-components';
import { parchmentBg } from '../../../styles/mixins';

export const NoteContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 12.5%;
  min-width: 120px;
  ${parchmentBg}
  border-radius: 4px;
  z-index: 5;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
`;

export const NoteHeader = styled.div`
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  text-align: center;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  user-select: none;
`;

export const NoteContent = styled.div`
  padding: 8px;
`;

export const NoteTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  border: none;
  background: transparent;
  resize: none;
  font-size: 10px;
  font-family: ${props => props.theme.fonts.main};
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.text.secondary};
    opacity: 0.7;
  }
`;