import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

const rootElement = document.getElementById('root');
hydrate(<App />, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(process.env.NODE_ENV === 'development' ? console.log : null);
