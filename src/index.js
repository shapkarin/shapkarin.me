import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { IS_PRODUCTION } from '@/constants';
// import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
const GH_PAGES_CANT_HYDRATE = true; // turn on `hydrateRoot` to test

IS_PRODUCTION && GH_PAGES_CANT_HYDRATE
  ? hydrateRoot(rootElement, <App />)
  : createRoot(rootElement).render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
