import React from 'react';

import { FiAtSign, FiKey } from 'react-icons/fi';

import Header from '../components/header';
import LogoContainer from '../components/logocontainer';
import Field from '../components/field';
import Button from '../components/button';
import GitHubLink from '../components/githubLink';
import Footer from '../components/footer';

import { Container, MainContent, Form } from './styles';

const LoginPage: React.FC = () => (
  <Container>
    <Header>
      <LogoContainer />
    </Header>
    <MainContent>
      <h1>Área do cliente</h1>

      <Form>
        <Field icon={FiAtSign} name="email">
          E-mail
        </Field>
        <Field icon={FiKey} name="password">
          Senha
        </Field>

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

export default LoginPage;
