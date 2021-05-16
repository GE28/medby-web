/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, createContext, useState, useCallback } from 'react';

import decodeJWT, { JwtPayload } from 'jwt-decode';

import { AxiosResponse } from 'axios';

import axios from '../services/axios';

type UserData = Record<string, any> & {
  name: string;
  email: string;
  cpf: string;
  avatar: string;
};

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  name: string;
  email: string;
  cpf: string;
  password: string;
}

interface UserState {
  data: UserData;
  token: string;
}

interface UserContext {
  user: UserState;
  login(data: LoginParams): Promise<AxiosResponse<UserData>>;
  logout(): void;
  register(data: RegisterParams): Promise<void>;
  isTokenValid(): boolean;
}

export const userContext = createContext({} as UserContext);

const { Provider } = userContext;

export const UserProvider: FC = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('@medby/user_token');
    const data = localStorage.getItem('@medby/user_data');

    return (token && data
      ? { token, data: JSON.parse(data) }
      : {}) as UserState;
  });

  const login = useCallback(async (loginParams: LoginParams) => {
    const { email, password } = loginParams;

    const response = await axios.post<UserData>('login', { email, password });

    const { user: data, token } = response.data;

    localStorage.setItem('@medby/user_token', token);
    localStorage.setItem('@medby/user_data', JSON.stringify(data));

    setUser({ token, data });

    return response;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@medby/user_token');
    localStorage.removeItem('@medby/user_data');

    setUser({} as UserState);
  }, []);

  const register = useCallback(async (registerParams: RegisterParams) => {
    const { name, email, cpf, password } = registerParams;

    await axios.post('register', {
      name,
      email,
      cpf,
      password,
    });

    await login({ email, password });
  }, []);

  const isTokenValid = useCallback(() => {
    if (!user.token) {
      return false;
    }

    try {
      const { exp }: JwtPayload = decodeJWT(user.token);

      if (exp && Date.now() >= exp * 1000) {
        return false;
      }
    } catch (err) {
      logout();
      return false;
    }

    return true;
  }, [user]);

  return (
    <Provider value={{ user, login, logout, register, isTokenValid }}>
      {children}
    </Provider>
  );
};
