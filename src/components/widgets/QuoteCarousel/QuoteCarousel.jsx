// src/components/widgets/QuoteCarousel/QuoteCarousel.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { metalBg, secondaryLevel } from '../../../styles/mixins';
import mantrasData from '../../../data/mantras.json';
import { usePanelContext } from '../../common/Panel/PanelContext';

const Container = styled.div`
  height: 100%;
  width: 100%;
  ${metalBg}
  ${secondaryLevel}
  border: 1px solid ${({ theme }) => theme.colors.text.light};
  border-radius: ${({ theme }) => theme.radii.md};

  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.sm};
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text.light};
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary}20;
    opacity: 0.8;
  }
`;

const Center = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.light};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 ${({ theme }) => theme.spacing.sm};
`;

const Quote = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: 400;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  line-height: 1.3;
  font-style: italic;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const Category = styled.div`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  opacity: 0.7;
  margin-top: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

/**
 * Widget de carousel de citations basé sur ProjectCarousel
 * Affiche aléatoirement les mantras depuis mantras.json
 * @param {Object} mantras - Données des mantras (optionnel, utilise mantras.json par défaut)
 * @param {boolean} showCategory - Afficher la catégorie sous la citation (défaut: true)
 * @param {boolean} infinite - Activer le défilement infini et réversible (défaut: false)
 * @param {boolean} random - Mode aléatoire : droite = aléatoire, gauche = précédent (défaut: false)
 */
const QuoteCarousel = ({ mantras = mantrasData, showCategory = true, infinite = false, random = false }) => {
  const panelContext = usePanelContext();
  const [allQuotes, setAllQuotes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousQuotes, setPreviousQuotes] = useState([]); // Pile des précédents pour le mode aléatoire

  // Flatten tous les mantras avec leur catégorie
  useEffect(() => {
    const quotes = [];
    const { meta, ...categoriesMap } = mantras;
    // Exposer les catégories et icônes au PanelContext pour les filtres visuels
    const categoriesList = Object.keys(categoriesMap);
    panelContext.setCategories && panelContext.setCategories(categoriesList);
    panelContext.setIconsMap && panelContext.setIconsMap(meta?.icons || {});

    Object.entries(categoriesMap).forEach(([category, categoryQuotes]) => {
      categoryQuotes.forEach(quote => {
        quotes.push({ text: quote, category });
      });
    });
    
    // Mélanger aléatoirement
    const shuffled = quotes.sort(() => Math.random() - 0.5);
    setAllQuotes(shuffled);
    setCurrentIndex(0);
  }, [mantras]);

  // Réinitialiser la pile de précédents si les filtres changent
  useEffect(() => {
    if (random) {
      setPreviousQuotes([]);
    }
  }, [panelContext.activeFilters, random]);

  const goPrev = () => {
    if (random) {
      // Mode aléatoire : revenir au précédent depuis la pile
      if (previousQuotes.length > 0) {
        const previousQuote = previousQuotes[previousQuotes.length - 1];
        setPreviousQuotes(prev => prev.slice(0, -1)); // Retirer le dernier
        setCurrentIndex(previousQuote.index);
      }
    } else if (infinite) {
      setCurrentIndex(prev => 
        prev === 0 ? allQuotes.length - 1 : prev - 1
      );
    } else {
      setCurrentIndex(prev => Math.max(0, prev - 1));
    }
  };

  const goNext = () => {
    if (random) {
      // Mode aléatoire : ajouter le current à la pile et aller au suivant aléatoire
      const currentQuote = filteredQuotes[currentIndexSafe];
      if (currentQuote) {
        setPreviousQuotes(prev => [...prev, { 
          index: currentIndexSafe, 
          quote: currentQuote 
        }]);
      }
      
      // Générer un index aléatoire différent du current
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      } while (randomIndex === currentIndexSafe && filteredQuotes.length > 1);
      
      setCurrentIndex(randomIndex);
    } else if (infinite) {
      setCurrentIndex(prev => 
        prev === allQuotes.length - 1 ? 0 : prev + 1
      );
    } else {
      setCurrentIndex(prev => Math.min(allQuotes.length - 1, prev + 1));
    }
  };

  if (allQuotes.length === 0) {
    return (
      <Container>
        <div></div>
        <Center>
          <Quote>Chargement des mantras...</Quote>
        </Center>
        <div></div>
      </Container>
    );
  }

  // Appliquer les filtres s'ils existent
  const filteredQuotes = panelContext.activeFilters && panelContext.activeFilters.length > 0
    ? allQuotes.filter(q => panelContext.activeFilters.includes(q.category))
    : allQuotes;

  const currentIndexSafe = filteredQuotes.length > 0
    ? Math.min(currentIndex, filteredQuotes.length - 1)
    : 0;

  if (filteredQuotes.length === 0) {
    return (
      <Container>
        <div></div>
        <Center>
          <Quote>Aucun mantra pour les filtres sélectionnés</Quote>
        </Center>
        <div></div>
      </Container>
    );
  }

  const currentQuote = filteredQuotes[currentIndexSafe];

  // Logique des boutons selon le mode
  const canGoPrev = random 
    ? previousQuotes.length > 0 
    : infinite || currentIndexSafe > 0;
  const canGoNext = random 
    ? filteredQuotes.length > 1 
    : infinite || currentIndexSafe < filteredQuotes.length - 1;

  return (
    <Container>
      <Button onClick={goPrev} disabled={!canGoPrev}>◀</Button>
      <Center>
        <Quote>"{currentQuote.text}"</Quote>
        {showCategory && <Category>{currentQuote.category}</Category>}
      </Center>
      <Button onClick={goNext} disabled={!canGoNext}>▶</Button>
    </Container>
  );
};

export default QuoteCarousel;
