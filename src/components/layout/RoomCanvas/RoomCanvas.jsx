import React, { useEffect, useState } from 'react';
import {
  CanvasContainer,
  RoomsGrid,
  RoomSlot
} from './RoomCanvas.styles';
import { getRoomComponent, DefaultRoomRenderer } from '../../../utils/RoomRegistry.jsx';
import { roomConfig } from '../../../utils/roomPositions';
import { roomColors } from '../../../utils/assetMapping';
import NavigationArrows from '../../navigation/NavigationArrows';

/**
 * Conteneur principal pour la navigation entre les pièces
 * @renders CanvasContainer
 * @renders RoomsGrid
 * @renders RoomSlot
 * @renders DefaultRoomRenderer
 * @renders AtelierRoom
 * @renders BibliothequeRoom
 * @renders BoutiqueRoom
 * @renders CaveRoom
 * @renders ChambreRoom
 * @renders ComptoirRoom
 * @renders CuisineRoom
 * @renders ForgeRoom
 * @renders JardinRoom
 * @renders LaboratoireRoom
 * @renders SanctuaireRoom
 * @renders ScriptoriumRoom
 * @renders NavigationArrows
 */
const RoomCanvas = ({ roomNavHook }) => {
  const { currentRoom, navigateToRoom, getAvailableDirections } = roomNavHook;
  const availableDirections = getAvailableDirections();

  // État pour tracker la navigation
  const [isNavigating, setIsNavigating] = useState(false);
  const [activeDirection, setActiveDirection] = useState(null);

  // Calcul pour centrer la pièce courante dans le viewport
  // Chaque pièce fait 25% de la largeur totale (100%/4) et 33.33% de la hauteur totale (100%/3)
  const translateX = -currentRoom.x * 25; // 100% / 4 colonnes = 25%
  const translateY = -currentRoom.y * 33.33; // 100% / 3 rangées = 33.33%

  // Fonction pour gérer la navigation avec animation
  const handleNavigation = (direction) => {
    if (!isNavigating && availableDirections[direction]) {
      setIsNavigating(true);
      setActiveDirection(direction);
      navigateToRoom(direction);

      // Reset après la durée de transition (400ms de la grille + 100ms de marge)
      setTimeout(() => {
        setIsNavigating(false);
        setActiveDirection(null);
      }, 500);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Vérifier si on est dans un éditeur (textarea, input, ou contenteditable)
      const activeElement = document.activeElement;
      const isInEditor =
        activeElement.tagName === 'TEXTAREA' ||
        activeElement.tagName === 'INPUT' ||
        activeElement.contentEditable === 'true' ||
        activeElement.closest('[contenteditable="true"]');

      // Si on est dans un éditeur, ne pas intercepter les touches
      if (isInEditor) {
        return;
      }

      // Empêcher le scroll par défaut des flèches
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
      }

      switch (event.key) {
        case 'ArrowUp':
          handleNavigation('up');
          break;
        case 'ArrowDown':
          handleNavigation('down');
          break;
        case 'ArrowLeft':
          handleNavigation('left');
          break;
        case 'ArrowRight':
          handleNavigation('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [availableDirections, isNavigating]); // Ajout de isNavigating dans les dépendances

  return (
    <CanvasContainer id="room-canvas-container">
      <RoomsGrid style={{ transform: `translate(${translateX}%, ${translateY}%)` }}>
        {roomConfig.map((room, index) => (
          <RoomSlot
            key={index}
            roomType={room.type}
            background={room.background}
            roomColors={roomColors}
          >
{(() => {
              const RoomComponent = getRoomComponent(room.type);

              // Si c'est le composant par défaut, passer les props room
              if (RoomComponent === DefaultRoomRenderer) {
                return <RoomComponent room={room} />;
              }

              // Sinon, c'est un vrai composant Room
              return <RoomComponent />;
            })()}
          </RoomSlot>
        ))}
      </RoomsGrid>

      {/* Flèches de navigation dorées */}
      <NavigationArrows
        availableDirections={availableDirections}
        onNavigate={handleNavigation}
        size="50px"
        isNavigating={isNavigating}
        activeDirection={activeDirection}
      />
    </CanvasContainer>
  );
};

export default RoomCanvas;
