// src/components/layout/SideTower/ControlTower/ControlTower.jsx

import React from 'react';
import { TowerContainer, ButtonGroup } from './ControlTower.styles';
import IconButton from '../../../common/IconButton/IconButton';
import { controlButtons } from '../../../../utils/buttonMapping';

const ControlTower = () => {
  return (
    <TowerContainer>
      <div>ControlTower</div>
      <ButtonGroup>
        {controlButtons.map(button => (
          <IconButton
            key={button.id}
            icon={button.icon}
            label={button.label}
            onClick={button.action}
          />
        ))}
      </ButtonGroup>
    </TowerContainer>
  );
};

export default ControlTower;
