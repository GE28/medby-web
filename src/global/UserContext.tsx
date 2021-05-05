import React, { FC, createContext, useState, useCallback } from 'react';

import api from '../services/axios';

interface LoginParams {
  email: string;
  password: string;
}

interface UserContextBody {
  login(data: LoginParams): void;
}

export const userContext = createContext({} as UserContextBody);

const { Provider } = userContext;

export const UserProvider: FC = ({ children }) => {
  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('login', { email, password });

      console.log(response.data);
    } catch (err) {
      console.log({ err });
    }
  }, []);

  return <Provider value={{ login }}>{children}</Provider>;
};
