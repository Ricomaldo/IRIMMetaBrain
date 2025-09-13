// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.jsx

import React from 'react';
import { DrawerContainer, ToolGrid } from './WorkbenchDrawer.styles';
import IconButton from '../../../common/IconButton/IconButton';
import { workbenchButtons } from '../../../../utils/buttonMapping';

const WorkbenchDrawer = () => {
  return (
    <DrawerContainer>
      <div>WorkbenchDrawer</div>
      <ToolGrid>
        {workbenchButtons.map(button => (
          <IconButton
            key={button.id}
            icon={button.icon}
            label={button.label}
            onClick={button.action}
          />
        ))}
      </ToolGrid>
    </DrawerContainer>
  );
};

export default WorkbenchDrawer;
