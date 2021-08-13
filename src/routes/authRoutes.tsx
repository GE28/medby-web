/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ComponentType, FC, useContext, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { userContext } from '../global/UserContext';

interface AuthRoute extends RouteProps {
  component: ComponentType<any>;
  guest?: boolean;
}

export const GuestRoute: FC<AuthRoute> = ({
  guest = true,
  component: Component,
  ...rest
}) => {
  const { user } = useContext(userContext);

  const pathname = guest ? '/home' : '/';

  return (
    <Route
      {...rest}
      render={(props) => {
        const [redirect, component] = [
          <Redirect to={{ pathname }} />,
          <Component {...rest} />,
        ];

        if (!guest) {
          return user.data ? component : redirect;
        }

        return user.data ? redirect : component;
      }}
    />
  );
};

export const UserRoute: FC<AuthRoute> = ({ component: Component, ...rest }) => {
  const { tokenValidator } = useContext(userContext);
  useEffect(tokenValidator, [tokenValidator]);

  return <GuestRoute {...rest} component={Component} guest={false} />;
};
