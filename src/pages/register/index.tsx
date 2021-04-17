import React, { FC } from 'react';

import Header from '../components/header';
import LogoContainer from '../components/logoContainer';
import GitHubLink from '../components/githubLink';
import Footer from '../components/footer';

import FormikForm from './formikForm';

import { Container, MainContent } from './styles';

const RegisterPage: FC = () => (
  <Container>
    <Header>
      <LogoContainer />
    </Header>
    <MainContent>
      <h1>Faça seu cadastro</h1>

      <FormikForm />
    </MainContent>

    <Footer>
      <GitHubLink />
    </Footer>
  </Container>
);

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
