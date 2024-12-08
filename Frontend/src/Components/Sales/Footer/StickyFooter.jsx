import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {' © '}
      {new Date().getFullYear()}
      {' '}
      <Link color="inherit" href="#">
        Laksiri Hardware All rights reserved.
      </Link>{' '}
      
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
}