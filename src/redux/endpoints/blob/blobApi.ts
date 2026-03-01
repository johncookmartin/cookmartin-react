import { api } from '../../api';
import type { UploadPdfRequest, UploadPdfResponse } from './types';

/**
 * Blob storage endpoints for file upload operations.
 *
 * This file demonstrates the injectEndpoints pattern for mutations with file uploads.
 *
 */
const baseUrl = '/api/blob';

export const blobApi = api.injectEndpoints({
  endpoints: (builder) => ({
    uploadPdf: builder.mutation<UploadPdfResponse, UploadPdfRequest>({
      query: ({ file, path }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `${baseUrl}/upload/pdf`,
          method: 'POST',
          body: formData,
          params: { path }, // Query param: ?path=...
        };
      },
      // Private endpoint - requires authentication (default behavior)
    }),
  }),
});

export const { useUploadPdfMutation } = blobApi;
