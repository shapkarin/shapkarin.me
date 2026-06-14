import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { IS_PRODUCTION, IS_DEVELOPMENT } from '@/constants';

const rootElement = document.getElementById('root');
const GH_PAGES_CANT_HYDRATE = true; // turn on `hydrateRoot` to test

IS_PRODUCTION && GH_PAGES_CANT_HYDRATE
  ? hydrateRoot(rootElement, <App />)
  : createRoot(rootElement).render(<App />);

if (IS_DEVELOPMENT) {
  import('./reportWebVitals').then(({ reportWebVitals }) => {
    reportWebVitals(metric => console.info('[web-vitals]', metric));
  });
}
