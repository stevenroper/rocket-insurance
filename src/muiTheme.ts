import { ThemeOptions } from '@mui/material/styles';

const DARK_GREEN = '#214e34';
const ORANGE = '#ffa000';

const theme: ThemeOptions = {
  palette: {
    primary: { main: DARK_GREEN },
    secondary: { main: ORANGE },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          color: DARK_GREEN,
          fontWeight: 700,
        },
      },
      defaultProps: {
        color: 'secondary',
      },
    },
  },
};

export default theme;
