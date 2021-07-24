/* eslint-disable import/no-duplicates */
import React, { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import { sendToastIfNoResponse } from '../../services/axios/errorHandlers';

import { userContext } from '../../global/UserContext';
import { toastContext } from '../../global/ToastContext';

import Form from '../../components/form';
import InputContainer from '../../components/inputContainer';
import Button from '../../components/button';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { login } = useContext(userContext);
  const { addToast } = useContext(toastContext);

  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      setLoading(true);

      try {
        await login(values);
      } catch (err) {
        setLoading(false);

        const offlineLoginToast = {
          title: 'Falha no login',
          message: 'O servidor está offline',
          type: 'error' as const,
        };
        sendToastIfNoResponse(err, addToast, offlineLoginToast);
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <InputContainer
        label="E-mail"
        inputId="email"
        type="email"
        autoComplete="email"
        {...formik.getFieldProps('email')}
      />

      <InputContainer
        label="Senha"
        inputId="password"
        type="password"
        autoComplete="current-password"
        {...formik.getFieldProps('password')}
      />

      <Button type="submit" loading={loading}>
        ENTRAR
      </Button>

      <p>
        <Link to="/register">Não possui cadastro?</Link>
      </p>
    </Form>
  );
};

export default LoginForm;
