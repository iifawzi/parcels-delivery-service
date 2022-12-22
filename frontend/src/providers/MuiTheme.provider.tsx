/** 
 **********************
 This provider is only responsible for all the themeing stuff relating
 to the Material UI Package that we're using. 
 Ref: https://material-ui.com/customization/theming/
 **********************
 */

import { ThemeProvider, createTheme } from '@mui/material';
import React from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0a8fe7' // var(--primary-color)
    },
    secondary: {
      main: '#fd772a' // var(--secondary-color)
    }
  }
});

function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

export default MuiThemeProvider;