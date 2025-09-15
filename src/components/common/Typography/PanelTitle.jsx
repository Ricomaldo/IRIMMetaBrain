// src/components/common/Typography/PanelTitle.jsx

import styled from 'styled-components';

export const PanelTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-align: center;
  margin: 0 0 12px 0;
  opacity: 0.95;
  color: ${props => props.color || props.theme.colors.primary};
`;