// src/styles/theme.js

export const theme = {
  colors: {
    // Base existante (tons chauds)
    primary: '#8B4513',
    secondary: '#D2B48C',
    accent: '#CD853F',
    background: '#E8E2D6',
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
  // Ancien système (deprecated)
  fonts: {
    main: '"Cinzel", serif',
    mono: '"Courier New", monospace'
  },

  // Nouveau système typographique scalable
  typography: {
    // Familles de polices spécialisées
    families: {
      primary: '"Cinzel", serif',        // Headers, titres nobles/médiévaux
      secondary: '"Crimson Text", serif', // Corps de texte, lecture longue
      mono: '"Courier New", monospace',   // Code, données techniques
      ui: '"Inter", sans-serif'           // UI moderne, labels, boutons
    },

    // Échelle typographique harmonieuse (ratio 1.25)
    sizes: {
      xs: '10px',     // Micro-infos, timestamps, badges
      sm: '12px',     // Textes secondaires, captions, meta
      base: '14px',   // Texte principal, contenu standard
      md: '16px',     // Textes importants, emphasis
      lg: '20px',     // Sous-titres, section headers
      xl: '25px',     // Titres de sections
      '2xl': '31px',  // Titres de pages
      '3xl': '39px'   // Titres principaux, hero
    },

    // Poids standardisés
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },

    // Line-heights optimisées par usage
    lineHeights: {
      tight: 1.2,    // Titres, headers courts
      normal: 1.4,   // Texte standard, UI
      relaxed: 1.6,  // Lecture longue, paragraphes
      loose: 1.8     // Espacement très aéré
    },

    // Letter-spacing pour différents contextes
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    }
  },
    zIndex: {
    navigation: 10,
    overlay: 20,
    modal: 30
  }
};
