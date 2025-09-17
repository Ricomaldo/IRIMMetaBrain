// App.jsx
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import StudioHall from './components/layout/StudioHall/StudioHall';
import ModalManager from './components/modals/ModalManager';
import Sandbox from './components/Sandbox';
import exposeStoresToWindow from './utils/exposeStores';

function App() {
  // Exposer les stores en développement
  useEffect(() => {
    exposeStoresToWindow();
  }, []);

  // Mode sandbox si ?sandbox dans l'URL
  const isSandbox = window.location.search.includes('sandbox');

  return (
    <ThemeProvider theme={theme}>
      {isSandbox ? (
        <Sandbox />
      ) : (
        <>
          <StudioHall />
          <ModalManager />
        </>
      )}
    </ThemeProvider>
  );
}

export default App;