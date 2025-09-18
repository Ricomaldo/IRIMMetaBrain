import React, { useState, useMemo, useCallback, memo } from "react";
import { useTheme } from "styled-components";
import {
  OverviewContainer,
  GraphArea,
  InfoPanel,
  StatsCard,
  Legend,
  LegendItem,
} from "./SystemOverview.styles";
import architectureMap from "../../../../architecture-map.json";

/**
 * Memorized tree node component for architecture visualization
 * @renders g
 * @renders circle
 * @renders text
 * @renders line
 * @renders TreeNode
 */
const TreeNode = memo(
  ({ node, x, y, onHover, onClick, isExpanded, expandedNodes }) => {
    const theme = useTheme();
    const getNodeColor = (depth) => {
      const colors = Object.values(theme.palettes.blues);
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
 * @renders OverviewContainer
 * @renders h1
 * @renders div
 * @renders p
 * @renders code
 * @renders GraphArea
 * @renders svg
 * @renders defs
 * @renders pattern
 * @renders path
 * @renders rect
 * @renders g
 * @renders TreeNode
 * @renders InfoPanel
 * @renders h3
 * @renders strong
 * @renders Legend
 * @renders LegendItem
 * @renders span
 */
const SystemOverview = memo(() => {
  const theme = useTheme();
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

      // Construire les enfants (sans limite de profondeur)
      if (component.children && component.children.length > 0) {
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

      <GraphArea
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab", height: "450px" }}
      >
        <svg
          width="100%"
          height="450"
          viewBox="0 0 1000 450"
          style={{ display: "block" }}
        >
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,215,0,0.05)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <g transform={`translate(${viewOffset.x}, ${viewOffset.y})`}>
            <TreeNode
              node={componentTree}
              x={500}
              y={80}
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

      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginTop: "1rem",
        gap: "2rem"
      }}>
        <div style={{ flex: 1 }}>
          <Legend>
            <LegendItem color={theme.palettes.blues[100]}>Racine</LegendItem>
            <LegendItem color={theme.palettes.blues[200]}>Niveau 1</LegendItem>
            <LegendItem color={theme.palettes.blues[300]}>Niveau 2</LegendItem>
            <LegendItem color={theme.palettes.blues[400]}>Niveau 3</LegendItem>
            <LegendItem color={theme.palettes.blues[500]}>Niveau 4</LegendItem>
          </Legend>
        </div>

        <div style={{
          textAlign: "right",
          fontSize: "0.85rem",
          color: "#888",
          minWidth: "200px"
        }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ color: theme.palettes.blues[100] }}>{stats.totalComponents}</strong>
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}> composants au total</span>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ color: theme.palettes.blues[100] }}>{stats.annotatedComponents}</strong>
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}> avec @renders</span>
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            <strong style={{ color: theme.palettes.blues[100] }}>{stats.visibleNodes}</strong>
            <span style={{ color: "rgba(255, 255, 255, 0.8)" }}> nœuds visibles</span>
          </div>
          <div style={{ fontSize: "0.75rem", color: "rgba(255, 255, 255, 0.5)" }}>
            {new Date(architectureMap.timestamp).toLocaleString('fr-FR')}
          </div>
        </div>
      </div>
    </OverviewContainer>
  );
});

SystemOverview.displayName = "SystemOverview";

export default SystemOverview;