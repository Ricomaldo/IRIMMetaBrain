// src/components/layout/SideTower/SideTower.jsx

import React from 'react';
import { PanelContainer } from './SideTower.styles';
import ControlTower from './ControlTower/ControlTower';
import WorkbenchDrawer from './WorkbenchDrawer/WorkbenchDrawer';

const SideTower = () => {
  return (
    <PanelContainer>
      <ControlTower />
      <div style={{ flex: 1 }} /> {/* Spacer */}
      <WorkbenchDrawer />
    </PanelContainer>
  );
};

export default SideTower;
