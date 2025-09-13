// src/utils/buttonMapping.js

export const controlButtons = [
  { id: 'calendar', icon: '📅', label: 'Calendrier', action: () => console.log('Calendar') },
  { id: 'timer', icon: '⏱️', label: 'Timer', action: () => console.log('Timer') },
  { id: 'settings', icon: '⚙️', label: 'Config', action: () => console.log('Settings') }
];

export const workbenchButtons = [
  { id: 'github', icon: '🐙', label: 'GitHub', action: () => window.open('https://github.com') },
  { id: 'vscode', icon: '💻', label: 'VS Code', action: () => console.log('VS Code') },
  { id: 'arc', icon: '🌐', label: 'Arc', action: () => console.log('Arc') },
  { id: 'cursor', icon: '🎯', label: 'Cursor', action: () => console.log('Cursor') }
];
