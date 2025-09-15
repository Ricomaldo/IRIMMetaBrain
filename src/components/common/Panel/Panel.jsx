// src/components/common/Panel/Panel.jsx

import React, { useState } from 'react';
import {
  PanelWrapper,
  PanelContainer,
  PanelHeader,
  PanelContent,
  PanelBadge,
  ToggleButton,
  HeaderContent
} from './Panel.styles';

const Panel = ({
  // CONTENU
  title,
  icon,
  children,

  // APPARENCE
  variant = "default",
  maxHeight = "500px",

  // LAYOUT
  gridColumn,
  gridRow,

  // COMPORTEMENT
  collapsible = true,
  collapsed, // État contrôlé de l'extérieur
  defaultCollapsed = false,
  onToggleCollapse, // Callback pour contrôle externe
  badge,

  // ÉVÉNEMENTS
  onClick
}) => {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);

  // Utiliser l'état externe si fourni, sinon l'état interne
  const isCollapsed = collapsed !== undefined ? collapsed : internalCollapsed;

  const handleToggleCollapse = () => {
    if (onToggleCollapse) {
      onToggleCollapse(!isCollapsed);
    } else {
      setInternalCollapsed(!isCollapsed);
    }
  };

  return (
    <PanelWrapper
      $gridColumn={gridColumn}
      $gridRow={gridRow}
      onClick={onClick}
    >
      <PanelContainer $maxHeight={maxHeight} $collapsed={isCollapsed}>
        <PanelHeader $variant={variant}>
          <HeaderContent>
            <span>{icon} {title}</span>
            {badge && (
              <PanelBadge $variant={variant}>
                {badge}
              </PanelBadge>
            )}
          </HeaderContent>

          <div style={{ display: 'flex', gap: '4px' }}>
            {/* Actions personnalisées passées par les enfants */}
            {React.Children.toArray(children).find(child =>
              React.isValidElement(child) && child.props?.isHeaderAction
            )}

            {collapsible && (
              <ToggleButton
                onClick={handleToggleCollapse}
                $active={false}
                title={isCollapsed ? 'Développer' : 'Réduire'}
              >
                {isCollapsed ? '📂' : '📁'}
              </ToggleButton>
            )}
          </div>
        </PanelHeader>

        {!isCollapsed && (
          <PanelContent $variant={variant}>
            {/* Afficher seulement les enfants qui ne sont PAS des header actions */}
            {React.Children.toArray(children).filter(child =>
              !React.isValidElement(child) || !child.props?.isHeaderAction
            )}
          </PanelContent>
        )}
      </PanelContainer>
    </PanelWrapper>
  );
};

export default Panel;