import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  TextField,
  Typography,
} from '@mui/material';
import { useUploadPdfMutation } from '../redux/endpoints/blob/blobApi';

const BlobUpload: React.FC = () => {
  const [uploadPdf, uploadResult] = useUploadPdfMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadPath, setUploadPath] = useState<string>('test/uploads');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadPdf({
        file: selectedFile,
        path: uploadPath,
      }).unwrap();
      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
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
        <Typography variant="h4">Blob Upload</Typography>

        <Card sx={{ p: 3 }}>
          {' '}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Upload PDF File
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Upload Path"
              value={uploadPath}
              onChange={(e) => setUploadPath(e.target.value)}
              fullWidth
              helperText="Destination path for the uploaded file"
            />

            <Button variant="outlined" component="label" fullWidth>
              {selectedFile ? selectedFile.name : 'Select PDF File'}
              <input
                type="file"
                hidden
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
              />
            </Button>

            <Button
              variant="contained"
              onClick={handleUpload}
              disabled={!selectedFile || uploadResult.isLoading}
              fullWidth
            >
              {uploadResult.isLoading ? 'Uploading...' : 'Upload PDF'}
            </Button>

            {uploadResult.isSuccess && uploadResult.data && (
              <Alert severity="success">
                <Typography variant="body2">Upload successful!</Typography>
                <Typography variant="caption" component="div">
                  URL: {uploadResult.data.url}
                </Typography>
                <Typography variant="caption" component="div">
                  Path: {uploadResult.data.path}
                </Typography>
              </Alert>
            )}

            {uploadResult.isError && (
              <Alert severity="error">
                Upload failed: {JSON.stringify(uploadResult.error)}
              </Alert>
            )}
          </Box>
        </Card>
      </Box>
    </Container>
  );
};

export default BlobUpload;
