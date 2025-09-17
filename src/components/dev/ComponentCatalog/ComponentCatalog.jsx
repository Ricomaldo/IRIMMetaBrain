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

const ComponentCatalog = () => {
  const [components, setComponents] = useState({});
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [activeTab, setActiveTab] = useState('preview');
  const [props, setProps] = useState({});
  const [loading, setLoading] = useState(true);

  // Auto-découverte des composants
  useEffect(() => {
    const loadComponents = async () => {
      const categorizedComponents = {
        rooms: [],
        common: [],
        layout: [],
        navigation: []
      };

      for (const [path, module] of Object.entries(componentModules)) {
        // Extraire le nom et la catégorie depuis le path
        const pathParts = path.split('/');
        const fileName = pathParts[pathParts.length - 1];
        const componentName = fileName.replace('.jsx', '');

        // Ignorer les fichiers styles et index
        if (componentName.includes('.styles') || componentName === 'index') {
          continue;
        }

        // Déterminer la catégorie
        let category = 'other';
        if (path.includes('/rooms/')) category = 'rooms';
        else if (path.includes('/common/')) category = 'common';
        else if (path.includes('/layout/')) category = 'layout';
        else if (path.includes('/navigation/')) category = 'navigation';

        // Charger le module
        try {
          const loadedModule = await module();
          const Component = loadedModule.default;

          if (Component && categorizedComponents[category]) {
            categorizedComponents[category].push({
              name: componentName,
              path: path,
              Component,
              props: Component.propTypes || {},
              defaultProps: Component.defaultProps || {}
            });
          }
        } catch (error) {
          console.warn(`Impossible de charger ${componentName}:`, error);
        }
      }

      setComponents(categorizedComponents);
      setLoading(false);
    };

    loadComponents();
  }, []);

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

  if (loading) {
    return (
      <CatalogContainer>
        <EmptyState>Chargement des composants...</EmptyState>
      </CatalogContainer>
    );
  }

  return (
    <CatalogContainer>
      <Sidebar>
        <h2>📚 Catalog</h2>

        {Object.entries(components).map(([category, items]) => (
          items.length > 0 && (
            <CategorySection key={category}>
              <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
              {items.map(component => (
                <ComponentItem
                  key={component.path}
                  $active={selectedComponent?.path === component.path}
                  onClick={() => handleSelectComponent(component)}
                >
                  {component.name}
                </ComponentItem>
              ))}
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
                  Object.entries(selectedComponent.props).map(([propName, propType]) => (
                    <div key={propName} style={{ marginBottom: '1rem' }}>
                      <label>
                        <strong>{propName}</strong>
                        <input
                          type="text"
                          value={props[propName] || ''}
                          onChange={(e) => updateProp(propName, e.target.value)}
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
                      </label>
                    </div>
                  ))
                ) : (
                  <p>Pas de props définis pour ce composant</p>
                )}
              </ControlPanel>
            )}

            {activeTab === 'code' && (
              <CodeView>
                <pre>
                  <code>{generateUsageCode()}</code>
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