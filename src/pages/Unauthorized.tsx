import { useMsal } from '@azure/msal-react';
import React from 'react';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import CookMartinLogo from '../assets/CookMartinLogo.png';

const Unauthorized: React.FC = () => {
  const { instance } = useMsal();

  const handleSignOut = async () => {
    try {
      await instance.logoutPopup();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 64px)',
          gap: 3,
        }}
      >
        <Box
          component="img"
          src={CookMartinLogo}
          alt="CookMartin Logo"
          sx={{
            maxWidth: '300px',
            width: '100%',
            height: 'auto',
          }}
        />

        <Card
          sx={{
            padding: 4,
            width: '100%',
            boxShadow: 2,
            textAlign: 'center',
          }}
        >
          <BlockIcon
            sx={{
              fontSize: 60,
              color: 'error.main',
              mb: 2,
            }}
          />

          <Typography
            variant="h5"
            component="h1"
            sx={{ mb: 2, fontWeight: 600 }}
          >
            Access Denied
          </Typography>

          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Your account is not authorized to access this application. Please
            contact an administrator if you believe this is a mistake.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSignOut}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Sign Out
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Unauthorized;
