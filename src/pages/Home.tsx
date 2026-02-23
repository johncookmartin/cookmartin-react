import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import CookMartinLogo from '../assets/CookMartinLogo.png';

const Home: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          gap: 2,
        }}
      >
        <Box
          component="img"
          src={CookMartinLogo}
          alt="CookMartin Logo"
          sx={{
            maxWidth: '1000px',
            width: '100%',
            height: 'auto',
          }}
        />
        <Typography variant="h4" align="center">
          Welcome
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
