import React, { FC, useState } from 'react';

import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiX } from 'react-icons/fi';
import { ToastWrapper as StyledToastWrapper } from './styles';

import { ToastData } from '../global/ToastContext';

const ToastIcons = {
  success: <FiCheckCircle />,
  error: <FiXCircle />,
};

const ToastWrapper: FC<ToastData> = ({ title, message, type }) => {
  const [hide, setHide] = useState(false);

  return !hide ? (
    <StyledToastWrapper type={type}>
      <div>{type ? ToastIcons[type] : <FiAlertTriangle />}</div>
      <dl>
        <dt>{title}</dt>
        {message && <dd>{message}</dd>}
      </dl>
      <button type="button" onClick={() => setHide(true)}>
        <FiX />
      </button>
    </StyledToastWrapper>
  ) : null;
};

export default ToastWrapper;
