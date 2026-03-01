import { api } from '../../api';
import type { UploadResumeRequest, UploadResumeResponse } from './types';

/**
 * Blob storage endpoints for file upload operations.
 *
 * This file demonstrates the injectEndpoints pattern for mutations with file uploads.
 * Each endpoint accepts a File and returns the upload result (ok, url, path).
 */
const baseUrl = '/api/blob';

export const blobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadJohnResume: builder.mutation<
      UploadResumeResponse,
      UploadResumeRequest
    >({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${baseUrl}/upload/john-resume`,
          method: 'POST',
          body: formData,
        };
      },
      // Private endpoint - requires authentication (default behavior)
    }),
    uploadJacquieResume: builder.mutation<
      UploadResumeResponse,
      UploadResumeRequest
    >({
      query: ({ file }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${baseUrl}/upload/jacquie-resume`,
          method: 'POST',
          body: formData,
        };
      },
      // Private endpoint - requires authentication (default behavior)
    }),
  }),
});

export const { useUploadJohnResumeMutation, useUploadJacquieResumeMutation } =
  blobApi;
