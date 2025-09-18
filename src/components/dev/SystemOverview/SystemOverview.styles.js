import styled from "styled-components";
import { woodBg, stoneBg, metalBg } from "../../../styles/mixins";

export const OverviewContainer = styled.div`
  padding: 1rem;
  background: transparent;
  height: 100%;
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.typography.families.ui};
  overflow: auto;
  display: flex;
  flex-direction: column;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
    text-shadow: 0 3px 6px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.3);
    font-family: "Georgia", serif;
    letter-spacing: 1px;
    position: relative;

    &::after {
      content: "";
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 2px;
      background: linear-gradient(90deg,
        transparent,
        ${({ theme }) => theme.colors.primary},
        transparent);
    }
  }
`;

export const GraphArea = styled.div`
  ${stoneBg}
  border: 4px solid #8B7355;
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 0;
  margin-bottom: 1rem;
  position: relative;
  flex: 1;
  min-height: 400px;
  max-height: 450px;
  box-shadow:
    inset 0 3px 6px rgba(0, 0, 0, 0.6),
    0 6px 12px rgba(0, 0, 0, 0.4),
    inset 0 -1px 0 rgba(255, 215, 0, 0.1);
  overflow: hidden;
  background:
    ${stoneBg},
    radial-gradient(circle at center, rgba(255, 215, 0, 0.02), transparent 70%);

  svg {
    width: 100%;
    height: 100%;
    display: block;
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
  ${metalBg}
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: 3px solid #8b5a2b;
  border-radius: ${({ theme }) => theme.radii.md};
  padding: 1.2rem;
  min-width: 200px;
  max-width: 280px;
  z-index: 10;
  box-shadow:
    0 6px 12px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 215, 0, 0.2),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  background: rgba(20, 20, 20, 0.95);

  h3 {
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.8rem;
    font-family: "Georgia", serif;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    font-size: 1.1rem;
    border-bottom: 1px solid rgba(255, 215, 0, 0.2);
    padding-bottom: 0.5rem;
  }

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.9rem;
    font-family: "Georgia", serif;
    line-height: 1.4;

    strong {
      color: ${({ theme }) => theme.colors.accents.warm};
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
      font-weight: 600;
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 0.8rem;
  background: rgba(0, 0, 0, 0.2);
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid rgba(255, 215, 0, 0.1);
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-family: "Georgia", serif;

  &::before {
    content: "";
    width: 24px;
    height: 24px;
    background: ${(props) => props.color};
    border-radius: 50%;
    opacity: 0.9;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.5),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
`;
