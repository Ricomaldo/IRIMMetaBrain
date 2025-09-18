import React, { useState, useMemo, useCallback, memo } from "react";
import {
  OverviewContainer,
  GraphArea,
  InfoPanel,
  StatsCard,
  Legend,
  LegendItem,
} from "./SystemOverview.styles";
import architectureMap from "../../../../architecture-map.json";

// Composant mémorisé pour visualiser un nœud de l'arbre
const TreeNode = memo(
  ({ node, x, y, onHover, onClick, isExpanded, expandedNodes }) => {
    const getNodeColor = (depth) => {
      const colors = ["#ffd700", "#4a9eff", "#ff6b6b", "#51cf66", "#ff9ff3"];
      return colors[depth % colors.length];
    };

    return (
      <>
        <g
          onMouseEnter={() => onHover(node)}
          onMouseLeave={() => onHover(null)}
          onClick={() => onClick && onClick(node.name)}
          style={{ cursor: "pointer" }}
        >
          <circle
            cx={x}
            cy={y}
            r="25"
            fill={getNodeColor(node.depth || 0)}
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
          {node.children && node.children.length > 0 && (
            <text
              x={x}
              y={y + 15}
              textAnchor="middle"
              fill="white"
              fontSize="8"
              opacity="0.7"
            >
              {expandedNodes?.has(node.name) ? "−" : "+"}
            </text>
          )}
        </g>

        {node.children &&
          expandedNodes?.has(node.name) &&
          node.children.map((child, index) => {
            const spacing = 100;
            const childX = x + (index - node.children.length / 2) * spacing;
            const childY = y + 80;

            return (
              <g key={`${node.name}-${child.name}`}>
                <line
                  x1={x}
                  y1={y + 25}
                  x2={childX}
                  y2={childY - 25}
                  stroke={getNodeColor(node.depth || 0)}
                  strokeWidth="2"
                  opacity="0.3"
                  style={{ pointerEvents: "none" }}
                />
                <TreeNode
                  node={child}
                  x={childX}
                  y={childY}
                  onHover={onHover}
                  onClick={onClick}
                  expandedNodes={expandedNodes}
                />
              </g>
            );
          })}
      </>
    );
  }
);

TreeNode.displayName = "TreeNode";

/**
 * Vue d'ensemble de l'architecture du système basée sur annotations JSDoc
 */
