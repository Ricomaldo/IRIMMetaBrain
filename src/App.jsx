// App.jsx
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import StudioHall from './components/layout/StudioHall/StudioHall';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <StudioHall />
    </ThemeProvider>
  );
}

export default App;