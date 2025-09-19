// src/components/common/CategoryFilters/CategoryFilters.jsx

import React from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const FilterButton = styled.button`
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : '#F0F0F0'};
  color: ${({ $active, theme }) =>
    $active ? 'white' : theme.colors.text};
  border: 1px solid currentColor;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  min-width: 32px;
  height: 24px;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }
`;

/**
 * Composant de filtres par catégories pour les mantras
 */
const CategoryFilters = ({
  categories = [],
  activeFilters = [],
  onToggleFilter,
  onClearFilters,
  iconsMap = {}
}) => {
  return (
    <FilterContainer>
      {categories.map(category => (
        <FilterButton
          key={category}
          $active={activeFilters.includes(category)}
          onClick={() => onToggleFilter && onToggleFilter(category)}
          title={`Filtrer par ${category}`}
        >
          {iconsMap[category] || '📝'}
        </FilterButton>
      ))}

      {activeFilters.length > 0 && (
        <FilterButton
          onClick={onClearFilters}
          title="Effacer tous les filtres"
          style={{ marginLeft: '4px' }}
        >
          ✕
        </FilterButton>
      )}
    </FilterContainer>
  );
};

export default CategoryFilters;

