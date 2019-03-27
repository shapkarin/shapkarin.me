import React from 'react';
import {
  Switch, Router, Route 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import store from './Store';
import Menu from 'Components/Menu';
import Github from 'Pages/Github';
import Projects from 'Pages/Projects'

// TODO: use names
export default function () {
  return (
    <Provider store={store}>
      <Router history={createBrowserHistory()}>
        <Menu />
        <Switch>
          <Route
            path="/github"
            component={Github}
          />
          <Route
            path="/projects"
            component={Projects}
          />
        </Switch>
      </Router>
    </Provider>
  );
}
