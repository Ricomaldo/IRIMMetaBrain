// src/components/layout/SideTower/SideTower.jsx

import React from 'react';
import { TowerContainer } from './SideTower.styles';
import ControlTower from './ControlTower/ControlTower';
import WorkbenchDrawer from './WorkbenchDrawer/WorkbenchDrawer';

const SideTower = () => {
  return (
    <TowerContainer>
      <ControlTower />
      <WorkbenchDrawer />
    </TowerContainer>
  );
};

export default SideTower;
