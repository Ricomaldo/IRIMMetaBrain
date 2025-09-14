// src/components/common/Typography/Typography.jsx - Composants typographiques réutilisables

import styled from 'styled-components';

// ===== TITRES HIÉRARCHIQUES =====

export const HeroTitle = styled.h1`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes['3xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  line-height: ${props => props.theme.typography.lineHeights.tight};
  letter-spacing: ${props => props.theme.typography.letterSpacing.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const PageTitle = styled.h1`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes['2xl']};
  font-weight: ${props => props.theme.typography.weights.bold};
  line-height: ${props => props.theme.typography.lineHeights.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const SectionTitle = styled.h2`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.xl};
  font-weight: ${props => props.theme.typography.weights.semibold};
  line-height: ${props => props.theme.typography.lineHeights.tight};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const SubsectionTitle = styled.h3`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.medium};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== CORPS DE TEXTE =====

export const BodyText = styled.p`
  font-family: ${props => props.theme.typography.families.secondary};
  font-size: ${props => props.theme.typography.sizes.base};
  font-weight: ${props => props.theme.typography.weights.normal};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const BodyTextImportant = styled.p`
  font-family: ${props => props.theme.typography.families.secondary};
  font-size: ${props => props.theme.typography.sizes.md};
  font-weight: ${props => props.theme.typography.weights.medium};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== ÉLÉMENTS UI =====

export const UILabel = styled.label`
  font-family: ${props => props.theme.typography.families.ui};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.semibold};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  text-transform: uppercase;
  letter-spacing: ${props => props.theme.typography.letterSpacing.wider};
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

export const Caption = styled.span`
  font-family: ${props => props.theme.typography.families.ui};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.normal};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  opacity: 0.8;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.secondary};
`;

export const Metadata = styled.span`
  font-family: ${props => props.theme.typography.families.ui};
  font-size: ${props => props.theme.typography.sizes.xs};
  font-weight: ${props => props.theme.typography.weights.medium};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  letter-spacing: ${props => props.theme.typography.letterSpacing.wide};
  text-transform: uppercase;
  margin: 0;
  color: ${props => props.color || props.theme.colors.text.secondary};
`;

export const CodeText = styled.code`
  font-family: ${props => props.theme.typography.families.mono};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.normal};
  line-height: ${props => props.theme.typography.lineHeights.normal};
  background: rgba(0,0,0,0.1);
  padding: 2px 4px;
  border-radius: 3px;
  color: ${props => props.color || props.theme.colors.text.primary};
`;

// ===== COMPOSANTS SPÉCIALISÉS ATELIER =====

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
  color: ${props => props.color || 'inherit'};
`;

export const PanelContent = styled.div`
  font-family: ${props => props.theme.typography.families.secondary};
  font-size: ${props => props.theme.typography.sizes.sm};
  font-weight: ${props => props.theme.typography.weights.normal};
  line-height: ${props => props.theme.typography.lineHeights.relaxed};
  color: ${props => props.color || 'inherit'};
`;

export const ProjectTitle = styled.div`
  font-family: ${props => props.theme.typography.families.primary};
  font-size: ${props => props.theme.typography.sizes.lg};
  font-weight: ${props => props.theme.typography.weights.bold};
  line-height: ${props => props.theme.typography.lineHeights.tight};
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