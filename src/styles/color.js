// src/styles/color.js

export const alpha = (color, a) => {
  if (typeof color !== 'string') return color;
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  if (color.startsWith('rgba(')) {
    return color.replace(/rgba\(([^,]+),([^,]+),([^,]+),[^)]+\)/, (_, r, g, b) => `rgba(${r}, ${g}, ${b}, ${a})`);
  }
  if (color.startsWith('rgb(')) {
    return color.replace(/^rgb\((.+)\)$/, `rgba($1, ${a})`);
  }
  return color;
};


