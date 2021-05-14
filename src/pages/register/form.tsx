import React, { FC, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { validate } from 'gerador-validador-cpf';

import { FiAtSign, FiFileText, FiUser, FiKey } from 'react-icons/fi';
import { userContext } from '../../global/UserContext';

import InputContainer from '../../components/inputContainer';
import Button from '../../components/button';

import { Form } from './styles';

interface FormValues {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
}

const RegisterForm: FC = () => {
  const { register } = useContext(userContext);

  const history = useHistory();

  const formik = useFormik<FormValues>({
    initialValues: {
      confirm_password: '',
      cpf: '',
      email: '',
      fullName: '',
      password: '',
    },
    onSubmit: (values) => {
      register({ ...values, name: values.fullName });

      history.push('/home');
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string()
        .min(12, 'Precisamos de seu nome completo')
        .max(255, 'Limite de caracteres atingido')
        .required('É necessário preencher este campo'),
      cpf: Yup.string()
        .required('É necessário preencher este campo')
        .test(
          'cpf-number',
          'Por favor, informe um CPF válido',
          (value) => !!value && validate(value),
        ),
      email: Yup.string()
        .email('Endereço de e-mail inválido')
        .required('É necessário preencher este campo'),
      password: Yup.string()
        .min(8, 'Sua senha deve conter ao menos 8 caracteres')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
          'Sua senha deve conter ao menos 8 caracteres, uma letra maiúscula e um número',
        )
        .required('É necessário preencher este campo'),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'As senhas não coincidem',
      ),
    }),
  });

  return (
    <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <InputContainer
        label="Nome completo"
        inputId="fullName"
        icon={FiUser}
        isTouched={formik.touched.fullName}
        error={formik.errors.fullName}
        {...formik.getFieldProps('fullName')}
      />

      <InputContainer
        label="CPF"
        inputId="cpf"
        icon={FiFileText}
        isTouched={formik.touched.cpf}
        error={formik.errors.cpf}
        {...formik.getFieldProps('cpf')}
      />

      <InputContainer
        label="E-mail"
        inputId="email"
        type="email"
        icon={FiAtSign}
        isTouched={formik.touched.email}
        error={formik.errors.email}
        {...formik.getFieldProps('email')}
      />

      <InputContainer
        label="Crie sua senha"
        inputId="password"
        type="password"
        icon={FiKey}
        isTouched={formik.touched.password}
        error={formik.errors.password}
        helpText="Sua senha deve conter no mínimo 8 caracteres, uma letra maiúscula e um número"
        {...formik.getFieldProps('password')}
      />

      <InputContainer
        label="Repita a senha"
        inputId="confirm-password"
        type="password"
        icon={FiKey}
        isTouched={formik.touched.confirm_password}
        error={formik.errors.confirm_password}
        {...formik.getFieldProps('confirm_password')}
      />

      <Button type="submit">CADASTRAR</Button>

      <p>
        <Link to="/" replace>
          Já possui conta?
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
