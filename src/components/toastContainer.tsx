import React, { FC, useContext } from 'react';

import { toastContext, ToastData } from '../global/ToastContext';

import Toast from './toast';

import { ToastsContainer as StyledToastsContainer } from './styles';

type ToastWithoutID = Omit<ToastData, 'id'>;

const tempToast: ToastWithoutID = {
  title: 'Teste no sistema',
  message: 'Acalme-se, é somente um teste',
};

const tempErrorToast: ToastWithoutID = {
  type: 'error',
  title: 'Erro no sistema',
  message: 'Um pouco de desespero cairia bem :O',
};

const tempSucessToast: ToastWithoutID = {
  type: 'success',
  title: 'Sucesso no sistema',
  message: 'Bora celebrar!',
};

const ToastsContainer: FC = () => {
  const { toastDataList, addToast } = useContext(toastContext);

  const toastContainerContent = toastDataList.map((toast) => (
    <Toast {...toast} key={toast.id} />
  ));

  return (
    <StyledToastsContainer>
      {toastContainerContent}
      <button
        type="button"
        onClick={() => {
          addToast(tempToast);
        }}
      >
        CLICK ME
      </button>
      <button
        type="button"
        onClick={() => {
          addToast(tempErrorToast);
        }}
      >
        NO CLICK ME
      </button>
      <button
        type="button"
        onClick={() => {
          addToast(tempSucessToast);
        }}
      >
        PFFFF CLIMME INSTEAD
      </button>
    </StyledToastsContainer>
  );
};

export default ToastsContainer;
