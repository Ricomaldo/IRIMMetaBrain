// src/components/common/Typography/Typography.jsx - Composants typographiques réutilisables

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

// ===== TITRES HIÉRARCHIQUES =====

export const HeroTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes['3xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const PageTitle = styled.h1`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const SectionTitle = styled.h2`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const SubsectionTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== CORPS DE TEXTE =====

export const BodyText = styled.p`
  font-family: ${({ theme }) => theme.typography.families.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.base};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const BodyTextImportant = styled.p`
  font-family: ${({ theme }) => theme.typography.families.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== ÉLÉMENTS UI =====

export const UILabel = styled.label`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const Caption = styled.span`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  opacity: 0.8;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.secondary};
`;

export const Metadata = styled.span`
  font-family: ${({ theme }) => theme.typography.families.ui};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.secondary};
`;

export const CodeText = styled.code`
  font-family: ${({ theme }) => theme.typography.families.mono};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  background: ${({ theme }) => alpha(theme.colors.black, 0.1)};
  padding: ${({ theme }) => `${theme.spacing['3xs']} ${theme.spacing['2xs']}`};
  border-radius: ${({ theme }) => theme.radii.xs};
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== COMPOSANTS SPÉCIALISÉS ATELIER =====

export const PanelTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.typography.letterSpacing.wider};
  text-align: center;
  margin: ${({ theme }) => `0 0 ${theme.spacing.md} 0`};
  opacity: 0.95;
  color: ${props => props.color || 'inherit'};
`;

export const PanelContent = styled.div`
  font-family: ${({ theme }) => theme.typography.families.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.normal};
  line-height: ${({ theme }) => theme.typography.lineHeights.relaxed};
  color: ${props => props.color || 'inherit'};
`;

export const ProjectTitle = styled.div`
  font-family: ${({ theme }) => theme.typography.families.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  text-align: center;
  color: ${props => props.color || 'inherit'};
`;

// Export des mixins pour styled-components personnalisés
export const typographyMixins = {
  heroTitle: (theme) => `
    font-family: ${theme.typography.families.primary};
    font-size: ${theme.typography.sizes['3xl']};
    font-weight: ${theme.typography.weights.bold};
    line-height: ${theme.typography.lineHeights.tight};
    letter-spacing: ${theme.typography.letterSpacing.tight};
  `,

  bodyText: (theme) => `
    font-family: ${theme.typography.families.secondary};
    font-size: ${theme.typography.sizes.base};
    font-weight: ${theme.typography.weights.normal};
    line-height: ${theme.typography.lineHeights.relaxed};
  `,

  uiLabel: (theme) => `
    font-family: ${theme.typography.families.ui};
    font-size: ${theme.typography.sizes.sm};
    font-weight: ${theme.typography.weights.semibold};
    text-transform: uppercase;
    letter-spacing: ${theme.typography.letterSpacing.wider};
  `
};