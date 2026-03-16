import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.tsx';
import { msalConfig } from './auth/authConfig.ts';
import { store } from './redux/store.ts';
import { initApiAuth } from './redux/api.ts';

const msalInstance = new PublicClientApplication(msalConfig);

await msalInstance.initialize();
const redirectResponse = await msalInstance.handleRedirectPromise();

if (redirectResponse?.account) {
  msalInstance.setActiveAccount(redirectResponse.account);
} else {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
}

initApiAuth({
  msal: msalInstance,
  getAccount: () =>
    msalInstance.getActiveAccount() ?? msalInstance.getAllAccounts()[0] ?? null,
});

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </StrictMode>,
);
