import React, { FC, useContext, useMemo } from 'react';

import { toastContext } from '../global/ToastContext';

import Toast from './toast';

import { ToastsContainer as StyledToastsContainer } from './styles';

const ToastsContainer: FC = () => {
  const { toastDataList } = useContext(toastContext);

  const toastContainerContent = useMemo(
    () => toastDataList.map((toast) => <Toast {...toast} key={toast.id} />),
    [toastDataList],
  );

  return <StyledToastsContainer>{toastContainerContent}</StyledToastsContainer>;
};

export default ToastsContainer;
