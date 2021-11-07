import './App.css';

import Navigation from './components/Navigation'
import Router from './Router'
import { BrowserRouter } from 'react-router-dom'


import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#3A6351',
      },
      secondary: {
        main: '#393232',
      },
    },
    typography: {
      fontFamily: 'Dosis',
    },
  });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navigation />
        <Router />
      </BrowserRouter>
    </ThemeProvider>
    
  );
}

export default App;
