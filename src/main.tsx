import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ConfigProvider, theme as antTheme } from 'antd'
import './index.css'
import App from './App.tsx'

const muiDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#030712',
      paper: '#0B1221',
    },
    primary: {
      main: '#2563EB',
    },
    secondary: {
      main: '#06B6D4',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E1',
    },
    divider: 'rgba(30, 58, 138, 0.3)',
  },
  typography: {
    fontFamily: '"Inter", "Space Grotesk", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B1221',
          border: '1px solid rgba(30, 58, 138, 0.3)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#0B1221',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '9999px',
        },
      },
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ThemeProvider theme={muiDarkTheme}>
      <ConfigProvider
        theme={{
          algorithm: [antTheme.darkAlgorithm],
          token: {
            colorBgBase: '#030712',
            colorBgContainer: '#0B1221',
            colorBgElevated: '#111D35',
            colorPrimary: '#2563EB',
            colorInfo: '#06B6D4',
            colorTextBase: '#FFFFFF',
            colorTextSecondary: '#CBD5E1',
            colorBorder: 'rgba(30, 58, 138, 0.3)',
            borderRadius: 8,
            fontFamily: '"Inter", "Space Grotesk", sans-serif',
          },
        }}
      >
        <App />
      </ConfigProvider>
    </ThemeProvider>
  </HashRouter>,
)
