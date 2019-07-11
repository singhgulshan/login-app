import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../pages/login/login';
import Home from '../pages/home/home';

const Router = () => (
  <Switch>
    <Route exact path="/" render={() => (<Redirect to="/login" />)} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/home' component={Home} />
  </Switch>
)

export default Router;