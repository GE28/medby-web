import React, { FC, HTMLAttributes } from 'react';

import { validate } from 'gerador-validador-cpf';

import * as Yup from 'yup';

import { useFormik } from 'formik';

import { FiAtSign, FiFileText, FiUser, FiKey } from 'react-icons/fi';

import Field from '../components/field';
import Button from '../components/button';

import { Form } from './styles';

type HTMLProps = HTMLAttributes<HTMLElement>;

interface FormValues {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
}

const RegisterForm: FC<HTMLProps> = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: (values) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
      }, 400);
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .min(12, 'Precisamos de seu nome completo')
        .max(255, 'Limite de caracteres atingido')
        .required('É necessário preencher este campo'),
      cpf: Yup.string()
        .length(11, 'Digite apenas números neste campo')
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
        .length(8, 'Sua senha deve conter ao menos 8 caracteres')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
          'Sua senha deve conter ao menos um número e uma letra maíscula',
        )
        .required('É necessário preencher este campo'),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'As senhas não coincidem',
      ),
    }),
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Field
        icon={FiUser}
        label="Nome completo"
        name="fullName"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.fullName}
      />
      {formik.touched.fullName && formik.errors.fullName && (
        <div className="error">{formik.errors.fullName}</div>
      )}

      <Field
        icon={FiFileText}
        label="CPF"
        name="cpf"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.cpf}
      />
      {formik.touched.cpf && formik.errors.cpf && (
        <div className="error">{formik.errors.cpf}</div>
      )}

      <Field
        icon={FiAtSign}
        label="E-mail"
        name="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email && (
        <div className="error">{formik.errors.email}</div>
      )}

      <Field
        icon={FiKey}
        label="Senha"
        name="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <div className="error">{formik.errors.password}</div>
      )}

      <Field
        icon={FiKey}
        label="Repita a senha"
        name="confirm_password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirm_password}
      />
      {formik.touched.confirm_password && formik.errors.confirm_password && (
        <div className="error">{formik.errors.confirm_password}</div>
      )}

      <Button type="submit">ENTRAR</Button>

      <p>
        <a href="/register">Não possui cadastro?</a>
      </p>
    </Form>
  );
};

export default RegisterForm;
