import React, { FC, useContext } from 'react';

import { toastContext } from '../global/ToastContext';

import Toast from './toast';

import { ToastsContainer as StyledToastsContainer } from './styles';

const ToastsContainer: FC = () => {
  const { toastDataList } = useContext(toastContext);

  const toastContainerContent = toastDataList.map((toast) => (
    <Toast {...toast} key={toast.id} />
  ));

  return <StyledToastsContainer>{toastContainerContent}</StyledToastsContainer>;
};

export default ToastsContainer;
