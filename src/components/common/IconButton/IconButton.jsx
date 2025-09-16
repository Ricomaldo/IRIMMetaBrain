// src/components/common/IconButton/IconButton.jsx

import React from 'react';
import { ButtonContainer, IconWrapper, Label } from './IconButton.styles';

const IconButton = ({ icon, label, onClick, active = false, size = 'medium', variant = 'default' }) => {
  return (
    <ButtonContainer onClick={onClick} $active={active} size={size} variant={variant} title={label}>
      <IconWrapper>{icon}</IconWrapper>
      {label && <Label>{label}</Label>}
    </ButtonContainer>
  );
};

export default IconButton;
