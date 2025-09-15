// src/components/common/MarkdownPanel/MarkdownPanel.jsx

import React, { useState, useMemo } from 'react';
import { useTheme } from 'styled-components';
import Panel from '../Panel';
import MarkdownEditor from '../MarkdownEditor';

const MarkdownPanel = ({
  // HÉRITE DE PANEL
  title,
  icon,
  variant = "default",
  maxHeight = "500px",
  gridColumn,
  gridRow,
  collapsible = true,
  defaultCollapsed = false,

  // MARKDOWN
  value = "",
  onChange,
  placeholder = "Écrivez en markdown...",

  // ÉDITION
  editable = true,
  showPreview = true,
  showMetrics = false,

  // ÉVÉNEMENTS
  onClick
}) => {
  const theme = useTheme();
  const [isEditing, setIsEditing] = useState(!showPreview);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [zoomLevel, setZoomLevel] = useState(0); // -2, -1, 0, 1, 2

  // Obtenir la couleur d'accent basée sur le variant
  const getVariantColor = () => {
    if (variant === 'roadmap') return theme.colors.accents.cold;
    if (variant === 'todo') return theme.colors.accents.success;
    if (variant === 'notes') return theme.colors.accents.warm;
    return theme.colors.accents.cold; // Default
  };

  const accentColor = getVariantColor();

  // Calculer les métriques du contenu pour badge
  const metrics = useMemo(() => {
    if (!value || !showMetrics) return { total: 0, completed: 0 };

    const lines = value.split('\n');
    const checkboxes = lines.filter(line => line.includes('- ['));
    const completed = lines.filter(line => line.includes('- [x]'));

    return {
      total: checkboxes.length,
      completed: completed.length
    };
  }, [value, showMetrics]);

  const getBadgeCount = () => {
    if (!showMetrics || metrics.total === 0) return null;

    if (variant === 'todo') {
      return metrics.total - metrics.completed; // Tâches restantes
    }
    return metrics.total; // Total des éléments
  };

  // Gestion du zoom
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, -2));
  };

  return (
    <Panel
      title={title}
      icon={icon}
      variant={variant}
      maxHeight={maxHeight}
      gridColumn={gridColumn}
      gridRow={gridRow}
      collapsible={collapsible}
      collapsed={isCollapsed}
      onToggleCollapse={setIsCollapsed}
      badge={getBadgeCount()}
      onClick={onClick}
    >
      {/* Actions dans le header */}
      <div isHeaderAction={true} style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {/* Boutons zoom */}
        <button
          onClick={handleZoomOut}
          disabled={zoomLevel <= -2}
          style={{
            background: '#F0F0F0',
            border: '1px solid currentColor',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: zoomLevel <= -2 ? 'not-allowed' : 'pointer',
            minWidth: '32px',
            height: '24px',
            opacity: zoomLevel <= -2 ? 0.4 : 1
          }}
          title="Réduire la taille du texte"
        >
          🔍︎-
        </button>
        <button
          onClick={handleZoomIn}
          disabled={zoomLevel >= 2}
          style={{
            background: '#F0F0F0',
            border: '1px solid currentColor',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: zoomLevel >= 2 ? 'not-allowed' : 'pointer',
            minWidth: '32px',
            height: '24px',
            opacity: zoomLevel >= 2 ? 0.4 : 1
          }}
          title="Augmenter la taille du texte"
        >
          🔍︎+
        </button>

        {/* Bouton d'édition */}
        {editable && showPreview && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              background: isEditing ? 'white' : '#F0F0F0',
              border: '1px solid currentColor',
              borderRadius: '6px',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer',
              minWidth: '32px',
              height: '24px',
              marginLeft: '4px'
            }}
            title={isEditing ? 'Mode lecture' : 'Mode édition'}
          >
            {isEditing ? '👁️' : '✏️'}
          </button>
        )}
      </div>

      {/* Contenu principal */}
      <MarkdownEditor
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        height="100%"
        compact={true}
        showPreview={showPreview}
        title={title}
        variant="embedded"
        readOnly={!isEditing}
        zoomLevel={zoomLevel}
        accentColor={accentColor}
      />
    </Panel>
  );
};

export default MarkdownPanel;