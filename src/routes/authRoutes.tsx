/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FC, useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { userContext } from '../global/UserContext';

interface AuthRoute extends RouteProps {
  component: ComponentType<any>;
}

export const GuestRoute: FC<AuthRoute> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return user.data ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export const UserRoute: FC<AuthRoute> = ({ component: Component, ...rest }) => {
  const { isTokenValid } = useContext(userContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        return isTokenValid() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/' }} />
        );
      }}
    />
  );
};
