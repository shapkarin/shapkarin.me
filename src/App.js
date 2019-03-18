import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import Menu from 'Components/Menu';
import Github from 'Pages/Github';
import Projects from 'Pages/Projects'

export default hot(module)(function ({ some, prop }) {
    return (
        <>
            <Menu />

            <Switch>
                <Route
                path="/github"
                component={ Github }
                />
                <Route
                path="/projects"
                component={ Projects }
                />
            </Switch>
        </>
    );
})