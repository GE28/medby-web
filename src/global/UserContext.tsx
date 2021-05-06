import React, { FC, createContext, useState, useCallback } from 'react';

import axios from '../services/axios';

type UserData = Record<string, unknown> & {
  name: string;
};

interface LoginParams {
  email: string;
  password: string;
}

interface UserState {
  data: UserData;
  token: string;
}

interface UserContextBody {
  user: UserState;
  login(data: LoginParams): void;
}

export const userContext = createContext({} as UserContextBody);

const { Provider } = userContext;

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('@medby/user_token');
    const data = localStorage.getItem('@medby/user_data');

    return (token && data
      ? { token, data: JSON.parse(data) }
      : {}) as UserState;
  });

  const login = useCallback(async ({ email, password }) => {
    try {
      const response = await axios.post('login', { email, password });

      const { user: data, token } = response.data;

      localStorage.setItem('@medby/user_token', token);
      localStorage.setItem('@medby/user_data', JSON.stringify(data));

      setUser({ token, data });
    } catch (err) {
      console.log(err.response.data);
    }
  }, []);

  return <Provider value={{ user, login }}>{children}</Provider>;
};
