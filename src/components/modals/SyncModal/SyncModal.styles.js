// src/components/modals/SyncModal/SyncModal.styles.js - Styles pour la modal de sync

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const SyncContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

export const SyncSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const SyncTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  margin: 0;
`;

export const SyncDescription = styled.p`
  font-family: ${({ theme }) => theme.typography.families.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.light};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
`;

const inputBase = `
  padding: \${({ theme }) => \`\${theme.spacing.md} \${theme.spacing.lg}\`};
  background: \${({ theme }) => alpha(theme.colors.black, 0.3)};
  border: \${({ theme }) => \`\${theme.borders.base} solid \${theme.colors.border}\`};
  border-radius: \${({ theme }) => theme.radii.md};
  color: \${({ theme }) => theme.colors.text.light};
  font-family: \${({ theme }) => theme.typography.families.mono};
  font-size: \${({ theme }) => theme.typography.sizes.base};
  transition: \${({ theme }) => \`all \${theme.motion.durations.base} \${theme.motion.easings.standard}\`};

  &::placeholder {
    color: \${({ theme }) => alpha(theme.colors.text.light, 0.5)};
  }

  &:focus {
    outline: none;
    background: \${({ theme }) => alpha(theme.colors.black, 0.5)};
    border-color: \${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px \${({ theme }) => alpha(theme.colors.accent, 0.3)};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  ${inputBase}
`;

export const PasswordInput = styled.input`
  ${inputBase}
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export const ActionButton = styled.button`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
  background: ${({ theme, $variant }) => {
    if ($variant === 'primary') return theme.colors.accent;
    if ($variant === 'secondary') return theme.colors.stone;
    return alpha(theme.colors.primary, 0.5);
  }};
  border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.light};
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  cursor: pointer;
  transition: ${({ theme }) => `all ${theme.motion.durations.base} ${theme.motion.easings.standard}`};

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px ${({ theme }) => alpha(theme.colors.black, 0.3)};
    background: ${({ theme, $variant }) => {
      if ($variant === 'primary') return theme.colors.primary;
      if ($variant === 'secondary') return theme.colors.accent;
      return theme.colors.primary;
    }};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  white-space: pre-wrap;

  background: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return alpha(theme.colors.accents.success, 0.2);
      case 'error':
        return alpha(theme.colors.accents.danger, 0.2);
      case 'info':
        return alpha(theme.colors.accents.cold, 0.2);
      default:
        return alpha(theme.colors.black, 0.2);
    }
  }};

  border: ${({ theme, $type }) => {
    switch ($type) {
      case 'success':
        return `${theme.borders.base} solid ${theme.colors.accents.success}`;
      case 'error':
        return `${theme.borders.base} solid ${theme.colors.accents.danger}`;
      case 'info':
        return `${theme.borders.base} solid ${theme.colors.accents.cold}`;
      default:
        return `${theme.borders.base} solid ${theme.colors.border}`;
    }
  }};

  color: ${({ theme }) => theme.colors.text.light};
`;

export const ConfigInfo = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => alpha(theme.colors.black, 0.2)};
  border-radius: ${({ theme }) => theme.radii.md};
  border: ${({ theme }) => `${theme.borders.thin} solid ${theme.colors.border}`};
`;

export const ConfigRow = styled.div`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  padding: ${({ theme }) => `${theme.spacing.xs} 0`};

  strong {
    color: ${({ theme }) => theme.colors.text.light};
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;