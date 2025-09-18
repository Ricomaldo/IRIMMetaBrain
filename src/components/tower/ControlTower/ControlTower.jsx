// src/components/tower/ControlTower/ControlTower.jsx

import React from 'react';
import { TowerContainer, TopRow, BottomRow, CenterRect } from './ControlTower.styles';
import IconButton from '../../common/IconButton/IconButton';
import { controlButtons, quickActions } from '../../../utils/buttonMapping';

/**
 * Tour de contrôle avec actions rapides et statistiques
 * @renders TowerContainer
 * @renders TopRow
 * @renders IconButton
 * @renders CenterRect
 * @renders div
 * @renders BottomRow
 */
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
          onClick={calendarBtn?.action}
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
          onClick={timerBtn?.action}
        />
      </TopRow>

      <BottomRow>
        {quickActions.map(action => (
          <IconButton
            key={action.id}
            icon={action.icon}
            size="medium"
            title={action.label}
            onClick={action.onClick}
          />
        ))}
      </BottomRow>
    </TowerContainer>
  );
};

export default ControlTower;
