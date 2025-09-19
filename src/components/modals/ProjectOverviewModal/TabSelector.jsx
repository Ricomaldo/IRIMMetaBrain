// src/components/modals/ProjectOverviewModal/TabSelector.jsx

import React from 'react';
import styled from 'styled-components';
import { alpha } from '../../../styles/color';

const TabContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 2px solid ${({ theme }) => alpha(theme.colors.border, 0.2)};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const Tab = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : alpha(theme.colors.background, 0.8)
  };
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.text.primary
  };
  border: 2px solid ${({ theme, $active }) =>
    $active ? theme.colors.primary : alpha(theme.colors.border, 0.5)
  };
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: ${({ $active }) => $active ? 600 : 500};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : alpha(theme.colors.primary, 0.15)
    };
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme, $active }) =>
      $active ? 'white' : theme.colors.primary
    };
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    background: ${({ theme }) => alpha(theme.colors.stone, 0.1)};
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  margin-left: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme, $active }) =>
    $active ? alpha('white', 0.3) : alpha(theme.colors.primary, 0.2)
  };
  color: ${({ theme, $active }) =>
    $active ? 'white' : theme.colors.primary
  };
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
`;

const TabIcon = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
`;

const TabSelector = ({ activeTab, onTabChange, projectCounts = {} }) => {
  const tabs = [
    {
      id: 'pro',
      label: 'Professionnel',
      icon: '💼',
      count: projectCounts.pro || 0
    },
    {
      id: 'perso',
      label: 'Personnel',
      icon: '🏠',
      count: projectCounts.perso || 0
    },
    {
      id: 'formation',
      label: 'Formation',
      icon: '🎓',
      count: projectCounts.formation || 0
    }
  ];

  return (
    <TabContainer>
      {tabs.map(tab => (
        <Tab
          key={tab.id}
          $active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          disabled={tab.count === 0}
        >
          <TabIcon>{tab.icon}</TabIcon>
          {tab.label}
          <TabBadge $active={activeTab === tab.id}>
            {tab.count}
          </TabBadge>
        </Tab>
      ))}
    </TabContainer>
  );
};

export default TabSelector;