import React, { useState, useEffect, Suspense } from 'react';
import {
  CatalogContainer,
  Sidebar,
  CategorySection,
  ComponentItem,
  MainArea,
  PreviewArea,
  ControlPanel,
  CodeView,
  EmptyState,
  TabBar,
  Tab
} from './ComponentCatalog.styles';

// Import dynamique des composants
const componentModules = import.meta.glob('../../../components/**/*.jsx');

// Map statique des valeurs possibles pour les props connus
const PROP_OPTIONS_MAP = {
  size: ['small', 'medium', 'large'],
  variant: {
    button: ['default', 'primary', 'secondary', 'danger'],
    modal: ['overlay', 'roomCanvas', 'baseFloorTower'],
    markdown: ['embedded', 'standalone']
  },
  texture: ['wood', 'metal', 'stone', 'fabric'],
  contentType: ['markdown', 'actions', 'screentv', 'mindlog']
};

// Fonction pour extraire les props d'un composant et leurs métadonnées
const extractComponentProps = (Component, componentName) => {
  const propsInfo = {};

  // Essayer de récupérer les props depuis propTypes
  if (Component.propTypes) {
    // Parcourir chaque propType pour extraire les infos
    Object.keys(Component.propTypes).forEach(propName => {
      const propType = Component.propTypes[propName];
      propsInfo[propName] = {
        type: 'any',
        required: false,
        options: null
      };

      // Déterminer le type basé sur le nom de la prop
      if (propName === 'children' || propName === 'title' || propName === 'label' || propName === 'placeholder') {
        propsInfo[propName].type = 'string';
      } else if (propName.startsWith('on')) {
        propsInfo[propName].type = 'function';
      } else if (propName === 'active' || propName === 'collapsed' || propName === 'collapsible' ||
                 propName === 'isOpen' || propName === 'showPreview' || propName === 'readOnly' ||
                 propName === 'closeOnOverlay' || propName === 'closeOnEscape' ||
                 propName === 'showCloseButton' || propName === 'showFooterCloseButton') {
        propsInfo[propName].type = 'boolean';
      } else if (propName === 'badge' || propName === 'zoomLevel') {
        propsInfo[propName].type = 'number';
      }

      // Ajouter les options possibles depuis notre map
      if (PROP_OPTIONS_MAP[propName]) {
        if (typeof PROP_OPTIONS_MAP[propName] === 'object' && !Array.isArray(PROP_OPTIONS_MAP[propName])) {
          // Options spécifiques par composant
          const key = componentName.toLowerCase();
          if (PROP_OPTIONS_MAP[propName][key]) {
            propsInfo[propName].options = PROP_OPTIONS_MAP[propName][key];
            propsInfo[propName].type = 'enum';
          } else {
            // Fallback sur les options par défaut
            const defaultKey = Object.keys(PROP_OPTIONS_MAP[propName])[0];
            propsInfo[propName].options = PROP_OPTIONS_MAP[propName][defaultKey];
            propsInfo[propName].type = 'enum';
          }
        } else {
          propsInfo[propName].options = PROP_OPTIONS_MAP[propName];
          propsInfo[propName].type = 'enum';
        }
      }
    });
    return propsInfo;
  }

  // Fallback: analyser les paramètres du composant
  const componentString = Component.toString();
  const propsMatch = componentString.match(/\(\s*{([^}]+)}\s*\)/);

  if (propsMatch && propsMatch[1]) {
    const propNames = propsMatch[1].split(',').map(p => p.trim().split(/[=:]/)[0].trim());
    propNames.forEach(name => {
      if (name && !name.includes('...')) {
        propsInfo[name] = { type: 'any', required: false, options: null };

        // Ajouter les options si disponibles
        if (PROP_OPTIONS_MAP[name]) {
          propsInfo[name].options = Array.isArray(PROP_OPTIONS_MAP[name])
            ? PROP_OPTIONS_MAP[name]
            : PROP_OPTIONS_MAP[name][componentName.toLowerCase()] || [];
          if (propsInfo[name].options.length > 0) {
            propsInfo[name].type = 'enum';
          }
        }
      }
    });
  }

  return propsInfo;
};

