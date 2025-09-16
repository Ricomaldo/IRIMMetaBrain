// src/components/navigation/NavigationArrows/NavigationArrows.jsx

import React from 'react';
import styled from 'styled-components';
import ArrowButton from './ArrowButton';

const ArrowsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Permet de cliquer à travers sauf sur les boutons */

  /* Les boutons eux-mêmes restent cliquables */
  button {
    pointer-events: all;
  }
`;

const NavigationArrows = ({
  availableDirections = {},
  onNavigate,
  size = '60px',
  className = ''
}) => {
  const handleNavigationClick = (direction) => {
    if (onNavigate && availableDirections[direction]) {
      onNavigate(direction);
    }
  };

  return (
    <ArrowsContainer className={className}>
      {availableDirections.up && (
        <ArrowButton
          direction="up"
          variant="room-top"
          onClick={() => handleNavigationClick('up')}
          size={size}
          title="Aller vers le Nord"
        />
      )}

      {availableDirections.down && (
        <ArrowButton
          direction="down"
          variant="room-bottom"
          onClick={() => handleNavigationClick('down')}
          size={size}
          title="Aller vers le Sud"
        />
      )}

      {availableDirections.left && (
        <ArrowButton
          direction="left"
          variant="room-left"
          onClick={() => handleNavigationClick('left')}
          size={size}
          title="Aller vers l'Ouest"
        />
      )}

      {availableDirections.right && (
        <ArrowButton
          direction="right"
          variant="room-right"
          onClick={() => handleNavigationClick('right')}
          size={size}
          title="Aller vers l'Est"
        />
      )}
    </ArrowsContainer>
  );
};

export default NavigationArrows;