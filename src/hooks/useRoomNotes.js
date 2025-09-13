// src/hooks/useRoomNotes.js

import { useState, useCallback, useRef } from 'react';
import { debounce } from '../utils/debounce';

const STORAGE_KEY = 'irim-room-notes';

const loadNotesFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      chambre: '',
      atelier: '',
      forge: '',
      boutique: ''
    };
  } catch (error) {
    console.warn('Erreur de chargement des notes:', error);
    return {
      chambre: '',
      atelier: '',
      forge: '',
      boutique: ''
    };
  }
};

const saveNotesToStorage = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.warn('Erreur de sauvegarde des notes:', error);
  }
};

export const useRoomNotes = () => {
  const [notes, setNotes] = useState(loadNotesFromStorage);
  const notesRef = useRef(notes);

  // Mise à jour de la ref à chaque changement
  notesRef.current = notes;

  const debouncedSave = useCallback(
    debounce((newNotes) => {
      saveNotesToStorage(newNotes);
    }, 500),
    []
  );

  const updateNote = useCallback((roomType, content) => {
    const newNotes = { ...notesRef.current, [roomType]: content };
    setNotes(newNotes);
    debouncedSave(newNotes);
  }, [debouncedSave]);

  return { notes, updateNote };
};