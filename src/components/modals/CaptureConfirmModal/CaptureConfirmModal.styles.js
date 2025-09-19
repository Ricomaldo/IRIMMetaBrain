// src/components/modals/CaptureConfirmModal/CaptureConfirmModal.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const CaptureContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const CaptureSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const CaptureTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  margin: 0;
`;

export const CaptureDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.families.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`;

export const ActionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => alpha(theme.colors.accent, 0.1)};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => alpha(theme.colors.accent, 0.2)};
  
  div {
    font-family: ${({ theme }) => theme.typography.families.ui};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
    color: ${({ theme }) => theme.colors.text.light};
    line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
    
    strong {
      font-weight: ${({ theme }) => theme.typography.weights.bold};
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 2px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  
  ${({ $variant, theme }) => {
    if ($variant === 'primary') {
      return `
        background: ${theme.colors.accent};
        color: ${theme.colors.background};
        border-color: ${theme.colors.accent};
        
        &:hover:not(:disabled) {
          background: ${alpha(theme.colors.accent, 0.9)};
          transform: translateY(-2px);
          box-shadow: 0 4px 8px ${alpha(theme.colors.accent, 0.3)};
        }
      `;
    }
    
    return `
      background: transparent;
      color: ${theme.colors.text.light};
      border-color: ${alpha(theme.colors.text.light, 0.3)};
      
      &:hover:not(:disabled) {
        background: ${alpha(theme.colors.text.light, 0.1)};
        border-color: ${theme.colors.text.light};
        transform: translateY(-1px);
      }
    `;
  }}
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  white-space: pre-line;
  text-align: center;
  
  ${({ $type, theme }) => {
    if ($type === 'error') {
      return `
        color: ${theme.colors.accents.danger};
        background: ${alpha(theme.colors.accents.danger, 0.1)};
        border: 1px solid ${alpha(theme.colors.accents.danger, 0.3)};
      `;
    }
    
    return `
      color: ${theme.colors.accent};
      background: ${alpha(theme.colors.accent, 0.1)};
      border: 1px solid ${alpha(theme.colors.accent, 0.3)};
    `;
  }}
`;
