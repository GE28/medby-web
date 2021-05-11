import React, { FC, useContext } from 'react';

import { useFormik } from 'formik';

import { userContext } from '../../global/UserContext';

import InputContainer from '../../components/inputContainer';
import Button from '../../components/button';

import { Form } from './styles';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const { login } = useContext(userContext);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      const { email, password } = values;

      login({ email, password });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <InputContainer
        label="E-mail"
        inputId="email"
        type="email"
        {...formik.getFieldProps('email')}
      />

      <InputContainer
        label="Senha"
        inputId="password"
        type="password"
        {...formik.getFieldProps('password')}
      />

      <Button type="submit">ENTRAR</Button>

      <p>
        <a href="/register">Não possui cadastro?</a>
      </p>
    </Form>
  );
};

export default LoginForm;
