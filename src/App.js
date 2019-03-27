import React from 'react';
import {
  Switch, Router, Route 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
// import { hot } from 'react-hot-loader';

import store from './store';
import Menu from 'Components/Menu';
import Github from 'Pages/Github';
import Projects from 'Pages/Projects'

export default function () {
  return (
    <Provider store={store}>
      <Router history={createHistory()}>
        <Menu />
        {/* <Switch>
          <Route
            path="/github"
            component={Github}
          />
          <Route
            path="/projects"
            component={Projects}
          />
        </Switch> */}
      </Router>
    </Provider>
  );
}
