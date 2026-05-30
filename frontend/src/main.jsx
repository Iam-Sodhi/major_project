import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const TON_MANIFEST_URL = `${window.location.origin}/tonconnect-manifest.json`;

createRoot(document.getElementById('root')).render(
  <TonConnectUIProvider manifestUrl={TON_MANIFEST_URL}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </TonConnectUIProvider>,
)