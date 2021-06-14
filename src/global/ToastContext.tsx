/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, createContext, useState, useCallback } from 'react';
import ms from 'ms';

export interface ToastData {
  id: string;
  title: string;
  message?: string;
  type?: 'error' | 'success';
}

interface ToastContextBody {
  toastDataList: ToastData[];
  addToast(toast: Omit<ToastData, 'id'>): void;
  deleteToast(id: string): void;
}

export const toastContext = createContext({} as ToastContextBody);
const { Provider } = toastContext;

const toastTimeout = ms('5s');

export const ToastProvider: FC = ({ children }) => {
  const [toastDataList, setToastList] = useState([] as ToastData[]);

  const deleteToast = useCallback((id) => {
    setToastList((oldToastList) =>
      oldToastList.filter((toast) => toast.id !== id),
    );
  }, []);

  const addToast = useCallback((toastData) => {
    const identifiedToast = { ...toastData, id: '' };
    identifiedToast.id = `toast_${Date.now()}`;

    setToastList((oldToastList) => [
      { ...toastData, id: `toast_${Date.now()}` },
      ...oldToastList,
    ]);

    // Auto-delete toast after X ms seconds
    setTimeout(() => deleteToast(identifiedToast.id), toastTimeout);
  }, []);

  return (
    <Provider value={{ toastDataList, addToast, deleteToast }}>
      {children}
    </Provider>
  );
};
