/* 
THIS FILE IS THE ENTRY POINT OF THE APPLICATION
IT RENDERS THE APP WITH THE APP THEME AND CSS BASELINE
*/

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { appTheme } from './theme/appTheme';
import InnovaTubeApp from './InnovaTubeApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* ADD CUSTOM APPTHEME */}
    <ThemeProvider theme={appTheme}>
      {/* ADD CSS BASELINE */}
      <CssBaseline />
      {/* ADD THE APP */}
      <InnovaTubeApp />
    </ThemeProvider>
  </StrictMode>,
)
