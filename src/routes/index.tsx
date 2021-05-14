import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import { GuestRoute, UserRoute } from './authRoutes';
import { NotFoundRoute } from './notFoundRoute';

import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import HomePage from '../pages/home';

const Routes: FC = () => (
  <Switch>
    <GuestRoute path="/" exact component={LoginPage} />
    <GuestRoute path="/register" component={RegisterPage} />
    <UserRoute path="/home" component={HomePage} />
    <NotFoundRoute />
  </Switch>
);

export default Routes;
