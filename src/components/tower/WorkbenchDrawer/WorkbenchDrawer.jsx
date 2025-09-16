// src/components/tower/WorkbenchDrawer/WorkbenchDrawer.jsx

import React, { useState, useMemo } from 'react';
import { DrawerContainer, TabsHeader, TabButton, TabContent, ItemsGrid } from './WorkbenchDrawer.styles';
import IconButton from '../../common/IconButton/IconButton';
import { drawerTabs, drawerItemsByTab } from '../../../utils/buttonMapping';

const WorkbenchDrawer = () => {
  const [activeTab, setActiveTab] = useState('potions');
  const items = useMemo(() => drawerItemsByTab[activeTab] || [], [activeTab]);

  return (
    <DrawerContainer>
      <TabsHeader>
        {drawerTabs.map(tab => (
          <TabButton
            key={tab.id}
            $active={tab.id === activeTab}
            onClick={() => setActiveTab(tab.id)}
            title={tab.label}
          >
            <span style={{ fontSize: '20px' }}>{tab.icon}</span>
            {tab.id === activeTab && (
              <span style={{ 
                position: 'absolute',
                bottom: '-1px', 
                left: '0', 
                right: '0', 
                height: '3px',
                background: 'transparent' 
              }} />
            )}
          </TabButton>
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

    </DrawerContainer>
  );
};

export default WorkbenchDrawer;
