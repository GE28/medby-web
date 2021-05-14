import React, { FC, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { useFormik } from 'formik';

import { FiLoader } from 'react-icons/fi';
import { toastContext } from '../../global/ToastContext';
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

        addToast({
          type: 'error',
          title: 'Falha no login',
          message: 'Confira os dados inseridos e tente novamente',
        });
      }
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

      <Button type="submit">
        {loading ? <FiLoader size="24px" /> : 'ENTRAR'}
      </Button>

      <p>
        <Link to="/register" replace>
          Não possui cadastro?
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
