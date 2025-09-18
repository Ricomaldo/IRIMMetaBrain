import styled from "styled-components";
import { woodBg, stoneBg, metalBg } from "../../../styles/mixins";

export const OverviewContainer = styled.div`
  padding: 1rem;
  background: transparent;
  height: 100%;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.families.ui};
  overflow: auto;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
    font-family: "Georgia", serif;
  }
`;

export const GraphArea = styled.div`
  ${stoneBg}
  border: 3px solid #8B7355;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
  min-height: 400px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3);

  svg {
    width: 100%;
    height: auto;
  }
`;

export const Node = styled.g`
  cursor: pointer;

  circle {
    transition: opacity 0.3s ease, r 0.3s ease;
  }

  &:hover circle {
    opacity: 1;
    r: 30;
  }
`;

export const Connection = styled.line`
  pointer-events: none;
`;

export const StatsCard = styled.div`
  ${woodBg}
  border: 2px solid #8B5A2B;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  box-shadow: inset 0 1px 0 rgba(255, 215, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  flex: 1;
  min-width: 100px;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    bottom: 2px;
    border: 1px solid rgba(255, 215, 0, 0.1);
    border-radius: 6px;
    pointer-events: none;
  }

  span {
    color: ${({ theme }) => theme.colors.secondary};
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    font-family: "Georgia", serif;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  strong {
    color: ${({ theme }) => theme.colors.primary};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    font-family: "Georgia", serif;
    font-size: 1.25rem;
    font-weight: bold;
  }
`;

export const InfoPanel = styled.div`
  ${woodBg}
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  border: 2px solid #8b5a2b;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1rem;
  max-width: 250px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 215, 0, 0.1);

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
    font-family: "Georgia", serif;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  p {
    margin: 0.3rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.85rem;
    font-family: "Georgia", serif;

    strong {
      color: ${({ theme }) => theme.colors.accents.warm};
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 20px;
    height: 20px;
    background: ${(props) => props.color};
    border-radius: 50%;
    opacity: 0.8;
  }
`;
