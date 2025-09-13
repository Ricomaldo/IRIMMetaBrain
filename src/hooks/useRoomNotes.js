// src/hooks/useRoomNotes.js

import { useState } from 'react';

export const useRoomNotes = () => {
  const [notes, setNotes] = useState({
    chambre: '',
    atelier: '',
    forge: '',
    boutique: ''
  });

  const updateNote = (roomType, content) => {
    setNotes(prev => ({ ...prev, [roomType]: content }));
  };

  return { notes, updateNote };
};