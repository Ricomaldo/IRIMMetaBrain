// src/components/common/Button/Button.jsx

import React from 'react';
import PropTypes from 'prop-types';
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

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger'])
};

Button.defaultProps = {
  active: false,
  size: 'medium',
  variant: 'default'
};

export default Button;