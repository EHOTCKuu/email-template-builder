import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import { StoreProvider } from '@/app/providers/StoreProvider';
import '@/shared/styles/global.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root container #root is not found');
}

createRoot(container).render(
  <StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </StrictMode>,
);