# Gestion du thème – IRIM StudioHall

Ce document définit les règles d’usage du `theme`, les échelles (spacing, radii, borders, shadows, motion, zIndex), et les bonnes pratiques pour styled-components.

## Échelles disponibles

- Spacing: `xs, sm, md, lg, xl`
- Radii: `xs, sm, md, lg, xl`
- Borders: `thin, base, thick, heavy`
- Shadows: `sm, md, lg`
- Motion: `durations.fast|base|slow`, `easings.standard|emphasized`
- zIndex: `base, level1, level2, level3, navigation, overlay, modal`
- Typography: `families.primary|secondary|mono|ui`, `sizes`, `weights`, `lineHeights`, `letterSpacing`

## Règles d’usage

1. Toujours utiliser la syntaxe déstructurée: `({ theme }) => ...`.
2. Bannir les valeurs "en dur":
   - Couleurs hex/rgba → utiliser `theme.colors` + `alpha(color, a)`.
   - z-index numériques → utiliser `theme.zIndex.*`.
   - border-radius en px → `theme.radii.*`.
   - espacements (gap/margin/padding) → `theme.spacing.*`.
3. Typo: n’utiliser que `theme.typography.families.*` (plus `theme.fonts`).
4. Effets: préférer `theme.shadows.*` et `theme.motion.*` pour transitions.

## Utilitaire couleur

```js
import { alpha } from '../../src/styles/color';

background: ${({ theme }) => alpha(theme.colors.primary, 0.6)};
```

## Exemples

- Bordure:
```js
border: ${({ theme }) => `${theme.borders.base} solid ${theme.colors.border}`};
```
- Rayon:
```js
border-radius: ${({ theme }) => theme.radii.md};
```
- Ombre:
```js
box-shadow: ${({ theme }) => theme.shadows.md};
```
- Transition:
```js
transition: ${({ theme }) => `all ${theme.motion.durations.base} ${theme.motion.easings.standard}`};
```
- z-index:
```js
z-index: ${({ theme }) => theme.zIndex.navigation};
```

## Checklist PR

- Pas de `#[0-9A-Fa-f]{6}` hors `theme.js`.
- Pas de `z-index: \d+`.
- Pas de `:\s*\d+px` pour padding/margin/gap/border-radius.
- Pas d’usage de `theme.fonts.*`.

## Migration

- Utiliser des remplacements ciblés et valider visuellement.
- Si une valeur manque dans l’échelle, l’ajouter au thème au lieu d’un px "en dur".


