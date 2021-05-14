import React, { FC, useState } from 'react';

import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiX } from 'react-icons/fi';
import { ToastWrapper as StyledToastWrapper } from './styles';

import { ToastData } from '../global/ToastContext';

const ToastIcons = {
  success: <FiCheckCircle size="24px" />,
  error: <FiXCircle size="24px" />,
};

const ToastWrapper: FC<ToastData> = ({ title, message, type }) => {
  const [hide, setHide] = useState(false);

  return !hide ? (
    <StyledToastWrapper type={type}>
      <div>{type ? ToastIcons[type] : <FiAlertTriangle size="24px" />}</div>
      <dl>
        <dt>{title}</dt>
        {message && <dd>{message}</dd>}
        <button type="button" onClick={() => setHide(true)}>
          <FiX size="16px" />
        </button>
      </dl>
    </StyledToastWrapper>
  ) : null;
};

export default ToastWrapper;
