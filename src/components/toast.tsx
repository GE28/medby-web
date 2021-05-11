/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect, useRef } from 'react';

import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiX } from 'react-icons/fi';
import { ToastWrapper as StyledToastWrapper } from './styles';

import { ToastData, toastContext } from '../global/ToastContext';

const ToastIcons = {
  success: <FiCheckCircle size="24px" />,
  error: <FiXCircle size="24px" />,
};

const ToastWrapper: FC<ToastData> = ({ id, title, message, type }) => {
  const { deleteToast } = useContext(toastContext);

  const timer = useRef({} as NodeJS.Timeout);

  useEffect(() => {
    timer.current = setTimeout(() => deleteToast(id), 5000);

    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <StyledToastWrapper id={id} title={title} message={message} type={type}>
      <div>{type ? ToastIcons[type] : <FiAlertTriangle size="24px" />}</div>
      <dl>
        <dt>{title}</dt>
        <dd>{message}</dd>
        <button type="button" onClick={() => deleteToast(id)}>
          <FiX size="16px" />
        </button>
      </dl>
    </StyledToastWrapper>
  );
};

export default ToastWrapper;
