import React, { FC } from 'react';

import { useFormik } from 'formik';

import InputContainer from '../components/inputContainer';
import Button from '../components/button';

import { Form } from './styles';

interface FormValues {
  email: string;
  password: string;
}

const LoginForm: FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <InputContainer label="E-mail" inputId="email">
        <input id="email" {...formik.getFieldProps('email')} />
      </InputContainer>

      <InputContainer label="Senha" inputId="password">
        <input
          id="password"
          type="password"
          {...formik.getFieldProps('password')}
        />
      </InputContainer>

      <Button type="submit">ENTRAR</Button>

      <p>
        <a href="/register">Não possui cadastro?</a>
      </p>
    </Form>
  );
};

export default LoginForm;