const ComponentCatalog = () => {
  const [components, setComponents] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [props, setProps] = useState({});
  const [loading, setLoading] = useState(true);
  const [collapsedCategories, setCollapsedCategories] = useState({
    common: false,  // Common ouvert par défaut
    widgets: true,
    tower: true,
    navigation: true,
    dev: true
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Générer les props par défaut pour un composant
  const generateDefaultProps = (component) => {
    const defaultProps = { ...component.defaultProps };

    // Ajouter des valeurs par défaut pour les props communes
    if (component.props.children) {
      defaultProps.children = 'Contenu exemple';
    }
    if (component.props.onClick) {
      defaultProps.onClick = () => alert('Click!');
    }
    if (component.props.title) {
      defaultProps.title = 'Titre exemple';
    }
    if (component.props.content) {
      defaultProps.content = 'Lorem ipsum dolor sit amet...';
    }

    return defaultProps;
  };

  // Auto-découverte des composants
  useEffect(() => {
    const loadComponents = async () => {
      const categorizedComponents = {
        common: [],
        widgets: [],
        tower: [],
        navigation: [],
        dev: []
      };

      for (const [path, module] of Object.entries(componentModules)) {
        // Extraire le nom et la catégorie depuis le path
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const componentName = fileName.replace('.jsx', '');

        // Ignorer les fichiers styles, index et les Rooms principales
        if (componentName.includes('.styles') ||
            componentName === 'index' ||
            componentName.endsWith('Room')) {
          continue;
        }

        // Déterminer la catégorie
        let category = 'other';
        if (path.includes('/widgets/')) category = 'widgets';
        else if (path.includes('/common/')) category = 'common';
        else if (path.includes('/tower/')) category = 'tower';
        else if (path.includes('/navigation/')) category = 'navigation';
        else if (path.includes('/dev/')) category = 'dev';
        else if (path.includes('/layout/') || path.includes('/rooms/') || path.includes('/room-modules/')) {
          category = null; // Ignorer layout, rooms et room-modules
        }

        // Charger le module
        try {
          const loadedModule = await module();
          const Component = loadedModule.default;

          if (Component && category && categorizedComponents[category]) {
            categorizedComponents[category].push({
              name: componentName,
              path: path,
              Component,
              props: extractComponentProps(Component, componentName),
              defaultProps: Component.defaultProps || {}
            });
          }
        } catch (error) {
          console.warn(`Impossible de charger ${componentName}:`, error);
        }
      }

      setComponents(categorizedComponents);
      setLoading(false);

      // Sélectionner Button par défaut s'il existe
      const buttonComponent = categorizedComponents.common?.find(c => c.name === 'Button');
      if (buttonComponent) {
        setSelectedComponent(buttonComponent);
        setProps(generateDefaultProps(buttonComponent));
      }
    };

    loadComponents();
  }, []);

  // Sélectionner un composant
  const handleSelectComponent = (component) => {
    setSelectedComponent(component);
    setProps(generateDefaultProps(component));
    setActiveTab('preview');
  };

  // Générer le code d'utilisation
  const generateUsageCode = () => {
    if (!selectedComponent) return '';

    const propsString = Object.entries(props)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `  ${key}="${value}"`;
        } else if (typeof value === 'function') {
          return `  ${key}={() => console.log('${key}')}`;
        } else {
          return `  ${key}={${JSON.stringify(value)}}`;
        }
      })
      .join('\n');

    return `import ${selectedComponent.name} from '${selectedComponent.path}';

const MyComponent = () => {
  return (
    <${selectedComponent.name}${propsString ? '\n' + propsString + '\n' : ''}/>
  );
};`;
  };

  // Mettre à jour une prop
  const updateProp = (propName, value) => {
    setProps(prev => ({
      ...prev,
      [propName]: value
    }));
  };

  // Toggle collapse state for a category
  const toggleCategory = (category) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  if (loading) {
    return (
      <CatalogContainer>
        <EmptyState>Chargement des composants...</EmptyState>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <Sidebar style={{
        width: sidebarCollapsed ? '50px' : '250px',
        transition: 'width 0.3s ease',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarCollapsed ? 'center' : 'space-between',
          marginBottom: '1rem'
        }}>
          {!sidebarCollapsed && <h2 style={{ margin: 0 }}>📚 Catalog</h2>}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,215,0,0.3)',
              borderRadius: '4px',
              color: '#ffd700',
              cursor: 'pointer',
              padding: '4px 8px',
              fontSize: '16px',
              transition: 'all 0.2s',
              transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,215,0,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            ◀
          </button>
        </div>

        {!sidebarCollapsed && Object.entries(components).map(([category, items]) => (
          items.length > 0 && (
            <CategorySection key={category}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  userSelect: 'none',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  transition: 'background 0.2s',
                  marginBottom: '0.5rem'
                }}
                onClick={() => toggleCategory(category)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,215,0,0.05)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span style={{
                  marginRight: '0.5rem',
                  transition: 'transform 0.2s',
                  display: 'inline-block',
                  transform: collapsedCategories[category] ? 'rotate(0deg)' : 'rotate(90deg)'
                }}>
                  ▶
                </span>
                <h3 style={{ margin: 0, fontSize: '1rem' }}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </h3>
              </div>
              {!collapsedCategories[category] && (
                <div style={{ paddingLeft: '1.5rem' }}>
                  {items.map(component => (
                    <ComponentItem
                      key={component.path}
                      $active={selectedComponent?.path === component.path}
                      onClick={() => handleSelectComponent(component)}
                    >
                      {component.name}
                    </ComponentItem>
                  ))}
                </div>
              )}
            </CategorySection>
          )
        ))}
      </Sidebar>

      <MainArea>
        {selectedComponent ? (
          <>
            <TabBar>
              <Tab
                $active={activeTab === 'preview'}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </Tab>
              <Tab
                $active={activeTab === 'props'}
                onClick={() => setActiveTab('props')}
              >
                Props
              </Tab>
              <Tab
                $active={activeTab === 'code'}
                onClick={() => setActiveTab('code')}
              >
                Code
              </Tab>
            </TabBar>

            {activeTab === 'preview' && (
              <PreviewArea>
                <Suspense fallback={<div>Chargement...</div>}>
                  <selectedComponent.Component {...props} />
                </Suspense>
              </PreviewArea>
            )}

            {activeTab === 'props' && (
              <ControlPanel>
                <h3>Props</h3>
                {Object.keys(selectedComponent.props).length > 0 ? (
                  Object.entries(selectedComponent.props).map(([propName, propInfo]) => {
                    const type = propInfo.type;
                    const options = propInfo.options;

                    return (
                      <div key={propName} style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block' }}>
                          <strong style={{ color: '#ffd700', fontSize: '0.9rem' }}>
                            {propName}
                          </strong>
                          {type === 'boolean' ? (
                            <div style={{ marginTop: '0.25rem' }}>
                              <input
                                type="checkbox"
                                checked={props[propName] || false}
                                onChange={(e) => updateProp(propName, e.target.checked)}
                                style={{
                                  marginRight: '0.5rem',
                                  cursor: 'pointer'
                                }}
                              />
                              <span style={{ color: 'white' }}>{props[propName] ? 'true' : 'false'}</span>
                            </div>
                          ) : type === 'function' ? (
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                              <button
                                onClick={() => {
                                  const handler = () => {
                                    console.log(`${propName} triggered!`);
                                    alert(`${propName} triggered!`);
                                  };
                                  updateProp(propName, handler);
                                }}
                                style={{
                                  flex: 1,
                                  padding: '0.5rem',
                                  background: props[propName] ? 'rgba(0,255,0,0.1)' : 'rgba(255,215,0,0.1)',
                                  border: props[propName] ? '1px solid rgba(0,255,0,0.3)' : '1px solid rgba(255,215,0,0.3)',
                                  color: props[propName] ? '#00ff00' : '#ffd700',
                                  borderRadius: '4px',
                                  cursor: 'pointer'
                                }}
                              >
                                {props[propName] ? '✓ Handler Set' : 'Set Handler'}
                              </button>
                              {props[propName] && (
                                <button
                                  onClick={() => updateProp(propName, null)}
                                  style={{
                                    padding: '0.5rem',
                                    background: 'rgba(255,0,0,0.1)',
                                    border: '1px solid rgba(255,0,0,0.3)',
                                    color: '#ff6666',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                  }}
                                >
                                  Clear
                                </button>
                              )}
                            </div>
                          ) : type === 'enum' && options && options.length > 0 ? (
                            <select
                              value={props[propName] || ''}
                              onChange={(e) => updateProp(propName, e.target.value)}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.25rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '4px',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="">-- Select {propName} --</option>
                              {options.map(option => (
                                <option key={option} value={option} style={{ background: '#1a1a1a' }}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : type === 'number' ? (
                            <input
                              type="number"
                              value={props[propName] || ''}
                              onChange={(e) => updateProp(propName, e.target.value ? Number(e.target.value) : undefined)}
                              placeholder={`Enter ${propName}...`}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.25rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '4px'
                              }}
                            />
                          ) : (
                            <input
                              type="text"
                              value={props[propName] || ''}
                              onChange={(e) => updateProp(propName, e.target.value)}
                              placeholder={`Enter ${propName}...`}
                              style={{
                                width: '100%',
                                padding: '0.5rem',
                                marginTop: '0.25rem',
                                background: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                color: 'white',
                                borderRadius: '4px'
                              }}
                            />
                          )}
                        </label>
                      </div>
                    );
                  })
                ) : (
                  <p>Pas de props définis pour ce composant</p>
                )}
              </ControlPanel>
            )}

            {activeTab === 'code' && (
              <CodeView>
                <pre style={{
                  margin: '0',
                  padding: '1.5rem',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 215, 0, 0.1)',
                  overflowX: 'auto',
                  maxWidth: '100%'
                }}>
                  <code style={{
                    display: 'block',
                    whiteSpace: 'pre',
                    fontFamily: "'Monaco', 'Courier New', monospace"
                  }}>{generateUsageCode()}</code>
                </pre>
              </CodeView>
            )}
          </>
        ) : (
          <EmptyState>
            Sélectionne un composant dans la liste pour commencer
          </EmptyState>
        )}
      </MainArea>
    </CatalogContainer>
  );
};

export default ComponentCatalog;