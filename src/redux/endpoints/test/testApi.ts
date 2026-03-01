import { api } from '../../api';
import type { WhoAmIPubResponse, WhoAmIPrivResponse } from './types';

/**
 * Test endpoints for verifying public and private API access.
 *
 * This file demonstrates the injectEndpoints pattern for modular API organization.
 * To add more endpoints:
 * 1. Define types in types.ts
 * 2. Call api.injectEndpoints() with your endpoint definitions
 * 3. Export the generated hooks
 */
const baseUrl = '/api/test';

export const testApi = api.injectEndpoints({
  endpoints: (builder) => ({
    whoAmIPub: builder.query<WhoAmIPubResponse, void>({
      query: () => ({ url: `${baseUrl}/public`, method: 'GET' }),
      extraOptions: { public: true },
    }),
    whoAmIPriv: builder.query<WhoAmIPrivResponse, void>({
      query: () => ({ url: `${baseUrl}/private`, method: 'GET' }),
    }),
  }),
});

export const {
  useWhoAmIPubQuery,
  useWhoAmIPrivQuery,
  useLazyWhoAmIPubQuery,
  useLazyWhoAmIPrivQuery,
} = testApi;
