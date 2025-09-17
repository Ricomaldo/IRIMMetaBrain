import React, { useState, useEffect } from 'react';
import {
  OverviewContainer,
  GraphArea,
  InfoPanel,
  StatsCard,
  Legend,
  LegendItem
} from './SystemOverview.styles';

// Hook pour l'introspection des composants
const useComponentIntrospection = () => {
  const [componentTree, setComponentTree] = useState(null);
  const [stats, setStats] = useState({
    totalComponents: 0,
    stores: 0,
    activeConnections: 0,
    renderCycles: 0
  });

  useEffect(() => {
    // Collecter les informations sur les stores Zustand
    const stores = window.__ZUSTAND_STORES__ || {};
    const storeCount = Object.keys(stores).length;

    // Analyser la structure des composants via React DevTools si disponible
    const analyzeReactTree = () => {
      // Simuler l'analyse de l'arbre React
      // En production, on pourrait utiliser React DevTools API
      const mockTree = {
        name: 'App',
        type: 'root',
        children: [
          {
            name: 'RoomCanvas',
            type: 'container',
            props: ['currentRoom', 'isNavigating'],
            children: [
              { name: 'Room3D', type: 'visual', props: ['room'] },
              { name: 'NavigationBar', type: 'navigation', props: ['onNavigate'] }
            ]
          },
          {
            name: 'NotesSection',
            type: 'content',
            props: ['notes', 'onUpdate'],
            store: 'notes',
            children: []
          },
          {
            name: 'ProjectManager',
            type: 'content',
            props: ['project', 'todos'],
            store: 'projects',
            children: []
          }
        ]
      };

      return mockTree;
    };

    const tree = analyzeReactTree();
    setComponentTree(tree);

    // Calculer les stats
    const countComponents = (node) => {
      let count = 1;
      if (node.children) {
        node.children.forEach(child => {
          count += countComponents(child);
        });
      }
      return count;
    };

    setStats({
      totalComponents: countComponents(tree),
      stores: storeCount,
      activeConnections: Math.floor(Math.random() * 10 + 5), // Simulation
      renderCycles: Math.floor(Math.random() * 100 + 50) // Simulation
    });

    // Mise à jour périodique pour simuler l'activité
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        renderCycles: prev.renderCycles + 1,
        activeConnections: Math.floor(Math.random() * 10 + 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return { componentTree, stats };
};

// Composant pour visualiser un nœud de l'arbre
const TreeNode = ({ node, x, y, onHover }) => {
  const getNodeColor = (type) => {
    switch (type) {
      case 'root': return '#ffd700';
      case 'container': return '#4a9eff';
      case 'visual': return '#ff6b6b';
      case 'navigation': return '#51cf66';
      case 'content': return '#ff9ff3';
      default: return '#868e96';
    }
  };

  return (
    <>
      <g
        onMouseEnter={() => onHover(node)}
        onMouseLeave={() => onHover(null)}
        style={{ cursor: 'pointer' }}
      >
        <circle
          cx={x}
          cy={y}
          r="25"
          fill={getNodeColor(node.type)}
          opacity="0.8"
        />
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="white"
          fontSize="10"
          fontWeight="bold"
        >
          {node.name.substring(0, 8)}
        </text>
      </g>

      {node.children && node.children.map((child, index) => {
        const childX = x + (index - node.children.length / 2) * 120;
        const childY = y + 100;

        return (
          <g key={`${node.name}-${child.name}`}>
            <line
              x1={x}
              y1={y + 25}
              x2={childX}
              y2={childY - 25}
              stroke={getNodeColor(node.type)}
              strokeWidth="2"
              opacity="0.3"
              style={{ pointerEvents: 'none' }}
            />
            <TreeNode
              node={child}
              x={childX}
              y={childY}
              onHover={onHover}
            />
          </g>
        );
      })}
    </>
  );
};

const SystemOverview = () => {
  const { componentTree, stats } = useComponentIntrospection();
  const [hoveredNode, setHoveredNode] = useState(null);

  return (
    <OverviewContainer>
      <h1>🔍 System Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
        <StatsCard>
          <h3>Composants</h3>
          <div className="value">{stats.totalComponents}</div>
        </StatsCard>
        <StatsCard>
          <h3>Stores Zustand</h3>
          <div className="value">{stats.stores}</div>
        </StatsCard>
        <StatsCard>
          <h3>Connexions</h3>
          <div className="value">{stats.activeConnections}</div>
        </StatsCard>
        <StatsCard>
          <h3>Render Cycles</h3>
          <div className="value">{stats.renderCycles}</div>
        </StatsCard>
      </div>

      <GraphArea>
        <svg width="100%" height="400" viewBox="0 0 800 400" style={{ display: 'block' }}>
          {componentTree && (
            <TreeNode
              node={componentTree}
              x={400}
              y={50}
              onHover={setHoveredNode}
            />
          )}
        </svg>

        {hoveredNode && (
          <InfoPanel>
            <h3>{hoveredNode.name}</h3>
            <p><strong>Type:</strong> {hoveredNode.type}</p>
            {hoveredNode.props && hoveredNode.props.length > 0 && (
              <p><strong>Props:</strong> {hoveredNode.props.join(', ')}</p>
            )}
            {hoveredNode.store && (
              <p><strong>Store:</strong> {hoveredNode.store}</p>
            )}
          </InfoPanel>
        )}
      </GraphArea>

      <Legend>
        <LegendItem color="#ffd700">Root</LegendItem>
        <LegendItem color="#4a9eff">Container</LegendItem>
        <LegendItem color="#ff6b6b">Visual</LegendItem>
        <LegendItem color="#51cf66">Navigation</LegendItem>
        <LegendItem color="#ff9ff3">Content</LegendItem>
      </Legend>
    </OverviewContainer>
  );
};

export default SystemOverview;