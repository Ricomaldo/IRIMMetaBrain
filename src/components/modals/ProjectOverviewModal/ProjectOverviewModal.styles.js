// src/components/modals/ProjectOverviewModal/ProjectOverviewModal.styles.js

import styled from 'styled-components';
import { alpha } from '../../../styles/color';

export const OverviewContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  min-height: 500px;
  max-height: 80vh;
  overflow-y: auto;
  background: ${({ theme }) => alpha(theme.colors.backgroundLight, 0.5)};
`;

export const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md};
  background: white;
  border-radius: ${({ theme }) => theme.radii.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  box-shadow: 0 2px 8px ${({ theme }) => alpha(theme.colors.black, 0.1)};

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const CategorySection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
  background: white;
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 2px 8px ${({ theme }) => alpha(theme.colors.black, 0.1)};
`;

export const CategoryTitle = styled.h3`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => alpha(theme.colors.primary, 0.2)};
  font-weight: 600;
`;

export const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ProjectCard = styled.div`
  position: relative;
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $selected }) =>
    $selected
      ? alpha(theme.colors.primary, 0.15)
      : 'white'
  };
  border: 2px solid ${({ theme, $selected }) =>
    $selected
      ? theme.colors.primary
      : alpha(theme.colors.border, 0.3)
  };
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 1px 3px ${({ theme }) => alpha(theme.colors.black, 0.1)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => alpha(theme.colors.black, 0.15)};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const CheckboxWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};

  input {
    cursor: pointer;
    width: 18px;
    height: 18px;
  }
`;

export const ProjectName = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  margin: 0 0 ${({ theme }) => theme.spacing.xs} 0;
  font-weight: 600;
`;

export const ProjectStatus = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, $status }) => {
    switch($status) {
      case 'dev_actif': return alpha(theme.colors.success, 0.2);
      case 'concept': return alpha(theme.colors.warning, 0.2);
      case 'vision': return alpha(theme.colors.info, 0.2);
      default: return alpha(theme.colors.textSecondary, 0.2);
    }
  }};
  color: ${({ theme, $status }) => {
    switch($status) {
      case 'dev_actif': return theme.colors.success;
      case 'concept': return theme.colors.warning;
      case 'vision': return theme.colors.info;
      default: return theme.colors.textSecondary;
    }
  }};
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const ProjectCategory = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-style: italic;
`;

export const ActionButton = styled.button`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing.xl};
  right: ${({ theme, $secondary }) => $secondary ? `calc(${theme.spacing.xl} + 200px)` : theme.spacing.xl};
  background: ${({ theme, $secondary }) => $secondary ? theme.colors.success : theme.colors.primary};
  color: white;
  border: none;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px ${({ theme, $secondary }) => alpha($secondary ? theme.colors.success : theme.colors.primary, 0.3)};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px ${({ theme, $secondary }) => alpha($secondary ? theme.colors.success : theme.colors.primary, 0.4)};
  }
`;

export const CategoryEditor = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => alpha(theme.colors.backgroundLight, 0.5)};
  border-radius: ${({ theme }) => theme.radii.md};
`;

export const NewProjectForm = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: 0 2px 8px ${({ theme }) => alpha(theme.colors.black, 0.1)};
  margin-bottom: ${({ theme }) => theme.spacing.xl};

  h3 {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.primary};
  }

  input, select {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => alpha(theme.colors.border, 0.5)};
    border-radius: ${({ theme }) => theme.radii.sm};
    font-size: ${({ theme }) => theme.typography.sizes.md};

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  button {
    background: ${({ theme }) => theme.colors.success};
    color: white;
    border: none;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.md};
    cursor: pointer;
    font-weight: 600;

    &:hover {
      opacity: 0.9;
    }
  }
`;