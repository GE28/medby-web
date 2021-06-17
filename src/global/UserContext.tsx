/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { FC, createContext, useState, useCallback } from 'react';
import ms from 'ms';

import decodeJWT, { JwtPayload } from 'jwt-decode';

import axios from '../services/axios';
import { avatarsPath } from '../services/axios/paths';

import { UserDataResponse } from '../services/axios/responses';

interface LoginParams {
  email: string;
  password: string;
}

interface UserState {
  data: UserDataResponse;
  token: string;
}

interface UserContextBody {
  user: UserState;
  login(data: LoginParams): Promise<UserState>;
  logout(): void;
  updateAvatar(avatar: File): void;
  updateEmail(email: string): void;
  tokenValidator(): void;
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

  const storageUserData = ({
    token,
    data,
  }: {
    data?: UserDataResponse;
    token?: string;
  }) => {
    if (token) localStorage.setItem('@medby/user_token', token);
    if (data) localStorage.setItem('@medby/user_data', JSON.stringify(data));

    setUser((oldUser) => ({
      token: token || oldUser.token,
      data: data || oldUser.data,
    }));
  };

  const login = useCallback(async (loginParams: LoginParams) => {
    const { email, password } = loginParams;

    const response = await axios.post<UserState & { user: UserDataResponse }>(
      'login',
      {
        email,
        password,
      },
    );

    const { user: data, token } = response.data;
    delete data.updated_at;

    data.avatar = avatarsPath + data.avatar;
    storageUserData({ data, token });

    return { token, data };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('@medby/user_token');
    localStorage.removeItem('@medby/user_data');

    setUser({} as UserState);
  }, []);

  const updateAvatar = useCallback(async (avatar: File) => {
    const formData = new FormData();
    formData.append('avatar', avatar);

    const response = await axios.post<UserDataResponse>('upload', formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    const { data } = response;

    data.avatar = avatarsPath + data.avatar;
    storageUserData({ data });
  }, []);

  const updateEmail = useCallback(async (email: string) => {
    const response = await axios.put<UserDataResponse>(
      'profile',
      { email },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );

    const { data } = response;

    data.avatar = avatarsPath + data.avatar;
    storageUserData({ data });
  }, []);

  const tokenValidator = useCallback(() => {
    if (!user.token) {
      return;
    }

    try {
      const { exp }: JwtPayload = decodeJWT(user.token);

      if (exp && Date.now() + ms('1m') >= exp * 1000) {
        logout();
      }
    } catch (err) {
      logout();
    }
  }, [user]);

  return (
    <Provider
      value={{
        user,
        login,
        logout,
        updateAvatar,
        updateEmail,
        tokenValidator,
      }}
    >
      {children}
    </Provider>
  );
};
