// src/components/common/IconButton/IconButton.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { ButtonContainer, IconWrapper, Label } from './IconButton.styles';

/**
 * Button component with icon and optional label
 * @renders ButtonContainer
 * @renders IconWrapper
 * @renders Label
 */
const IconButton = ({ icon, label, onClick, active = false, size = 'medium', variant = 'default' }) => {
  return (
    <ButtonContainer onClick={onClick} $active={active} size={size} variant={variant} title={label}>
      <IconWrapper>{icon}</IconWrapper>
      {label && <Label>{label}</Label>}
    </ButtonContainer>
  );
};

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string,
  onClick: PropTypes.func,
  active: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'danger'])
};

IconButton.defaultProps = {
  active: false,
  size: 'medium',
  variant: 'default'
};

export default IconButton;
