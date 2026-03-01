import React from 'react';
import { Box, Button, Card, Container, Typography } from '@mui/material';
import { useLazyWhoAmIPubQuery, useLazyWhoAmIPrivQuery } from '../redux/api';

const BlobUpload: React.FC = () => {
  const [triggerPub, pubResult] = useLazyWhoAmIPubQuery();
  const [triggerPriv, privResult] = useLazyWhoAmIPrivQuery();

  const renderResult = (result: {
    isUninitialized: boolean;
    isLoading: boolean;
    error?: unknown;
    data?: unknown;
  }) => {
    if (result.isUninitialized) {
      return 'Not called yet.';
    }

    if (result.isLoading) {
      return 'Loading...';
    }

    if (result.error) {
      return JSON.stringify(result.error, null, 2);
    }

    if (result.data) {
      return JSON.stringify(result.data, null, 2);
    }

    return 'No response body.';
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          py: 4,
        }}
      >
        <Typography variant="h4">Blob Upload</Typography>

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Test whoAmIPub
          </Typography>
          <Button
            variant="contained"
            onClick={() => triggerPub()}
            disabled={pubResult.isLoading}
          >
            Test whoAmIPub endpoint
          </Button>
          <Box component="pre" sx={{ mt: 2, whiteSpace: 'pre-wrap', m: 0 }}>
            {renderResult(pubResult)}
          </Box>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Test whoAmIPriv
          </Typography>
          <Button
            variant="contained"
            onClick={() => triggerPriv()}
            disabled={privResult.isLoading}
          >
            Test whoAmIPriv endpoint
          </Button>
          <Box component="pre" sx={{ mt: 2, whiteSpace: 'pre-wrap', m: 0 }}>
            {renderResult(privResult)}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default BlobUpload;
