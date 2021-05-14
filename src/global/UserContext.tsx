/* eslint-disable import/no-duplicates */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  FC,
  createContext,
  useState,
  useCallback,
  useContext,
} from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import decodeJWT, { JwtPayload } from 'jwt-decode';

import { toastContext } from './ToastContext';

import axios from '../services/axios';

type UserData = Record<string, unknown> & {
  name: string;
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
  login(data: LoginParams): void;
  logout(): void;
  register(data: RegisterParams): void;
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

  const { addToast } = useContext(toastContext);

  const login = useCallback(async (loginParams: LoginParams) => {
    const { email, password } = loginParams;

    try {
      const response = await axios.post('login', { email, password });
      const { user: data, token } = response.data;

      localStorage.setItem('@medby/user_token', token);
      localStorage.setItem('@medby/user_data', JSON.stringify(data));

      setUser({ token, data });

      addToast({
        type: 'success',
        title: `Bem-vindo novamente, ${data.name.split(' ', 1)}`,
        message: format(new Date(), "'Hoje é dia 'P', são 'p' ('z')'", {
          locale: ptBR,
        }),
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha no login',
        message: 'Confira os dados inseridos e tente novamente',
      });
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@medby/user_token');
    localStorage.removeItem('@medby/user_data');

    setUser({} as UserState);
  }, []);

  const register = useCallback(async (registerParams: RegisterParams) => {
    const { name, email, cpf, password } = registerParams;

    try {
      const response = await axios.post('register', {
        name,
        email,
        cpf,
        password,
      });

      const { user: data, token } = response.data;

      localStorage.setItem('@medby/user_token', token);
      localStorage.setItem('@medby/user_data', JSON.stringify(data));

      setUser({ token, data });

      addToast({
        type: 'success',
        title: `Bem-vindo novamente, ${data.name.split(' ', 1)}`,
        message: format(new Date(), "'Hoje é dia 'P', são 'p' ('z')'", {
          locale: ptBR,
        }),
      });
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Falha ao realizar registro',
        message: 'Confira os dados inseridos e tente novamente',
      });
    }
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
