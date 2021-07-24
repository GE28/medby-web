import { AxiosError } from 'axios';
import { ToastData } from '../../global/ToastContext';

type ErrorToast = Omit<ToastData & { type: 'error' }, 'id'>;
export const sendToastIfNoResponse = (
  err: AxiosError,
  addToast: (t: ErrorToast) => void,
  toast: ErrorToast,
): void => {
  if (!err?.response) {
    addToast(toast);
  }
};

export const logoutIfErrorStatus = (
  err: AxiosError,
  logout: () => void,
): void => {
  switch (err?.response?.status) {
    case 401:
      logout();
      return;
    case 403:
      logout();
      break;
    default:
  }
};
