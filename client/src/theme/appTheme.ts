/* 
THIS FILE IS THE APP THEME,
IT CONTAINS A CUSTOM PALETTE FOR COLORS,
TYPOGRAPHY, SHAPE AND COMPONENTS OF THE APP
[ THIS THEME SIMULATES THE YOUTUBE UI ]
 */

import { createTheme } from '@mui/material/styles';

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF0000',
    },
    background: {
      default: '#0f0f0f',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h4: {
      fontWeight: 500,
      fontSize: 24,
      lineHeight: 1.2,
    },
    h5: {
      fontWeight: 500,
      fontSize: 20,
      lineHeight: 1.2,
    },
    h6: {
      fontWeight: 500,
      fontSize: 16,
      lineHeight: 1.2,
    },
    body1: {
      fontWeight: 400,
      fontSize: 14,
      lineHeight: 1.2,
    },
    body2: {
      fontWeight: 400,
      fontSize: 12,
      lineHeight: 1.2,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0f0f0f',
          scrollbarColor: "#6b6b6b #0f0f0f",
          "&::-webkit-scrollbar": { width: 8 },
          "&::-webkit-scrollbar-thumb": { backgroundColor: "#3f3f3f", borderRadius: 8 },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(15, 15, 15, 0.9)',
          backdropFilter: 'blur(10px)',
          backgroundImage: 'none',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#212121',
          color: '#ffffff',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 40,
            backgroundColor: '#272727',
            '& input:-webkit-autofill': {
              WebkitBoxShadow: '0 0 0 100px #121212 inset',
              WebkitTextFillColor: '#ffffff',
              transition: 'background-color 5000s ease-in-out 0s',
              borderRadius: 'inherit',
            },
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': { backgroundColor: '#383838' },
          '&.Mui-selected': { backgroundColor: '#f1f1f13f' },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: '#272727',
            color: '#ffffff',
            '&:hover': { backgroundColor: '#3F3F3F' },
          },

        }
      ],
      styleOverrides: {
        contained: {
          backgroundColor: '#f1f1f13f',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#d9d9d97a' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&:hover': { backgroundColor: '#383838' },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          textDecoration: 'none',
          '&:hover': { textDecoration: 'underline', color: '#FF0000' },
          '&:visited': { color: '#ffffff' },
          '&.Mui-active': { color: '#f1f1f13f' },
          '&.Mui-selected': { color: '#f1f1f13f' },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          height: 36,
          width: 36,
          maskSize: 'cover',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          maskSize: 'cover',
          bgcolor: 'transparent',
          backgroundImage: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: 1,
          }
        },
      },
    },
  },
});