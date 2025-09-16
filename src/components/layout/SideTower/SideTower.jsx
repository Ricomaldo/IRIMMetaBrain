// src/components/layout/SideTower/SideTower.jsx

import React from 'react';
import { TowerContainer } from './SideTower.styles';
import { ControlTower, WorkbenchDrawer, SideTowerNotes } from '../../tower';

const SideTower = () => {
  return (
    <TowerContainer>
      <ControlTower />
      <WorkbenchDrawer />
      <SideTowerNotes />
    </TowerContainer>
  );
};

export default SideTower;
