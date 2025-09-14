// src/components/layout/SideTower/WorkbenchDrawer/WorkbenchDrawer.jsx

import React, { useState, useMemo } from 'react';
import { DrawerContainer, TabsHeader, TabContent, ItemsGrid } from './WorkbenchDrawer.styles';
import IconButton from '../../../common/IconButton/IconButton';
import SideTowerNotes from '../SideTowerNotes/SideTowerNotes';
import { drawerTabs, drawerItemsByTab } from '../../../../utils/buttonMapping';

const WorkbenchDrawer = () => {
  const [activeTab, setActiveTab] = useState('potions');
  const items = useMemo(() => drawerItemsByTab[activeTab] || [], [activeTab]);

  return (
    <DrawerContainer>
      <TabsHeader>
        {drawerTabs.map(tab => (
          <IconButton
            key={tab.id}
            icon={tab.icon}
            label=""
            onClick={() => setActiveTab(tab.id)}
            size="medium"
            title={tab.label}
            active={tab.id === activeTab}
            variant="tab"
          />
        ))}
      </TabsHeader>

      <TabContent>
        <ItemsGrid>
          {items.map(item => (
            <div key={item.id} style={{ position: 'relative' }} title={item.label}>
              <IconButton icon={item.icon} label="" onClick={() => {}} size="medium" />
            </div>
          ))}
        </ItemsGrid>
      </TabContent>

      <SideTowerNotes />
    </DrawerContainer>
  );
};

export default WorkbenchDrawer;
