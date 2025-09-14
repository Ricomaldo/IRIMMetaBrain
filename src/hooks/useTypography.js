// src/hooks/useTypography.js - Hook pour typographie cohérente

import { useTheme } from 'styled-components';

export const useTypography = () => {
  const theme = useTheme();
  const { typography } = theme;

  return {
    // Familles rapides
    families: typography.families,
    sizes: typography.sizes,
    weights: typography.weights,
    lineHeights: typography.lineHeights,
    letterSpacing: typography.letterSpacing,

    // Mixins prêts à l'emploi pour styled-components
    mixins: {
      // Titres hiérarchiques
      heroTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes['3xl']};
        font-weight: ${typography.weights.bold};
        line-height: ${typography.lineHeights.tight};
        letter-spacing: ${typography.letterSpacing.tight};
      `,

      pageTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes['2xl']};
        font-weight: ${typography.weights.bold};
        line-height: ${typography.lineHeights.tight};
      `,

      sectionTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes.xl};
        font-weight: ${typography.weights.semibold};
        line-height: ${typography.lineHeights.tight};
      `,

      subsectionTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes.lg};
        font-weight: ${typography.weights.medium};
        line-height: ${typography.lineHeights.normal};
      `,

      // Corps de texte
      bodyText: `
        font-family: ${typography.families.secondary};
        font-size: ${typography.sizes.base};
        font-weight: ${typography.weights.normal};
        line-height: ${typography.lineHeights.relaxed};
      `,

      bodyTextImportant: `
        font-family: ${typography.families.secondary};
        font-size: ${typography.sizes.md};
        font-weight: ${typography.weights.medium};
        line-height: ${typography.lineHeights.relaxed};
      `,

      // UI Elements
      uiLabel: `
        font-family: ${typography.families.ui};
        font-size: ${typography.sizes.sm};
        font-weight: ${typography.weights.semibold};
        line-height: ${typography.lineHeights.normal};
        text-transform: uppercase;
        letter-spacing: ${typography.letterSpacing.wider};
      `,

      uiButton: `
        font-family: ${typography.families.ui};
        font-size: ${typography.sizes.base};
        font-weight: ${typography.weights.medium};
        line-height: ${typography.lineHeights.normal};
      `,

      // Textes spécialisés
      caption: `
        font-family: ${typography.families.ui};
        font-size: ${typography.sizes.sm};
        font-weight: ${typography.weights.normal};
        line-height: ${typography.lineHeights.normal};
        opacity: 0.8;
      `,

      metadata: `
        font-family: ${typography.families.ui};
        font-size: ${typography.sizes.xs};
        font-weight: ${typography.weights.medium};
        line-height: ${typography.lineHeights.normal};
        letter-spacing: ${typography.letterSpacing.wide};
        text-transform: uppercase;
      `,

      code: `
        font-family: ${typography.families.mono};
        font-size: ${typography.sizes.sm};
        font-weight: ${typography.weights.normal};
        line-height: ${typography.lineHeights.normal};
      `,

      // Styles contextuels Atelier
      panelTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes.md};
        font-weight: ${typography.weights.bold};
        line-height: ${typography.lineHeights.tight};
        text-transform: uppercase;
        letter-spacing: ${typography.letterSpacing.wider};
      `,

      panelContent: `
        font-family: ${typography.families.secondary};
        font-size: ${typography.sizes.sm};
        font-weight: ${typography.weights.normal};
        line-height: ${typography.lineHeights.relaxed};
      `,

      projectTitle: `
        font-family: ${typography.families.primary};
        font-size: ${typography.sizes.lg};
        font-weight: ${typography.weights.bold};
        line-height: ${typography.lineHeights.tight};
        text-align: center;
      `
    }
  };
};

export default useTypography;