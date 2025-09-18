import styled from 'styled-components';

export const CatalogContainer = styled.div`
  display: flex;
  height: 100%;
  background: transparent;
  color: white;
  font-family: 'Inter', -apple-system, sans-serif;
`;

export const Sidebar = styled.div`
  width: 240px;
  background: rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  overflow-y: auto;
  max-height: 100%;

  h2 {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    color: #ffd700;
  }
`;

export const CategorySection = styled.div`
  margin-bottom: 2rem;

  h3 {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.75rem;
  }
`;

export const ComponentItem = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: 0.25rem;
  background: ${props => props.$active ?
    'linear-gradient(90deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.05) 100%)' :
    'rgba(255, 255, 255, 0.03)'};
  border: 1px solid ${props => props.$active ?
    'rgba(255, 215, 0, 0.3)' :
    'transparent'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 215, 0, 0.2);
    transform: translateX(4px);
  }
`;

export const MainArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const TabBar = styled.div`
  display: flex;
  background: rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const Tab = styled.button`
  padding: 1rem 2rem;
  background: ${props => props.$active ?
    'rgba(255, 215, 0, 0.1)' :
    'transparent'};
  border: none;
  border-bottom: 2px solid ${props => props.$active ?
    '#ffd700' :
    'transparent'};
  color: ${props => props.$active ?
    '#ffd700' :
    'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: white;
  }
`;

export const PreviewArea = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  overflow: auto;
`;

export const ControlPanel = styled.div`
  flex: 1;
  padding: 1.5rem;
  overflow-y: auto;

  h3 {
    color: #ffd700;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
`;

export const CodeView = styled.div`
  flex: 1;
  padding: 2rem;
  overflow: auto;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-width: 0; /* Important pour permettre le rétrécissement */

  pre {
    margin: 0;
    width: 100%;
    box-sizing: border-box;
  }

  code {
    color: #ffd700;
    font-family: 'Fira Code', 'Monaco', 'Courier New', monospace;
    font-size: 0.9rem;
    line-height: 1.6;
  }
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 1.25rem;
`;