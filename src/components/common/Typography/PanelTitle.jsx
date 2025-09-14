// src/components/common/Typography/PanelTitle.jsx

import styled from 'styled-components';

export const PanelTitle = styled.h3`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.md};
  font-weight: ${props => props.theme.typography.weights.bold};
  line-height: ${props => props.theme.typography.lineHeights.tight};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  text-align: center;
  margin: 0 0 12px 0;
  opacity: 0.95;
  color: ${props => props.color || props.theme.colors.primary};
`;