import React, { useState } from 'react';
import { Alert, Box, Button, Card, Container, Typography } from '@mui/material';
import {
  useUploadJohnResumeMutation,
  useUploadJacquieResumeMutation,
} from '../redux/endpoints/blob/blobApi';
import type { UploadResumeRequest } from '../redux/endpoints/blob/types';

const BlobUpload: React.FC = () => {
  const [uploadJohnResume, johnResumeResult] = useUploadJohnResumeMutation();
  const [uploadJacquieResume, jacquieResumeResult] =
    useUploadJacquieResumeMutation();

  const [johnResumeFile, setJohnResumeFile] = useState<File | null>(null);
  const [jacquieResumeFile, setJacquieResumeFile] = useState<File | null>(null);

  const handleJohnFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setJohnResumeFile(file);
    }
  };

  const handleJacquieFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setJacquieResumeFile(file);
    }
  };

  const handleJohnUpload = async () => {
    if (!johnResumeFile) return;

    try {
      const result = await uploadJohnResume({
        file: johnResumeFile,
      } as UploadResumeRequest).unwrap();
      console.log('John resume upload successful:', result);
    } catch (error) {
      console.error('John resume upload failed:', error);
    }
  };

  const handleJacquieUpload = async () => {
    if (!jacquieResumeFile) return;

    try {
      const result = await uploadJacquieResume({
        file: jacquieResumeFile,
      } as UploadResumeRequest).unwrap();
      console.log('Jacquie resume upload successful:', result);
    } catch (error) {
      console.error('Jacquie resume upload failed:', error);
    }
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
        <Typography variant="h4">Resume Upload</Typography>

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload John's Resume
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" component="label" fullWidth>
              {johnResumeFile ? johnResumeFile.name : 'Select Resume File'}
              <input
                type="file"
                hidden
                accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleJohnFileChange}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleJohnUpload}
              disabled={!johnResumeFile || johnResumeResult.isLoading}
              fullWidth
            >
              {johnResumeResult.isLoading ? 'Uploading...' : 'Upload Resume'}
            </Button>

            {johnResumeResult.isSuccess && johnResumeResult.data && (
              <Alert severity="success">
                <Typography variant="body2">Upload successful!</Typography>
                <Typography variant="caption" component="div">
                  URL: {johnResumeResult.data.url}
                </Typography>
                <Typography variant="caption" component="div">
                  Path: {johnResumeResult.data.path}
                </Typography>
              </Alert>
            )}

            {johnResumeResult.isError && (
              <Alert severity="error">
                Upload failed: {JSON.stringify(johnResumeResult.error)}
              </Alert>
            )}
          </Box>
        </Card>

        <Card sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload Jacquie's Resume
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button variant="outlined" component="label" fullWidth>
              {jacquieResumeFile
                ? jacquieResumeFile.name
                : 'Select Resume File'}
              <input
                type="file"
                hidden
                accept=".pdf,application/pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleJacquieFileChange}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleJacquieUpload}
              disabled={!jacquieResumeFile || jacquieResumeResult.isLoading}
              fullWidth
            >
              {jacquieResumeResult.isLoading ? 'Uploading...' : 'Upload Resume'}
            </Button>

            {jacquieResumeResult.isSuccess && jacquieResumeResult.data && (
              <Alert severity="success">
                <Typography variant="body2">Upload successful!</Typography>
                <Typography variant="caption" component="div">
                  URL: {jacquieResumeResult.data.url}
                </Typography>
                <Typography variant="caption" component="div">
                  Path: {jacquieResumeResult.data.path}
                </Typography>
              </Alert>
            )}

            {jacquieResumeResult.isError && (
              <Alert severity="error">
                Upload failed: {JSON.stringify(jacquieResumeResult.error)}
              </Alert>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default BlobUpload;
