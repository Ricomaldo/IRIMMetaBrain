// src/components/layout/SideTower/ControlTower/ControlTower.jsx

import React from 'react';
import { TowerContainer, TopRow, BottomRow, LeftSquare, CenterRect, RightSquare, ActionGrid } from './ControlTower.styles';
import IconButton from '../../../common/IconButton/IconButton';
import { controlButtons, quickActions } from '../../../../utils/buttonMapping';

const ControlTower = () => {
  const calendarBtn = controlButtons.find(btn => btn.id === 'calendar');
  const timerBtn = controlButtons.find(btn => btn.id === 'timer');
  const stats = controlButtons.filter(btn => btn.type === 'stat');

  return (
    <TowerContainer>
      <TopRow>
        <IconButton
          icon={calendarBtn?.icon}
          label=""
          onClick={calendarBtn?.action}
          size="large"
          title={calendarBtn?.label}
        />
        <CenterRect>
          <div title={stats[1]?.label}>{stats[1]?.icon} {stats[1]?.value}</div>
          <div title={stats[2]?.label}>{stats[2]?.icon} {stats[2]?.value}</div>
        </CenterRect>
        <IconButton
          icon={timerBtn?.icon}
          label=""
          onClick={timerBtn?.action}
          size="large"
          title={timerBtn?.label}
        />
      </TopRow>
      
      <BottomRow>
        <ActionGrid>
          {quickActions.map(action => (
            <IconButton
              key={action.id}
              icon={action.icon}
              label=""
              onClick={action.onClick}
              size="small"
            />
          ))}
        </ActionGrid>
      </BottomRow>
    </TowerContainer>
  );
};

export default ControlTower;
