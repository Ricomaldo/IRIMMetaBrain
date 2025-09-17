import styled from 'styled-components';

export const OverviewContainer = styled.div`
  padding: 1rem;
  background: transparent;
  height: 100%;
  color: white;
  font-family: 'Inter', -apple-system, sans-serif;
  overflow: auto;

  h1 {
    color: #ffd700;
    margin-bottom: 1rem;
    text-align: center;
    font-size: 1.5rem;
  }
`;

export const GraphArea = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  position: relative;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Node = styled.g`
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Connection = styled.line`
  pointer-events: none;
`;

export const StatsCard = styled.div`
  flex: 1;
  background: rgba(255, 215, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;

  h3 {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .value {
    font-size: 2rem;
    font-weight: bold;
    color: #ffd700;
  }
`;

export const InfoPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 8px;
  padding: 1rem;
  max-width: 250px;
  z-index: 10;

  h3 {
    color: #ffd700;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    color: rgba(255, 255, 255, 0.8);
    font-size: 0.9rem;

    strong {
      color: rgba(255, 215, 0, 0.8);
    }
  }
`;

export const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    background: ${props => props.color};
    border-radius: 50%;
    opacity: 0.8;
  }
`;