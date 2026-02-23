import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>App</div>
    </ThemeProvider>
  );
};

export default App;
