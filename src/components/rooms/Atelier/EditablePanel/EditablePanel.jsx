// src/components/rooms/Atelier/EditablePanel/EditablePanel.jsx

import React, { useState, useMemo } from 'react';
import MarkdownEditor from '../../../common/MarkdownEditor';
import { 
  PanelWrapper, 
  PanelContainer, 
  PanelHeader, 
  PanelContent,
  PanelBadge,
  ToggleButton,
  HeaderContent
} from './EditablePanel.styles';

const EditablePanel = ({
  title,
  value,
  onChange,
  placeholder,
  gridColumn,
  gridRow,
  panelType
}) => {
  const [isEditing, setIsEditing] = useState(false);

  // Calculer les métriques du contenu
  const metrics = useMemo(() => {
    if (!value) return { total: 0, completed: 0, progress: 0 };
    
    const lines = value.split('\n');
    const checkboxes = lines.filter(line => line.includes('- ['));
    const completed = lines.filter(line => line.includes('- [x]'));
    
    return {
      total: checkboxes.length,
      completed: completed.length,
      progress: checkboxes.length > 0 ? Math.round((completed.length / checkboxes.length) * 100) : 0
    };
  }, [value]);

  const getIcon = () => {
    switch (panelType) {
      case 'roadmap': return '🗺️';
      case 'todo': return '✅';
      default: return '📝';
    }
  };

  const getBadgeCount = () => {
    if (panelType === 'todo' && metrics.total > 0) {
      return metrics.total - metrics.completed; // Tâches restantes
    }
    return metrics.total; // Total des éléments
  };

  return (
    <PanelWrapper
      $gridColumn={gridColumn}
      $gridRow={gridRow}
      onClick={(e) => e.stopPropagation()}
    >
      <PanelContainer>
        <PanelHeader $panelType={panelType}>
          <HeaderContent>
            <span>{getIcon()} {title}</span>
            {metrics.total > 0 && (
              <PanelBadge $panelType={panelType}>
                {getBadgeCount()}
              </PanelBadge>
            )}
          </HeaderContent>
          
          <ToggleButton 
            onClick={() => setIsEditing(!isEditing)}
            $active={isEditing}
            title={isEditing ? 'Mode lecture' : 'Mode édition'}
          >
            {isEditing ? '👁️' : '✏️'}
          </ToggleButton>
        </PanelHeader>

        <PanelContent $panelType={panelType}>
          <MarkdownEditor
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            height="100%"
            compact={true}
            showPreview={!isEditing}
            toolbar={isEditing}
            title={title}
            variant="embedded"
          />
        </PanelContent>
      </PanelContainer>
    </PanelWrapper>
  );
};

export default EditablePanel;