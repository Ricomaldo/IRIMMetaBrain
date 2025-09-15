// src/components/common/MarkdownPanel/MarkdownPanel.jsx

import React, { useState, useMemo } from 'react';
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
  const [isEditing, setIsEditing] = useState(!showPreview);
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

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
      {/* Bouton d'édition dans le header */}
      {editable && showPreview && (
        <button
          isHeaderAction={true}
          onClick={() => setIsEditing(!isEditing)}
          style={{
            background: isEditing ? 'white' : '#F0F0F0',
            border: '1px solid currentColor',
            borderRadius: '6px',
            padding: '4px 8px',
            fontSize: '12px',
            cursor: 'pointer',
            minWidth: '32px',
            height: '24px'
          }}
          title={isEditing ? 'Mode lecture' : 'Mode édition'}
        >
          {isEditing ? '👁️' : '✏️'}
        </button>
      )}

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
      />
    </Panel>
  );
};

export default MarkdownPanel;