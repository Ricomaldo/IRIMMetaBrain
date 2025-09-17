// src/components/common/Button/Button.jsx

import React from 'react';
import { StyledButton } from './Button.styles';

const Button = ({
  children,
  onClick,
  active = false,
  size = 'medium',
  variant = 'default',
  ...props
}) => {
  return (
    <StyledButton
      onClick={onClick}
      $active={active}
      $size={size}
      $variant={variant}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;