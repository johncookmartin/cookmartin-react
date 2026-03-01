import type {
  AccountInfo,
  IPublicClientApplication,
} from '@azure/msal-browser';
import {
  fetchBaseQuery,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query';
import { acquiredApiAccessToken } from '../auth/msalToken';

type CreateBaseQueryParams = {
  baseUrl: string;
  scope: string;
  msal: IPublicClientApplication;
  getAccount: () => AccountInfo | null;
};

export function createBaseQueryWithMsal({
  baseUrl,
  scope,
  msal,
  getAccount,
}: CreateBaseQueryParams): BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> {
  const rawBaseQuery = fetchBaseQuery({ baseUrl });

  return async (args, api, extraOptions) => {
    try {
      const account = getAccount();

      const token = await acquiredApiAccessToken({
        msal,
        account,
        scope,
      });

      const enrichedArgs: FetchArgs =
        typeof args === 'string' ? { url: args } : { ...args };

      enrichedArgs.headers = {
        ...(enrichedArgs.headers ?? {}),
        Authorization: `Bearer ${token}`,
      };

      return await rawBaseQuery(enrichedArgs, api, extraOptions);
    } catch (e: unknown) {
      const message =
        e instanceof Error
          ? e.message
          : typeof e === 'string'
            ? e
            : 'Unauthorized';
      return {
        error: {
          status: 401,
          data: { message },
        } as FetchBaseQueryError,
      };
    }
  };
}
