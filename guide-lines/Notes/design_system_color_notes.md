# Design System - Évolution Couleurs IRIM

## Palette Actuelle (Tons Chauds Dominants)

```js
colors: {
  primary: '#8B4513',      // Marron selle
  secondary: '#D2B48C',    // Beige parchemin  
  accent: '#CD853F',       // Bronze/cuivre
  background: '#F5F5DC',   // Crème
  border: '#A0522D',       // Marron foncé
  stone: '#708090',        // Gris ardoise
  text: {
    primary: '#2F1B14',    // Brun très foncé
    secondary: '#5D4037'   // Brun moyen
  }
}
```

## Ajouts Recommandés - Équilibrage Chromatique

### Accents Froids (Complémentaires)
```js
accents: {
  cold: '#4A5568',         // Bleu ardoise - liens/boutons actifs
  success: '#68752C',      // Vert olive - validations/succès
  danger: '#8B3A3A'        // Rouge terre - alertes/erreurs
}
```

### Textes Clairs (Fonds Sombres)
```js
text: {
  light: '#F7FAFC',        // Blanc cassé - texte sur fonds sombres
  muted: '#E2E8F0'         // Gris très clair - texte secondaire sur dark
}
```

## Usage Contextuels

### Sur Parchemin Jaunâtre
- **Texte principal** : `#2F1B14` (contraste optimal)
- **Liens** : `#4A5568` (bleu ardoise, lisibilité garantie)
- **Bordures** : `#A0522D` (harmonie avec jaunissement)

### Sur Fonds Sombres (Forge, Pierre)
- **Texte principal** : `#F7FAFC` (blanc cassé)
- **Texte secondaire** : `#E2E8F0` (gris clair)
- **Accents** : `#CD853F` (bronze, chaleur sur froid)

### États Interactifs
- **Actif/Focus** : `#4A5568` (bleu ardoise)
- **Succès** : `#68752C` (vert olive)
- **Erreur** : `#8B3A3A` (rouge terre)
- **Hover** : Variations -20% luminosité

## Avantages de cette Évolution

**Lisibilité** : Contraste optimal sur tous supports
**Cohérence** : Tons terreux conservés, froids en complément
**Authenticité** : Palette médiévale enrichie sans rupture
**Accessibilité** : Ratios de contraste WCAG respectés

## Implémentation Theme.js

```js
export const theme = {
  colors: {
    // Base existante
    primary: '#8B4513',
    secondary: '#D2B48C', 
    accent: '#CD853F',
    background: '#F5F5DC',
    border: '#A0522D',
    stone: '#708090',
    
    // Ajouts complémentaires
    accents: {
      cold: '#4A5568',
      success: '#68752C', 
      danger: '#8B3A3A'
    },
    
    text: {
      primary: '#2F1B14',
      secondary: '#5D4037',
      light: '#F7FAFC',
      muted: '#E2E8F0'
    }
  }
};
```

Cette évolution préserve l'identité visuelle craft tout en résolvant les défis de lisibilité sur parchemin jaunâtre.