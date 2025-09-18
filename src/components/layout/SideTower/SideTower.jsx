// src/components/layout/SideTower/SideTower.jsx

import React from 'react';
import {
  TowerContainer,
  TopTowerFloor,
  MiddleTowerFloor,
  BottomTowerFloor
} from './SideTower.styles';
import { ControlTower, WorkbenchDrawer, SideTowerNotes } from '../../tower';

/**
 * Tour latérale contenant les contrôles et outils
 * @renders ControlTower
 * @renders WorkbenchDrawer
 * @renders SideTowerNotes
 */
const SideTower = () => {
  return (
    <TowerContainer>
      <TopTowerFloor id="control-tower-floor">
        <ControlTower />
      </TopTowerFloor>

      <MiddleTowerFloor id="workbench-floor">
        <WorkbenchDrawer />
      </MiddleTowerFloor>

      <BottomTowerFloor id="notes-floor">
        <SideTowerNotes />
      </BottomTowerFloor>
    </TowerContainer>
  );
};

export default SideTower;
