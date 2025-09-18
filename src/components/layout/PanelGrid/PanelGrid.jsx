// src/components/layout/PanelGrid/PanelGrid.jsx

import React from 'react';
import { GridContainer } from './PanelGrid.styles';

const PanelGrid = ({
  columns = 5,
  rows = 5,
  gap = "8px",
  children,
  style,
  ...props
}) => {
  return (
    <GridContainer
      $columns={columns}
      $rows={rows}
      $gap={gap}
      style={style}
      {...props}
    >
      {children}
    </GridContainer>
  );
};

export default PanelGrid;