const SystemOverview = memo(() => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState(
    new Set(["StudioHall", "RoomCanvas", "SideTower"])
  );
  const [viewOffset, setViewOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Construire l'arbre à partir du JSON
  const componentTree = useMemo(() => {
    if (!architectureMap || !architectureMap.components) {
      return null;
    }

    // Créer un index pour recherche rapide
    const componentIndex = {};
    architectureMap.components.forEach((comp) => {
      componentIndex[comp.name] = comp;
    });

    // Fonction récursive pour construire l'arbre avec profondeur
    const buildTree = (componentName, depth = 0, visited = new Set()) => {
      // Éviter les cycles
      if (visited.has(componentName)) {
        return null;
      }

      const component = componentIndex[componentName];
      if (!component) {
        return null;
      }

      visited.add(componentName);

      const node = {
        name: componentName,
        path: component.path,
        depth: depth,
        children: [],
      };

      // Construire les enfants
      if (component.children && component.children.length > 0 && depth < 4) {
        component.children.forEach((childName) => {
          const childNode = buildTree(childName, depth + 1, new Set(visited));
          if (childNode) {
            node.children.push(childNode);
          }
        });
      }

      return node;
    };

    // Commencer avec StudioHall comme racine (ou le premier root component)
    const rootName = architectureMap.rootComponents.includes("StudioHall")
      ? "StudioHall"
      : architectureMap.rootComponents[0];

    return buildTree(rootName);
  }, []);

  // Calculer les statistiques
  const stats = useMemo(() => {
    const countNodes = (node) => {
      if (!node) return 0;
      let count = 1;
      if (node.children) {
        node.children.forEach((child) => {
          count += countNodes(child);
        });
      }
      return count;
    };

    const componentsWithRenders = architectureMap.components.filter(
      (c) => c.renders && c.renders.length > 0
    );

    return {
      totalComponents: architectureMap.totalComponents || 0,
      annotatedComponents: componentsWithRenders.length,
      rootComponents: architectureMap.rootComponents?.length || 0,
      visibleNodes: componentTree ? countNodes(componentTree) : 0,
    };
  }, [componentTree]);

  // Callback mémorisé pour éviter les re-renders
  const handleHover = useCallback((node) => {
    setHoveredNode(node);
  }, []);

  // Toggle expansion d'un nœud
  const toggleNode = useCallback((nodeName) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeName)) {
        newSet.delete(nodeName);
      } else {
        newSet.add(nodeName);
      }
      return newSet;
    });
  }, []);

  // Gestion du drag
  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - viewOffset.x,
        y: e.clientY - viewOffset.y,
      });
    },
    [viewOffset]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        setViewOffset({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      }
    },
    [isDragging, dragStart]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  if (!componentTree) {
    return (
      <OverviewContainer>
        <h1>🔍 System Overview</h1>
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <p>Aucune donnée d'architecture disponible.</p>
          <p style={{ fontSize: "0.9rem", opacity: 0.7, marginTop: "1rem" }}>
            Lancez <code>node scripts/parse-component-tree.js</code> pour générer
            architecture-map.json
          </p>
        </div>
      </OverviewContainer>
    );
  }

  return (
    <OverviewContainer>
      <h1>🔍 System Overview</h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <StatsCard style={{ flex: "1", minWidth: "120px", padding: "0.5rem" }}>
          <strong style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>
            {stats.totalComponents}
          </strong>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>Total</span>
        </StatsCard>
        <StatsCard style={{ flex: "1", minWidth: "120px", padding: "0.5rem" }}>
          <strong style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>
            {stats.annotatedComponents}
          </strong>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>@renders</span>
        </StatsCard>
        <StatsCard style={{ flex: "1", minWidth: "120px", padding: "0.5rem" }}>
          <strong style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>
            {stats.rootComponents}
          </strong>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>Racines</span>
        </StatsCard>
        <StatsCard style={{ flex: "1", minWidth: "120px", padding: "0.5rem" }}>
          <strong style={{ fontSize: "1.2rem", marginLeft: "0.5rem" }}>
            {stats.visibleNodes}
          </strong>
          <span style={{ fontSize: "0.7rem", color: "#888" }}>Visible</span>
        </StatsCard>
      </div>

      <GraphArea
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <svg
          width="100%"
          height="500"
          viewBox="0 0 1000 500"
          style={{ display: "block" }}
        >
          <g transform={`translate(${viewOffset.x}, ${viewOffset.y})`}>
            <TreeNode
              node={componentTree}
              x={500}
              y={50}
              onHover={handleHover}
              onClick={toggleNode}
              expandedNodes={expandedNodes}
            />
          </g>
        </svg>

        {hoveredNode && (
          <InfoPanel>
            <h3>{hoveredNode.name}</h3>
            {hoveredNode.path && (
              <p>
                <strong>Chemin:</strong> {hoveredNode.path}
              </p>
            )}
            {hoveredNode.depth !== undefined && (
              <p>
                <strong>Profondeur:</strong> {hoveredNode.depth}
              </p>
            )}
            {hoveredNode.children && hoveredNode.children.length > 0 && (
              <p>
                <strong>Enfants:</strong> {hoveredNode.children.length}
              </p>
            )}
          </InfoPanel>
        )}
      </GraphArea>

      <Legend>
        <LegendItem color="#ffd700">Niveau 0</LegendItem>
        <LegendItem color="#4a9eff">Niveau 1</LegendItem>
        <LegendItem color="#ff6b6b">Niveau 2</LegendItem>
        <LegendItem color="#51cf66">Niveau 3</LegendItem>
        <LegendItem color="#ff9ff3">Niveau 4</LegendItem>
      </Legend>

      <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#888" }}>
        <strong>Dernière mise à jour:</strong>{" "}
        {new Date(architectureMap.timestamp).toLocaleString()}
      </div>
    </OverviewContainer>
  );
});

SystemOverview.displayName = "SystemOverview";

export default SystemOverview;