// src/hooks/useMarkdownNotes.js

import { useState, useCallback, useRef } from 'react';
import { debounce } from '../utils/debounce';

export const useMarkdownNotes = (storageKey, initialStructure = {}) => {
  const loadNotesFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialStructure;
    } catch (error) {
      console.warn(`Erreur de chargement des notes (${storageKey}):`, error);
      return initialStructure;
    }
  }, [storageKey, initialStructure]);

  const saveNotesToStorage = useCallback((notes) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(notes));
    } catch (error) {
      console.warn(`Erreur de sauvegarde des notes (${storageKey}):`, error);
    }
  }, [storageKey]);

  const [notes, setNotes] = useState(loadNotesFromStorage);
  const notesRef = useRef(notes);

  // Mise à jour de la ref à chaque changement
  notesRef.current = notes;

  const debouncedSave = useCallback(
    debounce((newNotes) => {
      saveNotesToStorage(newNotes);
    }, 500),
    [saveNotesToStorage]
  );

  const updateNote = useCallback((key, content) => {
    const newNotes = typeof key === 'string'
      ? { ...notesRef.current, [key]: content }
      : key; // Si key est déjà l'objet complet

    setNotes(newNotes);
    debouncedSave(newNotes);
  }, [debouncedSave]);

  const updateSingleNote = useCallback((content) => {
    updateNote('general', content);
  }, [updateNote]);

  return {
    notes,
    updateNote,
    updateSingleNote // Pour les cas où il n'y a qu'une seule note
  };
};