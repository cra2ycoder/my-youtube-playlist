import { createTheme } from '@mui/material/styles'

export default createTheme({
  typography: {
    fontFamily: [
      '"Fira Sans"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(24, 118, 209)',
    },
    background: {
      default: '#f3f6f9',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // body: darkScrollbar(),
      },
    },
  },
})
