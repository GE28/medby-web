import React, { FC } from 'react';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { FiAtSign, FiFileText, FiUser, FiKey } from 'react-icons/fi';

import { validate } from 'gerador-validador-cpf';

import Header from '../components/header';
import LogoContainer from '../components/logoContainer';
import GitHubLink from '../components/githubLink';
import Footer from '../components/footer';

import { Container, MainContent, Form } from './styles';

import Field from '../components/field';
import Button from '../components/button';
import InputContainer from '../components/inputContainer';

interface FormValues {
  fullName: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
}

const RegisterPage: FC = () => {
  const formik = useFormik<FormValues>({
    initialValues: {
      fullName: '',
      email: '',
      cpf: '',
      password: '',
      confirm_password: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: Yup.object().shape({
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
        .min(8, 'Sua senha deve conter ao menos 8 caracteres')
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
          'Sua senha deve conter ao menos um número, uma letra maíscula e outra minúscula',
        )
        .required('É necessário preencher este campo'),
      confirm_password: Yup.string().oneOf(
        [Yup.ref('password'), null],
        'As senhas não coincidem',
      ),
    }),
  });

  return (
    <Container>
      <Header>
        <LogoContainer />
      </Header>
      <MainContent>
        <h1>Faça seu cadastro</h1>
        <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
          <InputContainer
            label="Nome completo"
            inputId="fullName"
            icon={FiUser}
            isTouched={formik.touched.fullName}
            isError={formik.errors.fullName}
          >
            <input id="fullName" {...formik.getFieldProps('fullName')} />
          </InputContainer>

          <InputContainer
            label="CPF"
            inputId="cpf"
            icon={FiFileText}
            isTouched={formik.touched.cpf}
            isError={formik.errors.cpf}
          >
            <input id="cpf" {...formik.getFieldProps('cpf')} />
          </InputContainer>

          <InputContainer
            label="E-mail"
            inputId="email"
            icon={FiAtSign}
            isTouched={formik.touched.email}
            isError={formik.errors.email}
          >
            <input id="email" {...formik.getFieldProps('email')} />
          </InputContainer>

          <InputContainer
            label="Crie sua senha"
            inputId="password"
            icon={FiKey}
            isTouched={formik.touched.password}
            isError={formik.errors.password}
          >
            <input id="password" {...formik.getFieldProps('password')} />
          </InputContainer>

          <InputContainer
            label="Repita a senha"
            inputId="confirm_password"
            icon={FiKey}
            isTouched={formik.touched.confirm_password}
            isError={formik.errors.confirm_password}
          >
            <input
              id="confirm_password"
              {...formik.getFieldProps('confirm_password')}
            />
          </InputContainer>

          <Button type="submit">ENTRAR</Button>

          <p>
            <a href="/register">Não possui cadastro?</a>
          </p>
        </Form>
      </MainContent>

      <Footer>
        <GitHubLink />
      </Footer>
    </Container>
  );
};

/* <Form onSubmit={formik.handleSubmit}>
        <Field icon={FiUser} label="Nome completo" name="fullName" />
        <Field icon={FiFileText} label="CPF" name="cpf" />
        <Field icon={FiAtSign} label="E-mail" name="email" />
        <Field icon={FiKey} label="Senha" name="password" />
        <Field icon={FiKey} label="Repita a senha" name="confirm_password" />

        <Button type="submit">ENTRAR</Button>

        <p>
          <a href="/register">Não possui cadastro?</a>
        </p>
      </Form> */

export default RegisterPage;
