/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useContext, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { toastContext } from '../global/ToastContext';

export const NotFoundRoute: FC = () => {
  const { addToast } = useContext(toastContext);

  useEffect(() => {
    addToast({
      title: 'Página movida ou não encontrada',
      message: 'Você foi direcionado para a tela inicial',
      type: 'error',
    });
  }, []);

  return (
    <Route>
      <Redirect to="/" />
    </Route>
  );
};
