import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'Components/Background';
import About from 'Components/About';
import Menu, { PAGES } from 'Components/Menu';
import Structure from 'Components/Structure';

import './App.less';

const history = createBrowserHistory();
const queryClient = new QueryClient();

export default function App () {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <About />
        <div className="Wrap">
          <Menu />
          <Structure />
        </div>
      </Router>
    </QueryClientProvider>
  );
}
