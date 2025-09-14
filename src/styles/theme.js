// src/styles/theme.js

export const theme = {
  colors: {
    // Base existante (tons chauds)
    primary: '#8B4513',
    secondary: '#D2B48C',
    accent: '#CD853F',
    background: '#F5F5DC',
    border: '#A0522D',
    stone: '#708090',

    // Ajouts complémentaires (accents froids)
    accents: {
      cold: '#4A5568',         // Bleu ardoise - liens/boutons actifs
      success: '#68752C',      // Vert olive - validations/succès
      danger: '#8B3A3A'        // Rouge terre - alertes/erreurs
    },

    text: {
      primary: '#2F1B14',      // Brun très foncé
      secondary: '#5D4037',    // Brun moyen
      light: '#F7FAFC',        // Blanc cassé - texte sur fonds sombres
      muted: '#E2E8F0'         // Gris très clair - texte secondaire sur dark
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  button: {
    small: '36px',
    medium: '48px',
    large: '60px',
    xlarge: '80px'
  },
  fonts: {
    main: '"Cinzel", serif',
    mono: '"Courier New", monospace'
  },
    zIndex: {
    navigation: 10,
    overlay: 20,
    modal: 30
  }
};
