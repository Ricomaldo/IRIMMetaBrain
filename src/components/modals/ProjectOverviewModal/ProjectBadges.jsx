// src/components/modals/ProjectOverviewModal/ProjectBadges.jsx

import React from 'react';
import styled from 'styled-components';
import { alpha } from '../../../styles/color';

const BadgesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 2px 6px;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: 11px;
  font-weight: 500;
  line-height: 1.4;
`;

const ContractBadge = styled(Badge)`
  background: ${({ theme, $type }) => {
    switch($type) {
      case 'conception': return alpha(theme.colors.primary, 0.2);
      case 'maintenance': return alpha(theme.colors.warning, 0.2);
      case 'consultation': return alpha(theme.colors.info, 0.2);
      case 'forfait': return alpha(theme.colors.success, 0.2);
      default: return 'transparent';
    }
  }};
  color: ${({ theme, $type }) => {
    switch($type) {
      case 'conception': return theme.colors.primary;
      case 'maintenance': return theme.colors.warning;
      case 'consultation': return theme.colors.info;
      case 'forfait': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  }};
  border: 1px solid ${({ theme, $type }) => {
    switch($type) {
      case 'conception': return alpha(theme.colors.primary, 0.3);
      case 'maintenance': return alpha(theme.colors.warning, 0.3);
      case 'consultation': return alpha(theme.colors.info, 0.3);
      case 'forfait': return alpha(theme.colors.success, 0.3);
      default: return 'transparent';
    }
  }};
`;

const DeploymentBadge = styled(Badge)`
  background: ${({ theme, $status }) => {
    switch($status) {
      case 'production': return alpha(theme.colors.success, 0.2);
      case 'staging': return alpha(theme.colors.warning, 0.2);
      case 'dev': return alpha(theme.colors.info, 0.2);
      case 'local': return alpha(theme.colors.textSecondary, 0.1);
      default: return 'transparent';
    }
  }};
  color: ${({ theme, $status }) => {
    switch($status) {
      case 'production': return theme.colors.success;
      case 'staging': return theme.colors.warning;
      case 'dev': return theme.colors.info;
      case 'local': return theme.colors.textSecondary;
      default: return theme.colors.textSecondary;
    }
  }};

  &::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
    animation: ${({ $status }) => $status === 'production' ? 'pulse 2s infinite' : 'none'};
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const TechBadge = styled(Badge)`
  background: ${({ theme }) => alpha(theme.colors.secondary, 0.1)};
  color: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => alpha(theme.colors.secondary, 0.2)};
`;

const ClientBadge = styled(Badge)`
  background: ${({ theme }) => alpha(theme.colors.accent, 0.1)};
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => alpha(theme.colors.accent, 0.2)};

  &::before {
    content: '👤';
    font-size: 10px;
  }
`;

const ProjectBadges = ({ project, showAll = false }) => {
  if (!project) return null;

  const deploymentLabels = {
    production: '🚀 Prod',
    staging: '🧪 Staging',
    dev: '🔧 Dev',
    local: '💻 Local'
  };

  const contractLabels = {
    conception: '📐 Conception',
    maintenance: '🔧 Maintenance',
    consultation: '💼 Consultation',
    forfait: '📦 Forfait'
  };

  // Limiter les technologies affichées si showAll est false
  const techsToShow = showAll ? project.technologies : project.technologies?.slice(0, 3);
  const hasMoreTechs = !showAll && project.technologies?.length > 3;

  return (
    <BadgesContainer>
      {project.contractType && (
        <ContractBadge $type={project.contractType}>
          {contractLabels[project.contractType]}
        </ContractBadge>
      )}

      {project.deploymentStatus && (
        <DeploymentBadge $status={project.deploymentStatus}>
          {deploymentLabels[project.deploymentStatus]}
        </DeploymentBadge>
      )}

      {project.client && (
        <ClientBadge>
          {project.client}
        </ClientBadge>
      )}

      {techsToShow?.map(tech => (
        <TechBadge key={tech}>
          {tech}
        </TechBadge>
      ))}

      {hasMoreTechs && (
        <TechBadge>
          +{project.technologies.length - 3}
        </TechBadge>
      )}
    </BadgesContainer>
  );
};

export default ProjectBadges;