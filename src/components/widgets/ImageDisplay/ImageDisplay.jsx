// src/components/widgets/ImageDisplay/ImageDisplay.jsx

import React from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${({ theme, $borderRadius }) => $borderRadius || theme.radii.md};
  transition: transform 0.3s ease;

  &:hover {
    transform: ${({ $hoverEffect }) => $hoverEffect ? 'scale(1.05)' : 'none'};
  }
`;

/**
 * Widget simple pour afficher une image
 * @param {string} src - Source de l'image
 * @param {string} alt - Texte alternatif
 * @param {string} borderRadius - Rayon de bordure personnalisé
 * @param {boolean} hoverEffect - Activer l'effet de survol
 */
const ImageDisplay = ({ 
  src, 
  alt = "Image", 
  borderRadius,
  hoverEffect = false 
}) => {
  return (
    <ImageContainer>
      <StyledImage 
        src={src}
        alt={alt}
        $borderRadius={borderRadius}
        $hoverEffect={hoverEffect}
      />
    </ImageContainer>
  );
};

export default ImageDisplay;
