// src/components/common/IconButton/IconButton.jsx

import React from 'react';
import { ButtonContainer, IconWrapper, Label } from './IconButton.styles';

const IconButton = ({ icon, label, onClick, active = false }) => {
  return (
    <ButtonContainer onClick={onClick} active={active}>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </ButtonContainer>
  );
};

export default IconButton;
