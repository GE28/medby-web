import React, { FC } from 'react';
import { Switch } from 'react-router-dom';

import { GuestRoute, UserRoute } from './authRoutes';
import { NotFoundRoute } from './notFoundRoute';

import LoginPage from '../pages/login';
import RegisterPage from '../pages/register';
import HomePage from '../pages/home';
import AccountPage from '../pages/account';
import AppointPage from '../pages/appoint';

const Routes: FC = () => (
  <Switch>
    <GuestRoute path="/" exact component={LoginPage} />
    <GuestRoute path="/register" component={RegisterPage} />
    <UserRoute path="/home" component={HomePage} />
    <UserRoute path="/account" component={AccountPage} />
    <UserRoute path="/appoint" component={AppointPage} />
    <NotFoundRoute />
  </Switch>
);

export default Routes;
