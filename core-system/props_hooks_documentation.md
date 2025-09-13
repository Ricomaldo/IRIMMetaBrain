# Documentation Props & Hooks - IRIM StudioLab

## Hook: useRoomNotes

**Fichier:** `hooks/useRoomNotes.js`

**Retourne:**
```js
{
  notes: {
    chambre: string,
    atelier: string, 
    forge: string,
    boutique: string
  },
  updateNote: (roomType: string, content: string) => void
}
```

**Usage:** Persistance notes par pièce pendant navigation

---

## Composant: StudioHall

**Fichier:** `components/layout/StudioHall/StudioHall.jsx`

**State interne:**
- `currentRoom: { x: number, y: number }` - Position dans grille 4x3
- `roomNotesHook` - Instance hook useRoomNotes

**Props transmises:**
- `RoomCanvas`: currentRoom, onNavigate, roomNotesHook
- `SideTower`: aucune

---

## Composant: RoomCanvas

**Fichier:** `components/layout/RoomCanvas/RoomCanvas.jsx`

**Props reçues:**
```js
{
  currentRoom: { x: number, y: number },
  onNavigate: (newPos) => void,
  roomNotesHook: { notes, updateNote }
}
```

**Props transmises à RoomSlot:**
```js
{
  roomType: string,           // 'chambre'|'atelier'|'forge'|'boutique'|'empty'
  background: string|null,    // URL asset ou null
  roomColors: object          // Palette couleurs (wireframeColors|roomColors)
}
```

**Props transmises à RoomNote:**
```js
{
  roomType: string,
  roomNotesHook: object
}
```

---

## Composant: RoomSlot (styled-component)

**Fichier:** `components/layout/RoomCanvas/RoomCanvas.styles.js`

**Props utilisées:**
```js
{
  roomType: string,     // Détermine couleur de base
  background: string,   // URL image background
  roomColors: object    // { chambre: '#fff', atelier: '#fff', ... }
}
```

**Logique rendu:**
1. Couleur base: `roomColors[roomType]`
2. Image par-dessus si `background` fourni
3. Text color depuis theme

---

## Composant: RoomNote

**Fichier:** `components/rooms/RoomNote/RoomNote.jsx`

**Props reçues:**
```js
{
  roomType: string,              // 'chambre'|'atelier'|'forge'|'boutique'
  roomNotesHook: {
    notes: object,
    updateNote: function
  }
}
```

**State interne:**
- `isExpanded: boolean` - Toggle collapse/expand

**Comportement:**
- Lecture: `notes[roomType]`
- Écriture: `updateNote(roomType, newValue)`
- Icons depuis `assetMapping.icons`

---

## Composant: ControlTower

**Fichier:** `components/layout/SideTower/ControlTower/ControlTower.jsx`

**Props:** Aucune

**Dépendances:**
- `controlButtons` depuis `utils/buttonMapping.js`
- Transmet à IconButton: `{ icon, label, onClick }`

---

## Composant: WorkbenchDrawer

**Fichier:** `components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.jsx`

**Props:** Aucune

**Dépendances:**
- `workbenchButtons` depuis `utils/buttonMapping.js`
- Transmet à IconButton: `{ icon, label, onClick }`

---

## Composant: IconButton

**Fichier:** `components/common/IconButton/IconButton.jsx`

**Props:**
```js
{
  icon: string,           // Emoji ou caractère
  label: string,          // Text sous icône
  onClick: function,      // Handler clic
  active?: boolean        // État actif (optionnel)
}
```

---

## Configuration: roomConfig

**Fichier:** `utils/roomPositions.js`

**Structure item:**
```js
{
  x: number,              // Position grille (0-3)
  y: number,              // Position grille (0-2)
  type: string,           // 'chambre'|'atelier'|'forge'|'boutique'|'empty'
  name: string,           // Nom affiché
  background: string      // URL depuis assetMapping.roomBackgrounds
}
```

---

## Configuration: assetMapping

**Fichier:** `utils/assetMapping.js`

**Exports:**
```js
roomBackgrounds: {
  chambre: '/assets/rooms/chambre-cozy.jpg',
  // ...
}

roomColors: {          // Mode coloré
  chambre: '#FFE4B5',
  // ...
}

wireframeColors: {     // Mode B&W
  chambre: '#FFFFFF',
  // ...
}

textures: {
  parchment: '/assets/ui/parchment-texture.jpg',
  // ...
}

icons: {
  note: '📝',
  expand: '➡️',
  collapse: '⬇️'
}
```

---

## Switch Palettes Couleurs

**Dans RoomCanvas.jsx:**
```js
// Mode wireframe B&W
import { wireframeColors } from '../../../utils/assetMapping';
roomColors={wireframeColors}

// Mode craft coloré
import { roomColors } from '../../../utils/assetMapping';
roomColors={roomColors}
```

**Effet:** Change couleurs de base des pièces sans affecter backgrounds d'assets.