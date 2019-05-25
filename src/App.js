import React from 'react';
import {
  Switch,
  Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';

import About from 'Components/About';
import Menu from 'Components/Menu';
import Github from 'Pages/Github';
import Projects from 'Pages/Projects';
import Liked from 'Pages/Liked';
import store from './Store';

import 'Components/Background';
import './App.less';

// TODO: use names
export default function () {
  return (
    <Provider store={store}>
      <About />
      <Router history={createBrowserHistory()}>
        <div className="Wrap">
          <Menu />
          <div className="Page">
            <Switch>
              <Route
                path="/repositories"
                component={Github}
              />
              <Redirect
                from="/github"
                to="/repositories"
              />
              <Route
                path="/projects"
                component={Projects}
              />
              <Route
                path="/liked"
                component={Liked}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}
