import React, { useEffect } from 'react';
import {
  CanvasContainer,
  RoomsGrid,
  RoomSlot,
  NavigationZone
} from './RoomCanvas.styles';
import RoomNote from '../../rooms/shared/RoomNote/RoomNote';
import AtelierRoom from '../../rooms/Atelier/AtelierRoom';
import SanctuaireRoom from '../../rooms/Sanctuaire/SanctuaireRoom';
import CuisineRoom from '../../rooms/Cuisine/CuisineRoom';
import JardinRoom from '../../rooms/Jardin/JardinRoom';
import BoutiqueRoom from '../../rooms/Boutique/BoutiqueRoom';
import ChambreRoom from '../../rooms/Chambre/ChambreRoom';
import ComptoirRoom from '../../rooms/Comptoir/ComptoirRoom';
import ForgeRoom from '../../rooms/Forge/ForgeRoom';
import ScriptoriumRoom from '../../rooms/Scriptorium/ScriptoriumRoom';
import BibliothequeRoom from '../../rooms/Bibliotheque/BibliothequeRoom';
import CaveRoom from '../../rooms/Cave/CaveRoom';
import { roomConfig } from '../../../utils/roomPositions';
import { roomColors } from '../../../utils/assetMapping';

const RoomCanvas = ({ roomNavHook }) => {
  const { currentRoom, navigateToRoom, getAvailableDirections } = roomNavHook;
  const availableDirections = getAvailableDirections();

  // Calcul pour centrer la pièce courante dans le viewport
  // Chaque pièce fait 25% de la largeur totale (100%/4) et 33.33% de la hauteur totale (100%/3)
  const translateX = -currentRoom.x * 25; // 100% / 4 colonnes = 25%
  const translateY = -currentRoom.y * 33.33; // 100% / 3 rangées = 33.33%

  const handleNavigationClick = (direction) => {
    navigateToRoom(direction);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Empêcher le scroll par défaut des flèches
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowUp':
          if (availableDirections.up) {
            navigateToRoom('up');
          }
          break;
        case 'ArrowDown':
          if (availableDirections.down) {
            navigateToRoom('down');
          }
          break;
        case 'ArrowLeft':
          if (availableDirections.left) {
            navigateToRoom('left');
          }
          break;
        case 'ArrowRight':
          if (availableDirections.right) {
            navigateToRoom('right');
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [availableDirections, navigateToRoom]);

  return (
    <CanvasContainer>
      <RoomsGrid style={{ transform: `translate(${translateX}%, ${translateY}%)` }}>
        {roomConfig.map((room, index) => (
          <RoomSlot
            key={index}
            roomType={room.type}
            background={room.background}
            roomColors={roomColors}
          >
            {(() => {
              switch(room.type) {
                case 'sanctuaire':
                  return <SanctuaireRoom />;
                case 'chambre':
                  return <ChambreRoom />;
                case 'cuisine':
                  return <CuisineRoom />;
                case 'comptoir':
                  return <ComptoirRoom />;
                case 'jardin':
                  return <JardinRoom />;
                case 'atelier':
                  return <AtelierRoom />;
                case 'forge':
                  return <ForgeRoom />;
                case 'boutique':
                  return <BoutiqueRoom />;
                case 'scriptorium':
                  return <ScriptoriumRoom />;
                case 'bibliotheque':
                  return <BibliothequeRoom />;
                case 'cave':
                  return <CaveRoom />;
                default:
                  return (
                    <>
                      {room.name}
                      {room.type !== 'empty' && room.type !== 'undefined' && (
                        <RoomNote roomType={room.type} />
                      )}
                    </>
                  );
              }
            })()}
          </RoomSlot>
        ))}
      </RoomsGrid>

      {availableDirections.up && (
        <NavigationZone
          className="zone-top"
          onClick={() => handleNavigationClick('up')}
        >
          ⬆️
        </NavigationZone>
      )}
      {availableDirections.down && (
        <NavigationZone
          className="zone-bottom"
          onClick={() => handleNavigationClick('down')}
        >
          ⬇️
        </NavigationZone>
      )}
      {availableDirections.left && (
        <NavigationZone
          className="zone-left"
          onClick={() => handleNavigationClick('left')}
        >
          ⬅️
        </NavigationZone>
      )}
      {availableDirections.right && (
        <NavigationZone
          className="zone-right"
          onClick={() => handleNavigationClick('right')}
        >
          ➡️
        </NavigationZone>
      )}
    </CanvasContainer>
  );
};

export default RoomCanvas;
