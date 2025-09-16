// src/components/tower/ControlTower/ControlTower.jsx

import React from 'react';
import { TowerContainer, TopRow, BottomRow, CenterRect } from './ControlTower.styles';
import IconButton from '../../common/IconButton/IconButton';
import { controlButtons, quickActions } from '../../../utils/buttonMapping';

const ControlTower = () => {
  const calendarBtn = controlButtons.find(btn => btn.id === 'calendar');
  const timerBtn = controlButtons.find(btn => btn.id === 'timer');
  const stats = controlButtons.filter(btn => btn.type === 'stat');

  return (
    <TowerContainer>
      <TopRow>
        <IconButton
          icon={calendarBtn?.icon}
          size="large"
          title={calendarBtn?.label}
        />
        <CenterRect>
          {stats.map(stat => (
            <div key={stat.id} title={stat.label}>
              {stat.icon} {stat.value}
            </div>
          ))}
        </CenterRect>
        <IconButton
          icon={timerBtn?.icon}
          size="large"
          title={timerBtn?.label}
        />
      </TopRow>
      
      <BottomRow>
        {quickActions.map(action => (
          <IconButton
            key={action.id}
            icon={action.icon}
            size="medium"
            title={action.label}
          />
        ))}
      </BottomRow>
    </TowerContainer>
  );
};

export default ControlTower;
