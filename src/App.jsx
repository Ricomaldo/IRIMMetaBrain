// App.jsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import StudioHall from './components/layout/StudioHall/StudioHall';
import ModalManager from './components/modals/ModalManager';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StudioHall />
      <ModalManager />
    </ThemeProvider>
  );
}

export default App;