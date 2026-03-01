import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import { loginRequest } from '../authConfig';
import { useMsal } from '@azure/msal-react';
import CookMartinLogo from '../assets/CookMartinLogo.png';

const Login: React.FC = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await instance.loginPopup(loginRequest);
      navigate('/');
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
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Sign in to your account to get started
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleLogin}
            sx={{
              py: 1.5,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Sign in with Microsoft
          </Button>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
