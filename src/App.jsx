// App.jsx
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import StudioHall from './components/layout/StudioHall/StudioHall';
import ModalManager from './components/modals/ModalManager';
import exposeStoresToWindow from './utils/exposeStores';

function App() {
  // Exposer les stores en développement
  useEffect(() => {
    exposeStoresToWindow();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <StudioHall />
      <ModalManager />
    </ThemeProvider>
  );
}

export default App;